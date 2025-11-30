import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaCrown } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  const NavLink = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.2rem',
            borderRadius: '12px',
            background: isActive ? 'rgba(0, 210, 255, 0.15)' : 'transparent',
            border: isActive ? '1px solid rgba(0, 210, 255, 0.3)' : '1px solid transparent',
            color: isActive ? '#00d2ff' : 'rgba(255,255,255,0.7)',
            fontSize: '0.95rem',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            position: 'relative',
          }}
        >
          {icon}
          <span>{label}</span>
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              style={{
                position: 'absolute',
                bottom: -1,
                left: '50%',
                width: 20,
                height: 3,
                borderRadius: 2,
                background: 'linear-gradient(to right, #00d2ff, #3a7bd5)',
                marginLeft: -10,
              }}
            />
          )}
        </motion.div>
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      style={{
        background: 'rgba(10, 10, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '0.75rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 42,
              height: 42,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0, 210, 255, 0.3)',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
            </svg>
          </motion.div>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '1.3rem', 
              fontWeight: 800,
              background: 'linear-gradient(to right, #ffffff, #00d2ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.05em',
            }}>
              OLYMPUS
            </h1>
            <p style={{ 
              margin: 0, 
              fontSize: '0.65rem', 
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.2em',
              fontWeight: 500,
            }}>
              REAL ESTATE
            </p>
          </div>
        </motion.div>
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
        <NavLink to="/" icon={<FaHome size={16} />} label="Dashboard" />
        <NavLink to="/admin" icon={<FaCrown size={16} />} label="Admin" />
      </div>
    </motion.nav>
  );
};

export default Navbar;
