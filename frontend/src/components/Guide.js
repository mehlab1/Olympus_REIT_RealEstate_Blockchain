import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaTimes, FaWallet, FaChartLine, FaCoins } from 'react-icons/fa';
import Card from './Card';

const Guide = () => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      icon: <FaWallet size={24} color="#00d2ff" />,
      title: "1. Connect Wallet",
      desc: "Click the 'Connect Wallet' button to link your MetaMask account. Ensure you are on the Sepolia Testnet."
    },
    {
      icon: <FaCoins size={24} color="#ffd700" />,
      title: "2. Buy Shares",
      desc: "Enter an amount of tokens to buy. 1 Token = 0.001 ETH. Confirm the transaction in MetaMask."
    },
    {
      icon: <FaChartLine size={24} color="#00b09b" />,
      title: "3. Earn Rent",
      desc: "Hold your shares to earn ETH dividends. Check 'Withdrawable Rent' and claim it anytime."
    }
  ];

  return (
    <>
      <motion.div 
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'var(--accent-color)',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0, 210, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}
        >
          <FaQuestionCircle size={30} />
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(5px)',
              zIndex: 101,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '600px', width: '100%' }}
            >
              <Card title="New User Guide">
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer' }} onClick={() => setIsOpen(false)}>
                  <FaTimes size={20} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {steps.map((step, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '12px' }}>
                        {step.icon}
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>{step.title}</h4>
                        <p style={{ margin: 0, fontSize: '0.95rem' }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                    Need test ETH? Search for "Sepolia Faucet" to get free funds for testing.
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Guide;
