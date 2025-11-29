# 🏛 Olympus REIT - Decentralized Real Estate Investment Platform

A complete decentralized application (dApp) for real estate investment on the Ethereum blockchain. Built with React, Node.js, Express, and Ethers.js, featuring a modern glassmorphism UI with smooth animations.

![Olympus REIT](https://img.shields.io/badge/Blockchain-Ethereum-blue)
![Network](https://img.shields.io/badge/Network-Sepolia-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [How to Use](#-how-to-use)
- [API Documentation](#-api-documentation)
- [Smart Contract](#-smart-contract)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### Frontend
- 🎨 **Modern UI** - Glassmorphism design with gradient backgrounds
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 📱 **Responsive Design** - Works on all devices
- 🔔 **Toast Notifications** - Beautiful feedback using react-hot-toast
- 💡 **User Guide** - Built-in help modal for new users
- 🎯 **Real-time Data** - Live contract stats and user balances

### Backend
- 🔒 **Secure Admin Routes** - Protected with API key authentication
- ⚡ **Rate Limiting Protection** - Intelligent caching to avoid RPC limits
- 🛡️ **Error Handling** - Comprehensive error messages
- 📊 **RESTful API** - Clean and well-documented endpoints

### Blockchain
- 💰 **Buy/Sell Shares** - Trade real estate tokens
- 💵 **Earn Dividends** - Receive rent distributions
- 📈 **Dynamic Pricing** - Admin-controlled share price updates
- 🏦 **Vault Management** - Secure ETH storage

---

## 🛠 Tech Stack

### Frontend
- **React** 18.3.1
- **Ethers.js** 6.13.0
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **React Router** 6.23.0
- **React Icons** - UI icons
- **Axios** - HTTP client

### Backend
- **Node.js** with Express
- **Ethers.js** 6.15.0
- **CORS** enabled
- **dotenv** for environment variables

### Blockchain
- **Ethereum Sepolia Testnet**
- **Solidity Smart Contract**
- **MetaMask** integration

---

## 📁 Project Structure

```
olympus_REIT/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Button.js
│   │   │   ├── Card.js
│   │   │   ├── Input.js
│   │   │   ├── Navbar.js
│   │   │   └── Guide.js
│   │   ├── context/         # React Context for state
│   │   │   └── AppContext.js
│   │   ├── pages/           # Main application pages
│   │   │   ├── Dashboard.js
│   │   │   └── Admin.js
│   │   ├── services/        # API integration
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env                 # Frontend environment variables
├── index.js                 # Backend server
├── OlympusREIT.abi.json    # Smart contract ABI
├── package.json             # Backend dependencies
├── .env                     # Backend environment variables
├── .gitignore
└── README.md
```

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **MetaMask** browser extension
- **Sepolia ETH** (for testing) - Get from [Sepolia Faucet](https://sepoliafaucet.com/)
- **Git** (for cloning the repository)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/masab009/olympus_REIT.git
cd olympus_REIT
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

---

## ⚙️ Environment Configuration

### Backend Configuration

Create a `.env` file in the **root directory**:

```env
PORT=4000
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
CONTRACT_ADDRESS=0xcf93041051CF9b58764D25D1ba8A38B77FAc5B85
ADMIN_PRIVATE_KEY=your_private_key_here
ADMIN_API_KEY=supersecret89213jh12h1bnASD
```

**Important:**
- Get a free Infura API key from [infura.io](https://infura.io/)
- `ADMIN_PRIVATE_KEY` should be the private key of the wallet that deployed the contract
- Never commit your `.env` file to version control

### Frontend Configuration

Create a `.env` file in the **frontend** directory:

```env
REACT_APP_API_URL=http://localhost:4000
REACT_APP_ADMIN_API_KEY=supersecret89213jh12h1bnASD
```

---

## 🏃 Running the Application

### 1. Start the Backend Server

In the root directory:

```bash
npm start
```

The backend will run on `http://localhost:4000`

### 2. Start the Frontend Development Server

In a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm start
```

The frontend will open automatically at `http://localhost:3000`

---

## 📖 How to Use

### For Investors

#### 1. **Connect Your Wallet**
- Click the "Connect Wallet" button
- Approve the MetaMask connection
- Ensure you're on the Sepolia network

#### 2. **View Dashboard**
- See current share price
- Check total vault balance
- View circulating supply

#### 3. **Buy Shares**
- Enter the amount of tokens you want to buy
- Click "Get Quote" to see the cost
- Click "Buy Now" and confirm in MetaMask
- Wait for transaction confirmation

#### 4. **Sell Shares**
- Enter the amount of tokens to sell
- Click "Sell Shares"
- Confirm in MetaMask

#### 5. **Claim Rent (Dividends)**
- Check your "Withdrawable Rent" balance
- Click "Claim Rent" when available
- Confirm in MetaMask to receive ETH

### For Admins

Access the Admin Panel by clicking "Admin" in the navigation.

#### Available Admin Actions:

1. **Distribute Rent** - Send ETH dividends to all token holders
2. **Inject Liquidity** - Add ETH to the vault without minting shares
3. **Adjust Share Price** - Update the NAV per share
4. **Emergency Withdraw** - Withdraw funds to owner wallet

**Note:** All admin actions require the server to have the `ADMIN_PRIVATE_KEY` configured.

---

## 📡 API Documentation

### Public Endpoints

#### Get Contract Info
```
GET /public/info
```
Returns contract stats, share price, supply, and vault balance.

#### Get User Balance
```
GET /public/balance/:address
```
Returns token balance for a specific address.

#### Get Withdrawable Rent
```
GET /public/withdrawable-rent/:address
```
Returns pending dividend balance for a user.

#### Get Quote for Buying
```
GET /market/quote-buy?amountTokens=10
```
Returns the ETH cost for buying tokens.

### Transaction Builders

#### Build Buy Transaction
```
POST /tx/buy-shares
Body: { "amountTokens": "10" }
```
Returns transaction data for MetaMask.

#### Build Sell Transaction
```
POST /tx/sell-shares
Body: { "amountTokens": "5" }
```

#### Build Claim Rent Transaction
```
POST /tx/claim-rent
```

### Admin Endpoints

All admin endpoints require the `x-admin-key` header.

#### Distribute Rent
```
POST /admin/distribute-rent
Headers: { "x-admin-key": "YOUR_KEY" }
Body: { "amountEth": "0.05" }
```

#### Adjust Share Price
```
POST /admin/adjust-share-price
Body: { "newPriceEth": "0.002" }
```

---

## 🔗 Smart Contract

**Network:** Ethereum Sepolia Testnet
**Contract Address:** `0xcf93041051CF9b58764D25D1ba8A38B77FAc5B85`

### Key Functions:

- `buyShares(uint256 amountTokens)` - Purchase shares
- `sellShares(uint256 amountTokens)` - Sell shares
- `claimRent()` - Withdraw dividends
- `distributeRent()` - Admin: Distribute dividends
- `adjustSharePrice(uint256 newPrice)` - Admin: Update share price

---

## 🐛 Troubleshooting

### Backend Issues

**Error: "Too Many Requests"**
- Solution: The backend implements caching (30s) and request throttling. Wait a moment and try again.

**Error: "Admin private key not configured"**
- Solution: Add a valid `ADMIN_PRIVATE_KEY` to your `.env` file.

### Frontend Issues

**Error: "Cannot connect wallet"**
- Solution: Install MetaMask and switch to Sepolia network.

**Error: "Insufficient funds"**
- Solution: Get Sepolia ETH from a faucet: https://sepoliafaucet.com/

**Transaction fails**
- Check you have enough Sepolia ETH for gas fees
- Ensure you're connected to the correct network
- Verify the contract has sufficient liquidity for sells

### Common Issues

**"Module not found" errors**
- Run `npm install` in both root and frontend directories

**Port already in use**
- Change the PORT in `.env` files

---

## 🔐 Security Notes

- Never commit `.env` files to version control
- Never share your private keys
- The `ADMIN_PRIVATE_KEY` should only be known to the contract owner
- Use strong, unique API keys for production

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**GitHub:** [@masab009](https://github.com/masab009)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Made with ❤️ for the decentralized future**
