import React from 'react';

const Input = ({ value, onChange, placeholder, type = 'text', label }) => {
  return (
    <div style={{ marginBottom: '1rem', width: '100%' }}>
      {label && <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid var(--glass-border)',
          borderRadius: '8px',
          color: 'white',
          fontSize: '1rem',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.3s ease',
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
      />
    </div>
  );
};

export default Input;
