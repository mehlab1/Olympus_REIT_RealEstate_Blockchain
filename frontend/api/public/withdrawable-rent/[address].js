const { ethers } = require('ethers');

const ABI = ["function withdrawableRentOf(address) view returns (uint256)"];

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
    
    const rent = await contract.withdrawableRentOf(address);
    
    res.status(200).json({ withdrawableRent: ethers.formatEther(rent) });
  } catch (err) {
    console.error('Withdrawable rent error:', err.message);
    res.status(500).json({ error: 'Failed to fetch withdrawable rent', details: err.message });
  }
};
