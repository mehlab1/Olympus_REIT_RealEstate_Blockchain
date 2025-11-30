import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import * as api from '../services/api';
import customToast from '../utils/customToast';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { FaEthereum, FaBuilding, FaCoins, FaChartLine, FaWallet, FaArrowRight, FaShieldAlt, FaGem } from 'react-icons/fa';

const StatCard = ({ icon, title, value, subtitle, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '20px',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Glow Effect */}
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: 100,
      height: 100,
      background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
      filter: 'blur(20px)',
    }} />
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        style={{
          width: 50,
          height: 50,
          borderRadius: '14px',
          background: `linear-gradient(135deg, ${color}30, ${color}10)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${color}40`,
        }}
      >
        {icon}
      </motion.div>
      <div>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>{title}</p>
        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{value}</h3>
        {subtitle && <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{subtitle}</p>}
      </div>
    </div>
  </motion.div>
);

const HeroSection = ({ wallet, connectWallet, disconnectWallet }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    style={{
      background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.1) 0%, rgba(157, 78, 221, 0.1) 100%)',
      borderRadius: '24px',
      padding: '3rem',
      marginBottom: '2rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.1)',
    }}
  >
    {/* Decorative Elements */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      style={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        border: '1px solid rgba(0, 210, 255, 0.2)',
        borderRadius: '50%',
      }}
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      style={{
        position: 'absolute',
        top: -30,
        right: -30,
        width: 150,
        height: 150,
        border: '1px solid rgba(157, 78, 221, 0.2)',
        borderRadius: '50%',
      }}
    />

    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
      <div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p style={{ 
            color: '#00d2ff', 
            fontSize: '0.9rem', 
            fontWeight: 600, 
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <FaGem /> PREMIUM REAL ESTATE INVESTMENT
          </p>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            margin: '0 0 1rem 0',
            background: 'linear-gradient(135deg, #ffffff 0%, #00d2ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2,
          }}
        >
          Invest in Olympus<br />Penthouse
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.1rem',
            maxWidth: 450,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Own fractional shares of premium real estate in Centaurus Mall, Islamabad. 
          Earn passive rental income paid directly to your wallet.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
            <FaShieldAlt color="#00b09b" /> Secure Smart Contract
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
            <FaEthereum color="#9d4edd" /> Built on Ethereum
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        {wallet.address ? (
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            border: '1px solid rgba(0, 210, 255, 0.3)',
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              marginBottom: '1rem',
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <FaWallet color="white" size={18} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Connected</p>
                <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </p>
              </div>
            </div>
            <Button variant="secondary" onClick={disconnectWallet} fullWidth>
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <Button onClick={connectWallet} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              Connect Wallet <FaArrowRight />
            </span>
          </Button>
        )}
      </motion.div>
    </div>
  </motion.div>
);

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
      }
    };
    fetchInfo();
    const interval = setInterval(fetchInfo, 30000);
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
      customToast.success(`Quote: ${data.costEth} ETH for ${buyAmount} SQFT`);
    } catch (error) {
      console.error("Failed to get quote", error);
      customToast.error("Failed to get quote. Please try again.");
      setQuote(null);
    }
    setLoadingQuote(false);
  };

  const handleBuy = async () => {
    if (parseFloat(buyAmount) > 0 && wallet.signer) {
      setLoadingBuy(true);
      const toastId = customToast.loading("Processing your purchase...");
      try {
        const { data: txData } = await api.buildBuySharesTx(buyAmount);
        const tx = await wallet.signer.sendTransaction({
          to: txData.to,
          data: txData.data,
          value: txData.value,
        });
        customToast.dismiss(toastId);
        const waitToastId = customToast.loading("Transaction sent! Waiting for confirmation...");
        await tx.wait();
        customToast.dismiss(waitToastId);
        customToast.success(`Successfully purchased ${buyAmount} SQFT shares!`);
        
        const { data } = await api.getPublicInfo();
        setContractInfo(data);
        const balanceRes = await api.getBalance(wallet.address);
        setUserBalance(balanceRes.data);
        setBuyAmount('');
        setQuote(null);
      } catch (error) {
        console.error("Buy failed", error);
        customToast.dismiss(toastId);
        customToast.error("Purchase failed: " + (error.reason || error.message));
      }
      setLoadingBuy(false);
    }
  };

  const handleSell = async () => {
    if (parseFloat(sellAmount) > 0 && wallet.signer) {
      setLoadingSell(true);
      const toastId = customToast.loading("Processing your sale...");
      try {
        const { data: txData } = await api.buildSellSharesTx(sellAmount);
        const tx = await wallet.signer.sendTransaction({
          to: txData.to,
          data: txData.data,
          value: txData.value,
        });
        customToast.dismiss(toastId);
        const waitToastId = customToast.loading("Transaction sent! Waiting for confirmation...");
        await tx.wait();
        customToast.dismiss(waitToastId);
        customToast.success(`Successfully sold ${sellAmount} SQFT shares!`);
        
        const { data } = await api.getPublicInfo();
        setContractInfo(data);
        const balanceRes = await api.getBalance(wallet.address);
        setUserBalance(balanceRes.data);
        setSellAmount('');
      } catch (error) {
        console.error("Sell failed", error);
        customToast.dismiss(toastId);
        customToast.error("Sale failed: " + (error.reason || error.message));
      }
      setLoadingSell(false);
    }
  };

  const handleClaimRent = async () => {
    if (wallet.signer) {
      setLoadingClaim(true);
      const toastId = customToast.loading("Claiming your rental income...");
      try {
        const { data: txData } = await api.buildClaimRentTx();
        const tx = await wallet.signer.sendTransaction({
          to: txData.to,
          data: txData.data,
          value: txData.value,
        });
        customToast.dismiss(toastId);
        const waitToastId = customToast.loading("Transaction sent! Waiting for confirmation...");
        await tx.wait();
        customToast.dismiss(waitToastId);
        customToast.success("Rental income claimed successfully!");
        
        const rentRes = await api.getWithdrawableRent(wallet.address);
        setWithdrawableRent(rentRes.data);
      } catch (error) {
        console.error("Claim rent failed", error);
        customToast.dismiss(toastId);
        customToast.error("Claim failed: " + (error.reason || error.message));
      }
      setLoadingClaim(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <HeroSection 
        wallet={wallet} 
        connectWallet={connectWallet} 
        disconnectWallet={disconnectWallet} 
      />

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        <StatCard
          icon={<FaChartLine size={22} color="#00d2ff" />}
          title="Share Price"
          value={`${contractInfo?.sharePriceEth || '0.00'} ETH`}
          subtitle="Current NAV"
          color="#00d2ff"
          delay={0.1}
        />
        <StatCard
          icon={<FaEthereum size={22} color="#9d4edd" />}
          title="Vault Balance"
          value={`${contractInfo?.vaultBalanceEth || '0.00'} ETH`}
          subtitle="Total Assets"
          color="#9d4edd"
          delay={0.2}
        />
        <StatCard
          icon={<FaBuilding size={22} color="#00b09b" />}
          title="Total Supply"
          value={`${contractInfo?.totalSupplyTokens || '0'} SQFT`}
          subtitle="Circulating Shares"
          color="#00b09b"
          delay={0.3}
        />
      </div>

      {/* User Actions - Only show when connected */}
      <AnimatePresence>
        {wallet.address && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <span style={{
                  width: 4,
                  height: 24,
                  background: 'linear-gradient(180deg, #00d2ff, #3a7bd5)',
                  borderRadius: 2,
                }} />
                Manage Your Investment
              </h2>
            </motion.div>

            <div className="grid">
              {/* Portfolio Card */}
              <Card title="" delay={0.5}>
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(58, 123, 213, 0.1))',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: '1px solid rgba(0, 210, 255, 0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <FaCoins size={20} color="white" />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Your Balance</p>
                      <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700, color: '#00d2ff' }}>
                        {userBalance?.balanceTokens || '0.0'} <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)' }}>SQFT</span>
                      </h2>
                    </div>
                  </div>
                </div>

                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(0, 176, 155, 0.1), rgba(0, 210, 255, 0.05))',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(0, 176, 155, 0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #00b09b, #00d2ff)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <FaEthereum size={20} color="white" />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Claimable Rent</p>
                      <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700, color: '#00b09b' }}>
                        {withdrawableRent?.withdrawableRentEth || '0.0'} <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)' }}>ETH</span>
                      </h2>
                    </div>
                  </div>
                  <Button 
                    onClick={handleClaimRent} 
                    disabled={!withdrawableRent || parseFloat(withdrawableRent.withdrawableRentEth) <= 0 || loadingClaim}
                    fullWidth
                  >
                    {loadingClaim ? 'Claiming...' : 'Claim Rental Income'}
                  </Button>
                </div>
              </Card>

              {/* Buy Shares Card */}
              <Card title="Buy Shares" delay={0.6}>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
                  Purchase fractional ownership of the Olympus Penthouse property.
                </p>
                <Input 
                  label="Amount (SQFT)"
                  placeholder="Enter amount to buy"
                  value={buyAmount}
                  onChange={e => setBuyAmount(e.target.value)}
                />
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Estimated Cost</span>
                  <span style={{ 
                    color: quote ? '#00d2ff' : 'rgba(255,255,255,0.4)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                  }}>
                    {quote ? `${quote.costEth} ETH` : '—'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button onClick={handleGetQuote} variant="secondary" disabled={loadingQuote || !buyAmount} fullWidth>
                    {loadingQuote ? '...' : 'Get Quote'}
                  </Button>
                  <Button onClick={handleBuy} disabled={!quote || loadingBuy} fullWidth>
                    {loadingBuy ? 'Buying...' : 'Buy Now'}
                  </Button>
                </div>
              </Card>

              {/* Sell Shares Card */}
              <Card title="Sell Shares" delay={0.7}>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
                  Sell your shares back and receive ETH instantly to your wallet.
                </p>
                <Input 
                  label="Amount (SQFT)"
                  placeholder="Enter amount to sell"
                  value={sellAmount}
                  onChange={e => setSellAmount(e.target.value)}
                />
                <div style={{ 
                  padding: '1rem',
                  background: 'rgba(255, 75, 43, 0.1)',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  border: '1px solid rgba(255, 75, 43, 0.2)',
                }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                    ⚠️ Selling will automatically claim any pending rent first.
                  </p>
                </div>
                <Button onClick={handleSell} variant="danger" disabled={loadingSell || !sellAmount} fullWidth>
                  {loadingSell ? 'Selling...' : 'Sell Shares'}
                </Button>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connect Wallet Prompt */}
      {!wallet.address && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            borderRadius: '24px',
            border: '1px dashed rgba(255,255,255,0.1)',
          }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaWallet size={48} color="#00d2ff" style={{ marginBottom: '1rem' }} />
          </motion.div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>Connect Your Wallet</h3>
          <p style={{ margin: '0 0 1.5rem 0', color: 'rgba(255,255,255,0.6)', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
            Connect your MetaMask wallet to start investing in premium real estate on the blockchain.
          </p>
          <Button onClick={connectWallet}>
            Connect Wallet <FaArrowRight style={{ marginLeft: '0.5rem' }} />
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dashboard;
