import React, { useState } from 'react';
import * as api from '../services/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const Admin = () => {
  const [distributeAmount, setDistributeAmount] = useState('');
  const [injectAmount, setInjectAmount] = useState('');
  const [priceAmount, setPriceAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminAction = async (action, name, ...params) => {
    setLoading(true);
    const toastId = toast.loading(`Executing ${name}...`);
    try {
      const { data } = await action(...params);
      toast.success(`${name} successful! Tx: ${data.txHash.slice(0, 10)}...`, { id: toastId });
    } catch (error) {
      console.error("Admin action failed", error);
      toast.error(`Error: ${error.response?.data?.error || 'Action failed'}`, { id: toastId });
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Admin Control Panel</h2>
      
      <div className="grid">
        <Card title="Distribute Rent" delay={0.1}>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Send ETH dividends to all token holders.</p>
          <Input 
            placeholder="Amount in ETH" 
            value={distributeAmount} 
            onChange={e => setDistributeAmount(e.target.value)} 
          />
          <Button 
            onClick={() => handleAdminAction(api.distributeRent, "Distribute Rent", distributeAmount)} 
            disabled={loading}
            fullWidth
          >
            Distribute
          </Button>
        </Card>

        <Card title="Inject Liquidity" delay={0.2}>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Add ETH to vault without minting shares.</p>
          <Input 
            placeholder="Amount in ETH" 
            value={injectAmount} 
            onChange={e => setInjectAmount(e.target.value)} 
          />
          <Button 
            onClick={() => handleAdminAction(api.injectLiquidity, "Inject Liquidity", injectAmount)} 
            disabled={loading}
            fullWidth
          >
            Inject
          </Button>
        </Card>

        <Card title="Adjust Share Price" delay={0.3}>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Update the NAV per share.</p>
          <Input 
            placeholder="New Price in ETH" 
            value={priceAmount} 
            onChange={e => setPriceAmount(e.target.value)} 
          />
          <Button 
            onClick={() => handleAdminAction(api.adjustSharePrice, "Adjust Price", priceAmount)} 
            disabled={loading}
            fullWidth
          >
            Update Price
          </Button>
        </Card>

        <Card title="Emergency Withdraw" delay={0.4}>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Withdraw funds to owner wallet.</p>
          <Input 
            placeholder="Amount in ETH" 
            value={withdrawAmount} 
            onChange={e => setWithdrawAmount(e.target.value)} 
          />
          <Button 
            variant="danger"
            onClick={() => handleAdminAction(api.emergencyWithdraw, "Emergency Withdraw", withdrawAmount)} 
            disabled={loading}
            fullWidth
          >
            Withdraw
          </Button>
        </Card>
      </div>
    </motion.div>
  );
};

export default Admin;
