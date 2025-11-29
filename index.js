// index.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const ABI = require("./OlympusREIT.abi.json");

const app = express();
app.use(cors());
app.use(express.json());

// ---------- Config ----------

const PORT = process.env.PORT || 4000;
const RPC_URL = process.env.RPC_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

if (!RPC_URL || !CONTRACT_ADDRESS) {
  console.error("RPC_URL and CONTRACT_ADDRESS must be set in .env");
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider(RPC_URL);

// Read-only contract
const readContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

// Owner signer (for admin-only functions)
let ownerWallet;
let ownerContract;
if (ADMIN_PRIVATE_KEY) {
  ownerWallet = new ethers.Wallet(ADMIN_PRIVATE_KEY, provider);
  ownerContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, ownerWallet);
}

// Helper: admin auth
function requireAdmin(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (!ADMIN_API_KEY || key !== ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!ownerContract) {
    return res
      .status(500)
      .json({ error: "Admin private key not configured on server" });
  }
  next();
}

// Helper: BigInt to decimal string (ETH)
function formatWei(weiBigInt) {
  return ethers.formatEther(weiBigInt);
}

// Helper: parse token amount in human units ("1", "0.5" etc) to 18 decimals
function parseTokenAmount(amountTokens) {
  return ethers.parseUnits(amountTokens.toString(), 18);
}

// Precompute 1e18 as BigInt
const ONE_ETHER_UNITS = 10n ** 18n;

// =====================================================================
//  HEALTH & BASIC INFO
// =====================================================================

app.get("/health", async (req, res) => {
  try {
    const [blockNumber, chainId] = await Promise.all([
      provider.getBlockNumber(),
      provider.getNetwork().then((n) => n.chainId)
    ]);
    res.json({
      status: "ok",
      network: "sepolia",
      chainId: chainId.toString(),
      blockNumber
    });
  } catch (err) {
    console.error("Health error:", err);
    res.status(500).json({ error: "Health check failed" });
  }
});

//  Contract dashboard summary
app.get("/public/info", async (req, res) => {
  try {
    const [
      name,
      symbol,
      sharePrice,
      totalSupply,
      maxSupply,
      propertyAddress,
      decimals,
      owner,
      contractBalance
    ] = await Promise.all([
      readContract.name(),
      readContract.symbol(),
      readContract.sharePrice(),
      readContract.totalSupply(),
      readContract.maxSupply(),
      readContract.propertyAddress(),
      readContract.decimals(),
      readContract.owner(),
      provider.getBalance(CONTRACT_ADDRESS)
    ]);

    res.json({
      name,
      symbol,

      sharePriceWei: sharePrice.toString(),
      sharePriceEth: formatWei(sharePrice),

      totalSupplyRaw: totalSupply.toString(),
      totalSupplyTokens: ethers.formatUnits(totalSupply, Number(decimals)),

      maxSupplyRaw: maxSupply.toString(),
      maxSupplyTokens: ethers.formatUnits(maxSupply, Number(decimals)),

      propertyAddress,
      owner,

      vaultBalanceWei: contractBalance.toString(),
      vaultBalanceEth: formatWei(contractBalance),

      decimals: Number(decimals)
    });

  } catch (err) {
    console.error("Info error:", err);
    res.status(500).json({ error: "Failed to fetch info" });
  }
});

//  Balance of an investor (address param)
app.get("/public/balance/:address", async (req, res) => {
  try {
    const address = req.params.address;
    if (!ethers.isAddress(address)) {
      return res.status(400).json({ error: "Invalid address" });
    }
    const [decimals, bal] = await Promise.all([
      readContract.decimals(),
      readContract.balanceOf(address)
    ]);

    res.json({
      address,
      balanceRaw: bal.toString(),
      balanceTokens: ethers.formatUnits(bal, Number(decimals))
    });
  } catch (err) {
    console.error("Balance error:", err);
    res.status(500).json({ error: "Failed to fetch balance" });
  }
});

