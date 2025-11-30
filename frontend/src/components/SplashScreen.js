import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1500),
      setTimeout(() => setStage(3), 2500),
      setTimeout(() => onComplete(), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0f0f2d 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Particles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0 
              }}
              animate={{ 
                y: [null, Math.random() * -500],
                opacity: [0, 0.5, 0],
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                position: 'absolute',
                width: 2 + Math.random() * 3,
                height: 2 + Math.random() * 3,
                background: i % 3 === 0 ? '#00d2ff' : i % 3 === 1 ? '#3a7bd5' : '#9d4edd',
                borderRadius: '50%',
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>

        {/* Glowing Orb */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: stage >= 1 ? [0, 1.2, 1] : 0, 
            opacity: stage >= 1 ? 1 : 0 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 210, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Logo Icon */}
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ 
            scale: stage >= 1 ? 1 : 0, 
            rotateY: stage >= 1 ? 0 : -180 
          }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          style={{
            width: 120,
            height: 120,
            background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 60px rgba(0, 210, 255, 0.4)',
            marginBottom: '2rem',
            position: 'relative',
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              width: 140,
              height: 140,
              borderRadius: '32px',
              border: '3px solid transparent',
              borderTopColor: '#00d2ff',
              borderRightColor: '#3a7bd5',
              borderBottomColor: '#9d4edd',
              borderLeftColor: 'transparent',
            }}
          />
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: stage >= 2 ? 1 : 0, 
            y: stage >= 2 ? 0 : 30 
          }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            margin: 0,
            background: 'linear-gradient(to right, #ffffff, #00d2ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            letterSpacing: '0.1em',
          }}
        >
          OLYMPUS
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ 
            opacity: stage >= 2 ? 1 : 0, 
            y: stage >= 2 ? 0 : 20,
            scale: stage >= 2 ? 1 : 0.8
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: '1.5rem',
            fontWeight: 300,
            color: '#00d2ff',
            letterSpacing: '0.5em',
            marginTop: '0.5rem',
          }}
        >
          REIT
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{
            marginTop: '2rem',
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            maxWidth: 400,
            lineHeight: 1.6,
          }}
        >
          Real Estate Investment on the Blockchain
        </motion.p>

        {/* Loading Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 1 ? 1 : 0 }}
          style={{
            position: 'absolute',
            bottom: 60,
            width: 200,
            height: 4,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${(stage / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
            style={{
              height: '100%',
              background: 'linear-gradient(to right, #00d2ff, #3a7bd5)',
              borderRadius: 2,
            }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 1 ? 0.5 : 0 }}
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          {stage === 1 && 'Initializing...'}
          {stage === 2 && 'Connecting to blockchain...'}
          {stage === 3 && 'Welcome!'}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
