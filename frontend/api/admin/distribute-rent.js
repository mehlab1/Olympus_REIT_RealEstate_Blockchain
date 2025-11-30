const { ethers } = require('ethers');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check admin key
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!process.env.ADMIN_PRIVATE_KEY) {
      return res.status(500).json({ error: 'Admin wallet not configured' });
    }

    const { amountETH } = req.body;
    
    if (!amountETH || isNaN(amountETH)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);
    
    const ABI = ["function distributeRent() payable"];
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, wallet);
    
    const value = ethers.parseEther(amountETH.toString());
    const tx = await contract.distributeRent({ value });
    const receipt = await tx.wait();

    res.status(200).json({
      success: true,
      txHash: receipt.hash,
      message: `Distributed ${amountETH} ETH as rent`
    });
  } catch (err) {
    console.error('Distribute rent error:', err.message);
    res.status(500).json({ error: 'Failed to distribute rent', details: err.message });
  }
};
