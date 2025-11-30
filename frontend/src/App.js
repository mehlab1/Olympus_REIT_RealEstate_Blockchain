import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import Guide from './components/Guide';
import SplashScreen from './components/SplashScreen';
import AnimatedBackground from './components/AnimatedBackground';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="App">
            <AnimatedBackground />
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </div>
            <Guide />
            <Toaster 
              position="bottom-right"
              containerStyle={{
                bottom: 40,
                right: 20,
              }}
              toastOptions={{
                style: {
                  background: 'transparent',
                  boxShadow: 'none',
                  padding: 0,
                },
              }}
            />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
