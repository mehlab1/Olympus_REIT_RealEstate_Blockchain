const { ethers } = require('ethers');

// Load ABI
const ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function maxSupply() view returns (uint256)",
  "function sharePrice() view returns (uint256)",
  "function propertyAddress() view returns (string)",
  "function owner() view returns (address)"
];

// Simple in-memory cache
let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 30000; // 30 seconds

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const now = Date.now();
    
    // Return cached data if valid
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
      return res.status(200).json(cache.data);
    }

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, provider);

    // Fetch data sequentially to avoid rate limiting
    const name = await contract.name();
    await delay(100);
    const symbol = await contract.symbol();
    await delay(100);
    const totalSupply = await contract.totalSupply();
    await delay(100);
    const maxSupply = await contract.maxSupply();
    await delay(100);
    const sharePrice = await contract.sharePrice();
    await delay(100);
    const propertyAddress = await contract.propertyAddress();
    await delay(100);
    const owner = await contract.owner();
    await delay(100);
    const balance = await provider.getBalance(process.env.CONTRACT_ADDRESS);

    const data = {
      name,
      symbol,
      totalSupply: ethers.formatEther(totalSupply),
      maxSupply: ethers.formatEther(maxSupply),
      sharePrice: ethers.formatEther(sharePrice),
      propertyAddress,
      owner,
      contractBalance: ethers.formatEther(balance)
    };

    // Update cache
    cache = { data, timestamp: now };

    res.status(200).json(data);
  } catch (err) {
    console.error('Info error:', err.message);
    res.status(500).json({ error: 'Failed to fetch contract info', details: err.message });
  }
};