//  Withdrawable rent (pending dividends) for a user
app.get("/public/withdrawable-rent/:address", async (req, res) => {
  try {
    const address = req.params.address;
    if (!ethers.isAddress(address)) {
      return res.status(400).json({ error: "Invalid address" });
    }
    const pending = await readContract.withdrawableRentOf(address);
    res.json({
      address,
      withdrawableRentWei: pending.toString(),
      withdrawableRentEth: formatWei(pending)
    });
  } catch (err) {
    console.error("withdrawableRent error:", err);
    res.status(500).json({ error: "Failed to fetch withdrawable rent" });
  }
});

//  Solvency check – "Audit"
app.get("/public/check-solvency", async (req, res) => {
  try {
    const [isSolvent, deficitOrSurplus] = await readContract.checkSolvency();
    res.json({
      isSolvent,
      deficitOrSurplusWei: deficitOrSurplus.toString(),
      deficitOrSurplusEth: formatWei(deficitOrSurplus)
    });
  } catch (err) {
    console.error("checkSolvency error:", err);
    res.status(500).json({ error: "Failed to check solvency" });
  }
});

// =====================================================================
//  MARKET: QUOTES + TX BUILDERS (NON-CUSTODIAL)
// =====================================================================

//  Quote the cost in ETH for buying X tokens
//  GET /market/quote-buy?amountTokens=1.5
app.get("/market/quote-buy", async (req, res) => {
  try {
    const amountTokens = req.query.amountTokens;
    if (!amountTokens) {
      return res
        .status(400)
        .json({ error: "amountTokens query param is required" });
    }

    const amount = parseTokenAmount(amountTokens);
    const sharePrice = await readContract.sharePrice();

    const costWei = (amount * sharePrice) / ONE_ETHER_UNITS;

    res.json({
      amountTokens: amountTokens.toString(),
      amountRaw: amount.toString(),
      costWei: costWei.toString(),
      costEth: formatWei(costWei),
      sharePriceWei: sharePrice.toString(),
      sharePriceEth: formatWei(sharePrice)
    });
  } catch (err) {
    console.error("quote-buy error:", err);
    res.status(500).json({ error: "Failed to quote buy" });
  }
});

//  Build transaction data for buyShares
//  POST /tx/buy-shares  { "amountTokens": "1.0" }
//  Frontend should send this via MetaMask using returned { to, data, value }
app.post("/tx/buy-shares", async (req, res) => {
  try {
    const { amountTokens } = req.body;
    if (!amountTokens) {
      return res
        .status(400)
        .json({ error: "amountTokens field is required in body" });
    }

    const amount = parseTokenAmount(amountTokens);
    const sharePrice = await readContract.sharePrice();
    const costWei = (amount * sharePrice) / ONE_ETHER_UNITS;

    const iface = readContract.interface;
    const data = iface.encodeFunctionData("buyShares", [amount]);

    res.json({
      to: CONTRACT_ADDRESS,
      data,
      value: costWei.toString(), // recommended msg.value
      human: {
        amountTokens: amountTokens.toString(),
        costEth: formatWei(costWei),
        sharePriceEth: formatWei(sharePrice)
      }
    });
  } catch (err) {
    console.error("tx/buy-shares error:", err);
    res.status(500).json({ error: "Failed to build buyShares tx" });
  }
});

//  Build transaction data for sellShares
//  POST /tx/sell-shares  { "amountTokens": "1.0" }
app.post("/tx/sell-shares", async (req, res) => {
  try {
    const { amountTokens } = req.body;
    if (!amountTokens) {
      return res
        .status(400)
        .json({ error: "amountTokens field is required in body" });
    }

    const amount = parseTokenAmount(amountTokens);
    const iface = readContract.interface;
    const data = iface.encodeFunctionData("sellShares", [amount]);

    res.json({
      to: CONTRACT_ADDRESS,
      data,
      value: "0",
      human: {
        amountTokens: amountTokens.toString()
      }
    });
  } catch (err) {
    console.error("tx/sell-shares error:", err);
    res.status(500).json({ error: "Failed to build sellShares tx" });
  }
});

//  Build transaction data for claimRent (pull-pay dividends)
//  POST /tx/claim-rent  {}
app.post("/tx/claim-rent", async (req, res) => {
  try {
    const iface = readContract.interface;
    const data = iface.encodeFunctionData("claimRent", []);

    res.json({
      to: CONTRACT_ADDRESS,
      data,
      value: "0"
    });
  } catch (err) {
    console.error("tx/claim-rent error:", err);
    res.status(500).json({ error: "Failed to build claimRent tx" });
  }
});

