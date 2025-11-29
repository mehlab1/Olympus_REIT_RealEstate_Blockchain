import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, disabled, variant = 'primary', fullWidth = false }) => {
  const baseStyle = {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.3s ease',
    outline: 'none',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(45deg, var(--accent-color), var(--accent-hover))',
      color: 'white',
      boxShadow: '0 4px 15px rgba(0, 210, 255, 0.3)',
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    danger: {
      background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(255, 75, 43, 0.3)',
    }
  };

  const style = { ...baseStyle, ...variants[variant] };

  if (disabled) {
    style.opacity = 0.6;
    style.background = '#555';
    style.boxShadow = 'none';
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      style={style}
      whileHover={!disabled ? { scale: 1.02, filter: 'brightness(1.1)' } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.button>
  );
};

export default Button;
