import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, title, delay = 0, className = '', icon, accent = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      className={`glass-card ${className}`}
      style={{
        background: accent 
          ? 'linear-gradient(135deg, rgba(0, 210, 255, 0.1) 0%, rgba(58, 123, 213, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: accent 
          ? '1px solid rgba(0, 210, 255, 0.2)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '1.75rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        boxShadow: accent 
          ? '0 20px 50px rgba(0, 210, 255, 0.15)'
          : '0 20px 50px rgba(0, 0, 0, 0.35)',
        borderColor: accent 
          ? 'rgba(0, 210, 255, 0.4)'
          : 'rgba(255, 255, 255, 0.15)',
        transition: { duration: 0.3 }
      }}
    >
      {/* Corner Glow Effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '100%',
        height: '100%',
        background: accent
          ? 'radial-gradient(circle, rgba(0, 210, 255, 0.08) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {title && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1,
        }}>
          {icon && (
            <motion.div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.2), rgba(157, 78, 221, 0.2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {icon}
            </motion.div>
          )}
          <h3 style={{ 
            margin: 0,
            fontSize: '1.2rem',
            fontWeight: '600',
            background: accent 
              ? 'linear-gradient(135deg, #00d2ff, #3a7bd5)'
              : 'linear-gradient(135deg, #ffffff, #a0a0b0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {title}
          </h3>
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
        {children}
      </div>

      {/* Bottom Border Gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0, 210, 255, 0.3), transparent)',
        opacity: 0.5,
      }} />
    </motion.div>
  );
};

export default Card;
