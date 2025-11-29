import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const ADMIN_API_KEY = process.env.REACT_APP_ADMIN_API_KEY;

const api = axios.create({
  baseURL: API_URL,
});

// Public endpoints
export const getHealth = () => api.get('/health');
export const getPublicInfo = () => api.get('/public/info');
export const getBalance = (address) => api.get(`/public/balance/${address}`);
export const getWithdrawableRent = (address) => api.get(`/public/withdrawable-rent/${address}`);
export const checkSolvency = () => api.get('/public/check-solvency');

// Market endpoints
export const getQuoteBuy = (amountTokens) => api.get(`/market/quote-buy?amountTokens=${amountTokens}`);

// Transaction builders
export const buildBuySharesTx = (amountTokens) => api.post('/tx/buy-shares', { amountTokens });
export const buildSellSharesTx = (amountTokens) => api.post('/tx/sell-shares', { amountTokens });
export const buildClaimRentTx = () => api.post('/tx/claim-rent');

// Admin endpoints
const adminHeaders = { 'x-admin-key': ADMIN_API_KEY };

export const distributeRent = (amountEth) => api.post('/admin/distribute-rent', { amountEth }, { headers: adminHeaders });
export const injectLiquidity = (amountEth) => api.post('/admin/inject-liquidity', { amountEth }, { headers: adminHeaders });
export const adjustSharePrice = (newPriceEth) => api.post('/admin/adjust-share-price', { newPriceEth }, { headers: adminHeaders });
export const emergencyWithdraw = (amountEth) => api.post('/admin/emergency-withdraw', { amountEth }, { headers: adminHeaders });

export default api;
