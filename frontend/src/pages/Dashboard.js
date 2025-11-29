import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import * as api from '../services/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { FaEthereum, FaBuilding, FaCoins, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const { wallet, connectWallet, disconnectWallet, contractInfo, setContractInfo, userBalance, setUserBalance, withdrawableRent, setWithdrawableRent } = useContext(AppContext);
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [quote, setQuote] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [loadingSell, setLoadingSell] = useState(false);
  const [loadingClaim, setLoadingClaim] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const { data } = await api.getPublicInfo();
        setContractInfo(data);
      } catch (error) {
        console.error("Failed to fetch contract info", error);
        // toast.error("Failed to load market data");
      }
    };
    fetchInfo();
    const interval = setInterval(fetchInfo, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [setContractInfo]);

  useEffect(() => {
    if (wallet.address) {
      const fetchUserInfo = async () => {
        try {
          const [balanceRes, rentRes] = await Promise.all([
            api.getBalance(wallet.address),
            api.getWithdrawableRent(wallet.address)
          ]);
          setUserBalance(balanceRes.data);
          setWithdrawableRent(rentRes.data);
        } catch (error) {
          console.error("Failed to fetch user info", error);
        }
      };
      fetchUserInfo();
    }
  }, [wallet.address, setUserBalance, setWithdrawableRent]);

  const handleGetQuote = async () => {
    if (!buyAmount || parseFloat(buyAmount) <= 0) return;
    setLoadingQuote(true);
    try {
      const { data } = await api.getQuoteBuy(buyAmount);
      setQuote(data);
      toast.success(`Quote received: ${data.costEth} ETH`);
    } catch (error) {
      console.error("Failed to get quote", error);
      toast.error("Failed to get quote");
      setQuote(null);
    }
    setLoadingQuote(false);
  };

  const handleBuy = async () => {
    if (parseFloat(buyAmount) > 0 && wallet.signer) {
      setLoadingBuy(true);
      const toastId = toast.loading("Processing purchase...");
      try {
        const { data: txData } = await api.buildBuySharesTx(buyAmount);
        const tx = await wallet.signer.sendTransaction({
          to: txData.to,
          data: txData.data,
          value: txData.value,
        });
        toast.loading("Transaction sent! Waiting for confirmation...", { id: toastId });
        await tx.wait();
        toast.success("Purchase successful! Welcome to Olympus.", { id: toastId });
        
        // Refresh data
        const { data } = await api.getPublicInfo();
        setContractInfo(data);
        const balanceRes = await api.getBalance(wallet.address);
        setUserBalance(balanceRes.data);
        setBuyAmount('');
        setQuote(null);
      } catch (error) {
        console.error("Buy failed", error);
        toast.error("Purchase failed: " + (error.reason || error.message), { id: toastId });
      }
      setLoadingBuy(false);
    }
  };

  const handleSell = async () => {
    if (parseFloat(sellAmount) > 0 && wallet.signer) {
      setLoadingSell(true);
      const toastId = toast.loading("Processing sale...");
      try {
        const { data: txData } = await api.buildSellSharesTx(sellAmount);
        const tx = await wallet.signer.sendTransaction({
          to: txData.to,
          data: txData.data,
          value: txData.value,
        });
        toast.loading("Transaction sent! Waiting for confirmation...", { id: toastId });
        await tx.wait();
        toast.success("Sold successfully!", { id: toastId });
        
        // Refresh data
        const { data } = await api.getPublicInfo();
        setContractInfo(data);
        const balanceRes = await api.getBalance(wallet.address);
        setUserBalance(balanceRes.data);
        setSellAmount('');
      } catch (error) {
        console.error("Sell failed", error);
        toast.error("Sell failed: " + (error.reason || error.message), { id: toastId });
      }
      setLoadingSell(false);
    }
  };

  const handleClaimRent = async () => {
    if (wallet.signer) {
      setLoadingClaim(true);
      const toastId = toast.loading("Claiming rent...");
      try {
        const { data: txData } = await api.buildClaimRentTx();
        const tx = await wallet.signer.sendTransaction({
          to: txData.to,
          data: txData.data,
          value: txData.value,
        });
        toast.loading("Transaction sent! Waiting for confirmation...", { id: toastId });
        await tx.wait();
        toast.success("Rent claimed successfully!", { id: toastId });
        
        // Refresh data
        const rentRes = await api.getWithdrawableRent(wallet.address);
        setWithdrawableRent(rentRes.data);
      } catch (error) {
        console.error("Claim rent failed", error);
        toast.error("Claim rent failed: " + (error.reason || error.message), { id: toastId });
      }
      setLoadingClaim(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dashboard</h2>
          <p>Manage your real estate portfolio on the blockchain.</p>
        </div>
        {wallet.address ? (
          <div style={{ textAlign: 'right' }}>
            <div style={{ background: 'rgba(0, 210, 255, 0.1)', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--accent-color)', color: 'var(--accent-color)', marginBottom: '0.5rem' }}>
              {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
            </div>
            <Button variant="secondary" onClick={disconnectWallet}>Disconnect</Button>
          </div>
        ) : (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid" style={{ marginBottom: '3rem' }}>
        <Card title="Share Price" delay={0.1}>
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '1rem' }}>
            <FaChartLine size={30} color="var(--accent-color)" />
            <div>
              <h2 style={{ margin: 0 }}>{contractInfo?.sharePriceEth || '0.00'} ETH</h2>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Current Value</p>
            </div>
          </div>
        </Card>
        <Card title="Vault Balance" delay={0.2}>
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '1rem' }}>
            <FaEthereum size={30} color="#9d4edd" />
            <div>
              <h2 style={{ margin: 0 }}>{contractInfo?.vaultBalanceEth || '0.00'} ETH</h2>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Total Assets</p>
            </div>
          </div>
        </Card>
        <Card title="Total Supply" delay={0.3}>
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '1rem' }}>
            <FaBuilding size={30} color="#00b09b" />
            <div>
              <h2 style={{ margin: 0 }}>{contractInfo?.totalSupplyTokens || '0'} SQFT</h2>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Circulating Shares</p>
            </div>
          </div>
        </Card>
      </div>

      {/* User Actions Grid */}
      {wallet.address && (
        <div className="grid">
          {/* Holdings & Rent */}
          <Card title="Your Portfolio" delay={0.4}>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '0.5rem' }}>Your Balance</p>
              <h2 style={{ color: 'var(--accent-color)' }}>{userBalance?.balanceTokens || '0.0'} SQFT</h2>
            </div>
            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
              <p style={{ marginBottom: '0.5rem' }}>Withdrawable Rent</p>
              <h2 style={{ color: '#00b09b' }}>{withdrawableRent?.withdrawableRentEth || '0.0'} ETH</h2>
              <Button 
                onClick={handleClaimRent} 
                disabled={!withdrawableRent || parseFloat(withdrawableRent.withdrawableRentEth) <= 0 || loadingClaim}
                fullWidth
                style={{ marginTop: '1rem' }}
              >
                {loadingClaim ? 'Claiming...' : 'Claim Rent'}
              </Button>
            </div>
          </Card>

          {/* Buy Shares */}
          <Card title="Buy Shares" delay={0.5}>
            <Input 
              label="Amount (SQFT)"
              placeholder="0.0"
              value={buyAmount}
              onChange={e => setBuyAmount(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem' }}>
              <span>Estimated Cost:</span>
              <span style={{ color: 'var(--accent-color)' }}>{quote ? `${quote.costEth} ETH` : '-'}</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button onClick={handleGetQuote} variant="secondary" disabled={loadingQuote} fullWidth>
                {loadingQuote ? '...' : 'Quote'}
              </Button>
              <Button onClick={handleBuy} disabled={!quote || loadingBuy} fullWidth>
                {loadingBuy ? 'Buying...' : 'Buy Now'}
              </Button>
            </div>
          </Card>

          {/* Sell Shares */}
          <Card title="Sell Shares" delay={0.6}>
            <Input 
              label="Amount (SQFT)"
              placeholder="0.0"
              value={sellAmount}
              onChange={e => setSellAmount(e.target.value)}
            />
            <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Selling will return ETH to your wallet immediately.
            </div>
            <Button onClick={handleSell} variant="danger" disabled={loadingSell} fullWidth>
              {loadingSell ? 'Selling...' : 'Sell Shares'}
            </Button>
          </Card>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
