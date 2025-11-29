# 🏛 Olympus REIT – Backend API Documentation

A decentralized **Real Estate Investment Token (REIT)** backend built on Ethereum Sepolia using:

* Solidity smart contract (`OlympusREIT`)
* Node.js + Express backend
* Ethers.js v6
* MetaMask / Wallet frontends

This backend exposes **REST endpoints** that allow the frontend to:

* Display REIT stats
* Show investor balances
* Generate transaction data for MetaMask (non-custodial)
* Call admin-only functions (server-signed)

---

# 📡 Base URL

When running locally:

```
http://localhost:4000
```

---

# ⚙️ Environment Variables

```
PORT=4000

# Ethereum RPC (Alchemy / Infura)
RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY

# Deployed REIT contract
CONTRACT_ADDRESS=0xcf93041051CF9b58764D25D1ba8A38B77FAc5B85

# Owner wallet (server signs admin tx)
ADMIN_PRIVATE_KEY=0xabc123...

# Admin API key (protects admin routes)
ADMIN_API_KEY=supersecretkey
```

---

# 🧱 Contract Summary

Contract address (Sepolia):

```
0xcf93041051CF9b58764D25D1ba8A38B77FAc5B85
```

### Contract exposes:

### User (non-admin)

* `buyShares(uint256 amountTokens)`
* `sellShares(uint256 amountTokens)`
* `claimRent()`
* `sharePrice()`
* `balanceOf(address)`
* `withdrawableRentOf(address)`
* `totalSupply()`
* `maxSupply()`
* `propertyAddress()`

### Admin (server-signed)

* `adjustSharePrice(uint256 newPriceWei)`
* `injectLiquidity()` (payable)
* `distributeRent()` (payable)
* `emergencyWithdraw(uint256 amountWei)`

---

# 🚀 API Endpoints

## 1. Health Check

```
GET /health
```

Returns the chain and block info.

---

# 📊 PUBLIC (NO WALLET REQUIRED)

## 2. REIT Dashboard Info

```
GET /public/info
```

Returns:

```json
{
  "name": "Olympus REIT",
  "symbol": "OREIT",
  "sharePriceWei": "1000000000000000000",
  "sharePriceEth": "1.0",
  "totalSupplyRaw": "0",
  "totalSupplyTokens": "0.0",
  "maxSupplyRaw": "1000000000000000000000000",
  "maxSupplyTokens": "1000000.0",
  "propertyAddress": "Some property",
  "owner": "0xFd87...",
  "vaultBalanceWei": "0",
  "vaultBalanceEth": "0.0",
  "decimals": 18
}
```

Frontend uses this page for the **dashboard view**.

---

## 3. Get Balance of User

```
GET /public/balance/:walletAddress
```

Response:

```json
{
  "address": "0x123...",
  "balanceRaw": "2000000000000000000",
  "balanceTokens": "2.0"
}
```

---

## 4. Withdrawable Rent (Dividends)

```
GET /public/withdrawable-rent/:walletAddress
```

---

## 5. Solvency Check (Vault liquidity status)

```
GET /public/check-solvency
```

---

# 💸 MARKET (USER – NON CUSTODIAL)

These routes **do not sign transactions**.
They only generate:

```
{ to, data, value }
```

The frontend must pass these directly into MetaMask:

```js
await window.ethereum.request({
  method: "eth_sendTransaction",
  params: [tx]
})
```

---

## 6. Quote Buy Price

```
GET /market/quote-buy?amountTokens=10
```

Response:

```json
{
  "amountTokens": "10",
  "amountRaw": "10000000000000000000",
  "costWei": "50000000000000000",
  "costEth": "0.05",
  "sharePriceWei": "5000000000000000",
  "sharePriceEth": "0.005"
}
```

Use this to show the user how much ETH they need.

---

## 7. Generate Buy Transaction

```
POST /tx/buy-shares
Body: { "amountTokens": "10" }
```

Response:

```json
{
  "to": "0xcf93041051CF9b58764D25D1ba8A38B77FAc5B85",
  "data": "0xabcd1234...",
  "value": "50000000000000000",
  "human": {
    "amountTokens": "10",
    "costEth": "0.05",
    "sharePriceEth": "0.005"
  }
}
```

Frontend example:

```js
const tx = await axios.post("/tx/buy-shares", { amountTokens: "10" });
await window.ethereum.request({
  method: "eth_sendTransaction",
  params: [tx.data]
});
```

---

## 8. Generate Sell Transaction

```
POST /tx/sell-shares
Body: { "amountTokens": "5" }
```

MetaMask signs it.

---

## 9. Generate Claim Rent Transaction

```
POST /tx/claim-rent
```

---

# 🔑 ADMIN ROUTES (SERVER SIGNED)

⚠️ **Do not expose these endpoints to users.**
A special header is needed:

```
x-admin-key: YOUR_ADMIN_API_KEY
```

The backend signs with the owner private key.

---

## 10. Adjust Share Price (NAV update)

```
POST /admin/adjust-share-price
Headers: { "x-admin-key": "ADMIN_API_KEY" }
Body:
{
  "newPriceEth": "0.002"
}
```

---

## 11. Inject Liquidity (send ETH to vault)

```
POST /admin/inject-liquidity
Body: { "amountEth": "0.1" }
```

---

## 12. Distribute Rent (dividends)

```
POST /admin/distribute-rent
Body: { "amountEth": "0.05" }
```

---

## 13. Emergency Withdraw

```
POST /admin/emergency-withdraw
Body: { "amountEth": "0.1" }
```

---

# 🧩 FRONTEND REQUIREMENTS

### The frontend must support:

* MetaMask connection (Sepolia)
* Display dashboard stats (`/public/info`)
* Calling:

  * `/tx/buy-shares`
  * `/tx/sell-shares`
  * `/tx/claim-rent`
  * `/market/quote-buy`
* Using MetaMask to sign/send transactions
* Displaying user:

  * Share balance
  * Pending rent
  * Portfolio value
  * Recent actions

---

# 🔌 MetaMask Transaction Format

MetaMask expects:

```json
{
  "from": "0xUserWallet",
  "to": "0xcf93...",
  "data": "0xabc...",
  "value": "0x123.."  // hex
}
```

Convert `wei` → `hex` using:

```js
value: "0x" + BigInt(costWei).toString(16)
```

---

# 🗂 Folder Structure Recommendation (Frontend)

```
/api
  reit.ts   (axios wrappers)

/hooks
  useBalance.ts
  useSharePrice.ts

/components
  BuyForm.tsx
  SellForm.tsx
  ClaimRentButton.tsx
  DashboardCards.tsx

/pages
  index.tsx
  portfolio.tsx
  admin.tsx (optional)

```

---

# 📌 Notes for Frontend Engineer

* All BUY/SELL/CLAIM actions must be performed **via MetaMask**, NOT the server
* Only ADMIN actions are performed by backend signing
* BigInt values must be `.toString()`'d
* Convert wei → ETH using:

  ```js
  ethers.formatEther(value)
  ```
* Convert tokens → decimals using:

  ```js
  ethers.formatUnits(value, 18)
  ```

---
# olympus_REIT
