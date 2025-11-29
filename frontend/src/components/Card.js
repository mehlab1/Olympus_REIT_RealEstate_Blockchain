import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, title, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card ${className}`}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: 'var(--glass-shadow)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.45)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }}
    >
      {title && <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>{title}</h3>}
      {children}
    </motion.div>
  );
};

export default Card;
