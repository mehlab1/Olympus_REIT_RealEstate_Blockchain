import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, disabled, variant = 'primary', fullWidth = false, icon, loading = false }) => {
  const baseStyle = {
    padding: '14px 28px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.3s ease',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'inherit',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
      color: 'white',
      boxShadow: '0 4px 20px rgba(0, 210, 255, 0.35)',
    },
    secondary: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
    },
    danger: {
      background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
      color: 'white',
      boxShadow: '0 4px 20px rgba(255, 75, 43, 0.35)',
    },
    success: {
      background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
      color: 'white',
      boxShadow: '0 4px 20px rgba(0, 176, 155, 0.35)',
    },
    purple: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.35)',
    },
  };

  const style = { ...baseStyle, ...variants[variant] };

  if (disabled || loading) {
    style.opacity = 0.6;
    style.background = 'linear-gradient(135deg, #3a3a4a 0%, #2a2a3a 100%)';
    style.boxShadow = 'none';
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      whileHover={!disabled && !loading ? { 
        scale: 1.03, 
        boxShadow: variant === 'primary' 
          ? '0 8px 30px rgba(0, 210, 255, 0.5)'
          : variant === 'danger'
          ? '0 8px 30px rgba(255, 75, 43, 0.5)'
          : '0 8px 30px rgba(255, 255, 255, 0.15)',
      } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
    >
      {/* Shimmer Effect */}
      {!disabled && !loading && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            pointerEvents: 'none',
          }}
          animate={{
            left: ['−100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      )}

      {loading ? (
        <>
          <motion.div
            style={{
              width: '18px',
              height: '18px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderTopColor: 'white',
              borderRadius: '50%',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && <span style={{ fontSize: '1.1rem', display: 'flex' }}>{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
