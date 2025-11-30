import React, { useState } from 'react';
import * as api from '../services/api';
import customToast from '../utils/customToast';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { FaCoins, FaWater, FaChartLine, FaExclamationTriangle, FaShieldAlt, FaCrown } from 'react-icons/fa';

const AdminCard = ({ icon, iconBg, title, description, children, delay }) => (
  <Card delay={delay}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        style={{
          width: 48,
          height: 48,
          borderRadius: '14px',
          background: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </motion.div>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{description}</p>
      </div>
    </div>
    {children}
  </Card>
);

const Admin = () => {
  const [distributeAmount, setDistributeAmount] = useState('');
  const [injectAmount, setInjectAmount] = useState('');
  const [priceAmount, setPriceAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loading, setLoading] = useState({});

  const handleAdminAction = async (action, name, key, ...params) => {
    setLoading(prev => ({ ...prev, [key]: true }));
    const toastId = customToast.loading(`Executing ${name}...`);
    try {
      const { data } = await action(...params);
      customToast.dismiss(toastId);
      customToast.success(`${name} successful! Tx: ${data.txHash.slice(0, 10)}...`);
      
      // Clear input after success
      if (key === 'distribute') setDistributeAmount('');
      if (key === 'inject') setInjectAmount('');
      if (key === 'price') setPriceAmount('');
      if (key === 'withdraw') setWithdrawAmount('');
    } catch (error) {
      console.error("Admin action failed", error);
      customToast.dismiss(toastId);
      customToast.error(`Error: ${error.response?.data?.error || 'Action failed'}`);
    }
    setLoading(prev => ({ ...prev, [key]: false }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.15) 0%, rgba(0, 210, 255, 0.1) 100%)',
          borderRadius: '24px',
          padding: '2.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(157, 78, 221, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 150,
            height: 150,
            border: '1px solid rgba(157, 78, 221, 0.2)',
            borderRadius: '50%',
          }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            style={{
              width: 64,
              height: 64,
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #9d4edd, #00d2ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(157, 78, 221, 0.4)',
            }}
          >
            <FaCrown size={28} color="white" />
          </motion.div>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '2rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #9d4edd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Admin Control Panel
            </h1>
            <p style={{ margin: '0.5rem 0 0 0', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaShieldAlt size={14} /> Owner-only functions for contract management
            </p>
          </div>
        </div>
      </motion.div>
      
      <div className="grid">
        <AdminCard
          icon={<FaCoins size={22} color="white" />}
          iconBg="linear-gradient(135deg, #00b09b, #00d2ff)"
          title="Distribute Rent"
          description="Pay dividends to shareholders"
          delay={0.2}
        >
          <Input 
            placeholder="Amount in ETH (e.g., 0.01)" 
            value={distributeAmount} 
            onChange={e => setDistributeAmount(e.target.value)} 
          />
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(0, 176, 155, 0.1)',
            borderRadius: '10px',
            marginBottom: '1rem',
            border: '1px solid rgba(0, 176, 155, 0.2)',
          }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
              💡 ETH will be distributed proportionally to all token holders based on their share.
            </p>
          </div>
          <Button 
            onClick={() => handleAdminAction(api.distributeRent, "Distribute Rent", "distribute", distributeAmount)} 
            disabled={loading.distribute || !distributeAmount}
            fullWidth
          >
            {loading.distribute ? 'Distributing...' : 'Distribute Rent'}
          </Button>
        </AdminCard>

        <AdminCard
          icon={<FaWater size={22} color="white" />}
          iconBg="linear-gradient(135deg, #3a7bd5, #00d2ff)"
          title="Inject Liquidity"
          description="Add ETH without minting shares"
          delay={0.3}
        >
          <Input 
            placeholder="Amount in ETH (e.g., 0.1)" 
            value={injectAmount} 
            onChange={e => setInjectAmount(e.target.value)} 
          />
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(58, 123, 213, 0.1)',
            borderRadius: '10px',
            marginBottom: '1rem',
            border: '1px solid rgba(58, 123, 213, 0.2)',
          }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
              💧 Adds capital to the vault to ensure liquidity for share buybacks.
            </p>
          </div>
          <Button 
            onClick={() => handleAdminAction(api.injectLiquidity, "Inject Liquidity", "inject", injectAmount)} 
            disabled={loading.inject || !injectAmount}
            fullWidth
          >
            {loading.inject ? 'Injecting...' : 'Inject Liquidity'}
          </Button>
        </AdminCard>

        <AdminCard
          icon={<FaChartLine size={22} color="white" />}
          iconBg="linear-gradient(135deg, #9d4edd, #ff6b6b)"
          title="Adjust Share Price"
          description="Update the NAV per share"
          delay={0.4}
        >
          <Input 
            placeholder="New Price in ETH (e.g., 0.002)" 
            value={priceAmount} 
            onChange={e => setPriceAmount(e.target.value)} 
          />
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(157, 78, 221, 0.1)',
            borderRadius: '10px',
            marginBottom: '1rem',
            border: '1px solid rgba(157, 78, 221, 0.2)',
          }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
              📈 Changes the buy/sell price. Ensure vault has sufficient liquidity.
            </p>
          </div>
          <Button 
            onClick={() => handleAdminAction(api.adjustSharePrice, "Adjust Price", "price", priceAmount)} 
            disabled={loading.price || !priceAmount}
            fullWidth
          >
            {loading.price ? 'Updating...' : 'Update Price'}
          </Button>
        </AdminCard>

        <AdminCard
          icon={<FaExclamationTriangle size={22} color="white" />}
          iconBg="linear-gradient(135deg, #ff416c, #ff4b2b)"
          title="Emergency Withdraw"
          description="Extract funds to owner wallet"
          delay={0.5}
        >
          <Input 
            placeholder="Amount in ETH" 
            value={withdrawAmount} 
            onChange={e => setWithdrawAmount(e.target.value)} 
          />
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(255, 75, 43, 0.1)',
            borderRadius: '10px',
            marginBottom: '1rem',
            border: '1px solid rgba(255, 75, 43, 0.2)',
          }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
              ⚠️ Use only for emergencies. May affect liquidity for buybacks.
            </p>
          </div>
          <Button 
            variant="danger"
            onClick={() => handleAdminAction(api.emergencyWithdraw, "Emergency Withdraw", "withdraw", withdrawAmount)} 
            disabled={loading.withdraw || !withdrawAmount}
            fullWidth
          >
            {loading.withdraw ? 'Withdrawing...' : 'Emergency Withdraw'}
          </Button>
        </AdminCard>
      </div>
    </motion.div>
  );
};

export default Admin;
