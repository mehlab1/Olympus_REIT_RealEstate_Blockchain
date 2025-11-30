const { ethers } = require('ethers');

const ABI = ["function sharePrice() view returns (uint256)"];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amountTokens } = req.body;
    
    if (!amountTokens || isNaN(amountTokens)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, provider);
    
    const sharePrice = await contract.sharePrice();
    const amount = ethers.parseEther(amountTokens.toString());
    const cost = (amount * sharePrice) / ethers.parseEther('1');

    // Encode function call
    const iface = new ethers.Interface(["function buyShares(uint256 _amount)"]);
    const data = iface.encodeFunctionData("buyShares", [amount]);

    res.status(200).json({
      to: process.env.CONTRACT_ADDRESS,
      data,
      value: cost.toString()
    });
  } catch (err) {
    console.error('Buy shares error:', err.message);
    res.status(500).json({ error: 'Failed to build transaction', details: err.message });
  }
};
