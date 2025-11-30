import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Input = ({ value, onChange, placeholder, type = 'text', label, icon, suffix, error, helperText }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      style={{ marginBottom: '1.25rem', width: '100%' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label 
          style={{ 
            display: 'block', 
            marginBottom: '0.6rem', 
            color: isFocused ? '#00d2ff' : 'rgba(160, 160, 176, 0.9)', 
            fontSize: '0.85rem',
            fontWeight: '500',
            transition: 'color 0.3s ease',
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </label>
      )}
      
      <div style={{ position: 'relative' }}>
        {icon && (
          <div style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: isFocused ? '#00d2ff' : 'rgba(160, 160, 176, 0.6)',
            transition: 'color 0.3s ease',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}>
            {icon}
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: icon ? '14px 16px 14px 44px' : '14px 16px',
            paddingRight: suffix ? '60px' : '16px',
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 100%)',
            border: `1px solid ${error ? 'rgba(255, 75, 43, 0.5)' : isFocused ? 'rgba(0, 210, 255, 0.5)' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: '12px',
            color: 'white',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
            boxShadow: isFocused 
              ? '0 0 0 3px rgba(0, 210, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.2)' 
              : '0 2px 10px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {suffix && (
          <div style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(160, 160, 176, 0.8)',
            fontSize: '0.9rem',
            fontWeight: '500',
            pointerEvents: 'none',
          }}>
            {suffix}
          </div>
        )}

        {/* Animated Focus Ring */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              style={{
                position: 'absolute',
                inset: '-2px',
                borderRadius: '14px',
                border: '2px solid transparent',
                background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.3), rgba(157, 78, 221, 0.3)) border-box',
                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* Helper/Error Text */}
      <AnimatePresence>
        {(error || helperText) && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            style={{
              margin: '0.5rem 0 0 0',
              fontSize: '0.8rem',
              color: error ? '#ff4b2b' : 'rgba(160, 160, 176, 0.7)',
            }}
          >
            {error || helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Input;
