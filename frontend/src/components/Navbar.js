import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? 'var(--accent-color)' : 'var(--text-primary)',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    position: 'relative',
    transition: 'color 0.3s ease'
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(15, 12, 41, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', background: 'linear-gradient(to right, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          OLYMPUS <span style={{ color: 'var(--accent-color)', WebkitTextFillColor: 'initial' }}>REIT</span>
        </h1>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={linkStyle('/')}>Dashboard</Link>
        <Link to="/admin" style={linkStyle('/admin')}>Admin</Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
