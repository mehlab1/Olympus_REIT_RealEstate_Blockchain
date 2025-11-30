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
    // Encode function call
    const iface = new ethers.Interface(["function claimRent()"]);
    const data = iface.encodeFunctionData("claimRent", []);

    res.status(200).json({
      to: process.env.CONTRACT_ADDRESS,
      data,
      value: '0'
    });
  } catch (err) {
    console.error('Claim rent error:', err.message);
    res.status(500).json({ error: 'Failed to build transaction', details: err.message });
  }
};
