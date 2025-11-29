import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [wallet, setWallet] = useState({
    address: null,
    provider: null,
    signer: null,
  });
  const [contractInfo, setContractInfo] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [withdrawableRent, setWithdrawableRent] = useState(null);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWallet({ address, provider, signer });
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  }, []);

  const disconnectWallet = () => {
    setWallet({ address: null, provider: null, signer: null });
    setUserBalance(null);
    setWithdrawableRent(null);
  };

  return (
    <AppContext.Provider
      value={{
        wallet,
        connectWallet,
        disconnectWallet,
        contractInfo,
        setContractInfo,
        userBalance,
        setUserBalance,
        withdrawableRent,
        setWithdrawableRent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
