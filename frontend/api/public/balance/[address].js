const { ethers } = require('ethers');

const ABI = ["function balanceOf(address) view returns (uint256)"];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { address } = req.query;
    
    if (!address || !ethers.isAddress(address)) {
      return res.status(400).json({ error: 'Invalid address' });
    }

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, provider);
    
    const balance = await contract.balanceOf(address);
    
    res.status(200).json({ balance: ethers.formatEther(balance) });
  } catch (err) {
    console.error('Balance error:', err.message);
    res.status(500).json({ error: 'Failed to fetch balance', details: err.message });
  }
};
