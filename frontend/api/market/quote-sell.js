const { ethers } = require('ethers');

const ABI = ["function sharePrice() view returns (uint256)"];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { amountTokens } = req.query;
    
    if (!amountTokens || isNaN(amountTokens)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, provider);
    
    const sharePrice = await contract.sharePrice();
    const amount = ethers.parseEther(amountTokens);
    const refund = (amount * sharePrice) / ethers.parseEther('1');

    res.status(200).json({
      amountTokens,
      refundETH: ethers.formatEther(refund),
      sharePrice: ethers.formatEther(sharePrice)
    });
  } catch (err) {
    console.error('Quote sell error:', err.message);
    res.status(500).json({ error: 'Failed to get quote', details: err.message });
  }
};
