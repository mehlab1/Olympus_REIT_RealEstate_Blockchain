import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaTimes, FaWallet, FaChartLine, FaCoins, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const Guide = () => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      icon: <FaWallet size={24} />,
      color: '#00d2ff',
      title: "Connect Your Wallet",
      desc: "Click 'Connect Wallet' and approve the connection in MetaMask. Make sure you're on the Sepolia Testnet."
    },
    {
      icon: <FaCoins size={24} />,
      color: '#ffd700',
      title: "Purchase Shares",
      desc: "Enter the number of SQFT tokens to buy. Each token costs 0.001 ETH. Confirm the transaction in MetaMask."
    },
    {
      icon: <FaChartLine size={24} />,
      color: '#00b09b',
      title: "Earn Passive Income",
      desc: "Hold your shares to earn ETH dividends from property rent. Claim your earnings anytime from the dashboard."
    }
  ];

  return (
    <>
      {/* Floating Help Button */}
      <motion.div 
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", bounce: 0.5 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1, boxShadow: '0 8px 30px rgba(0, 210, 255, 0.5)' }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0, 210, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            position: 'relative',
          }}
        >
          <FaQuestionCircle size={26} />
          {/* Pulse Animation */}
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid #00d2ff',
            }}
          />
        </motion.button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 101,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                maxWidth: '550px', 
                width: '100%',
                background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.98), rgba(15, 12, 41, 0.98))',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Header */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.15), rgba(157, 78, 221, 0.15))',
                padding: '2rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
              }}>
                <motion.button
                  whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '10px',
                    width: 36,
                    height: 36,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  <FaTimes size={16} />
                </motion.button>
                
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '1.5rem',
                  background: 'linear-gradient(to right, #ffffff, #00d2ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Getting Started
                </h2>
                <p style={{ margin: '0.5rem 0 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                  Your guide to investing in tokenized real estate
                </p>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {steps.map((step, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '1rem',
                        padding: '1rem',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <div style={{ 
                        width: 48,
                        height: 48,
                        borderRadius: '14px',
                        background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
                        border: `1px solid ${step.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: step.color,
                        flexShrink: 0,
                      }}>
                        {step.icon}
                      </div>
                      <div>
                        <h4 style={{ 
                          margin: '0 0 0.4rem 0', 
                          color: 'white',
                          fontSize: '1rem',
                          fontWeight: 600,
                        }}>
                          {step.title}
                        </h4>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '0.9rem',
                          color: 'rgba(255,255,255,0.6)',
                          lineHeight: 1.5,
                        }}>
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    background: 'rgba(0, 210, 255, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(0, 210, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <FaCheckCircle size={18} color="#00d2ff" />
                  <p style={{ 
                    margin: 0, 
                    fontSize: '0.85rem', 
                    color: 'rgba(255,255,255,0.7)',
                  }}>
                    Need test ETH? Search for "Sepolia Faucet" to get free testnet funds.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Guide;