// =====================================================================
//  ADMIN ROUTES (OWNER-ONLY, SERVER SIGNS TX)
//  Protect them with x-admin-key header
// =====================================================================

//  Distribute rent (dividends) – you attach ETH
//  POST /admin/distribute-rent  { "amountEth": "0.05" }
app.post("/admin/distribute-rent", requireAdmin, async (req, res) => {
  try {
    const { amountEth } = req.body;
    if (!amountEth) {
      return res
        .status(400)
        .json({ error: "amountEth field is required in body" });
    }

    const value = ethers.parseEther(amountEth.toString());
    const tx = await ownerContract.distributeRent({ value });
    const receipt = await tx.wait();

    res.json({
      action: "distributeRent",
      txHash: tx.hash,
      status: receipt.status
    });
  } catch (err) {
    console.error("admin/distribute-rent error:", err);
    res.status(500).json({ error: err.message || "Failed to distribute rent" });
  }
});

//  Inject liquidity into vault without minting – also attach ETH
//  POST /admin/inject-liquidity  { "amountEth": "0.1" }
app.post("/admin/inject-liquidity", requireAdmin, async (req, res) => {
  try {
    const { amountEth } = req.body;
    if (!amountEth) {
      return res
        .status(400)
        .json({ error: "amountEth field is required in body" });
    }

    const value = ethers.parseEther(amountEth.toString());
    const tx = await ownerContract.injectLiquidity({ value });
    const receipt = await tx.wait();

    res.json({
      action: "injectLiquidity",
      txHash: tx.hash,
      status: receipt.status
    });
  } catch (err) {
    console.error("admin/inject-liquidity error:", err);
    res
      .status(500)
      .json({ error: err.message || "Failed to inject liquidity" });
  }
});

//  Adjust share price (NAV update)
//  POST /admin/adjust-share-price  { "newPriceEth": "0.002" }
//  or send { "newPriceWei": "2000000000000000" }
app.post("/admin/adjust-share-price", requireAdmin, async (req, res) => {
  try {
    const { newPriceEth, newPriceWei } = req.body;
    if (!newPriceEth && !newPriceWei) {
      return res.status(400).json({
        error: "Provide either newPriceEth or newPriceWei in body"
      });
    }

    const newPrice = newPriceWei
      ? BigInt(newPriceWei)
      : ethers.parseEther(newPriceEth.toString());

    const tx = await ownerContract.adjustSharePrice(newPrice);
    const receipt = await tx.wait();

    res.json({
      action: "adjustSharePrice",
      txHash: tx.hash,
      status: receipt.status,
      newPriceWei: newPrice.toString(),
      newPriceEth: formatWei(newPrice)
    });
  } catch (err) {
    console.error("admin/adjust-share-price error:", err);
    res
      .status(500)
      .json({ error: err.message || "Failed to adjust share price" });
  }
});

//  Emergency withdraw from vault
//  POST /admin/emergency-withdraw  { "amountEth": "0.1" }
//  or { "amountWei": "100000000000000000" }
app.post("/admin/emergency-withdraw", requireAdmin, async (req, res) => {
  try {
    const { amountEth, amountWei } = req.body;
    if (!amountEth && !amountWei) {
      return res.status(400).json({
        error: "Provide either amountEth or amountWei in body"
      });
    }

    const amount = amountWei
      ? BigInt(amountWei)
      : ethers.parseEther(amountEth.toString());

    const tx = await ownerContract.emergencyWithdraw(amount);
    const receipt = await tx.wait();

    res.json({
      action: "emergencyWithdraw",
      txHash: tx.hash,
      status: receipt.status,
      amountWei: amount.toString(),
      amountEth: formatWei(amount)
    });
  } catch (err) {
    console.error("admin/emergency-withdraw error:", err);
    res
      .status(500)
      .json({ error: err.message || "Failed to emergency withdraw" });
  }
});

// =====================================================================

app.listen(PORT, () => {
  console.log(`OlympusREIT backend running on http://localhost:${PORT}`);
});
