import axios from 'axios';

// Determine the API base URL
// In production (Vercel), the API is at /api
// In development, it's at http://localhost:4000
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/api';
  }
  return process.env.REACT_APP_API_URL || 'http://localhost:4000';
};

const API_URL = getBaseUrl();
const ADMIN_API_KEY = process.env.REACT_APP_ADMIN_API_KEY;

const api = axios.create({
  baseURL: API_URL,
});

// Public endpoints
export const getHealth = () => api.get('/public/info');
export const getPublicInfo = () => api.get('/public/info');
export const getBalance = (address) => api.get(`/public/balance/${address}`);
export const getWithdrawableRent = (address) => api.get(`/public/withdrawable-rent/${address}`);
export const checkSolvency = () => api.get('/public/info');

// Market endpoints
export const getQuoteBuy = (amountTokens) => api.get(`/market/quote-buy?amountTokens=${amountTokens}`);
export const getQuoteSell = (amountTokens) => api.get(`/market/quote-sell?amountTokens=${amountTokens}`);

// Transaction builders
export const buildBuySharesTx = (amountTokens) => api.post('/tx/buy-shares', { amountTokens });
export const buildSellSharesTx = (amountTokens) => api.post('/tx/sell-shares', { amountTokens });
export const buildClaimRentTx = () => api.post('/tx/claim-rent');

// Admin endpoints
const adminHeaders = { 'x-admin-key': ADMIN_API_KEY };

export const distributeRent = (amountETH) => api.post('/admin/distribute-rent', { amountETH }, { headers: adminHeaders });
export const injectLiquidity = (amountETH) => api.post('/admin/inject-liquidity', { amountETH }, { headers: adminHeaders });
export const adjustSharePrice = (newPriceETH) => api.post('/admin/adjust-share-price', { newPriceETH }, { headers: adminHeaders });
export const emergencyWithdraw = (amountETH) => api.post('/admin/emergency-withdraw', { amountETH }, { headers: adminHeaders });

export default api;
