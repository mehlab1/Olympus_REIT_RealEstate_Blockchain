const { ethers } = require('ethers');

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

    const amount = ethers.parseEther(amountTokens.toString());

    // Encode function call
    const iface = new ethers.Interface(["function sellShares(uint256 _amount)"]);
    const data = iface.encodeFunctionData("sellShares", [amount]);

    res.status(200).json({
      to: process.env.CONTRACT_ADDRESS,
      data,
      value: '0'
    });
  } catch (err) {
    console.error('Sell shares error:', err.message);
    res.status(500).json({ error: 'Failed to build transaction', details: err.message });
  }
};
