require("dotenv").config();
const { ethers } = require("ethers");
const ABI = require("./OlympusREIT.abi.json");

async function testConnection() {
    console.log("--- Testing Blockchain Connection ---");
    
    const rpcUrl = process.env.RPC_URL;
    const contractAddress = process.env.CONTRACT_ADDRESS;

    console.log(`RPC URL: ${rpcUrl ? "Found" : "Missing"}`);
    console.log(`Contract Address: ${contractAddress}`);

    if (!rpcUrl) {
        console.error("Error: RPC_URL is missing in .env");
        return;
    }

    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        console.log("Attempting to connect to provider...");
        
        const network = await provider.getNetwork();
        console.log(`Connected to network: ${network.name} (Chain ID: ${network.chainId})`);

        console.log("Attempting to fetch contract data...");
        const contract = new ethers.Contract(contractAddress, ABI, provider);
        
        const name = await contract.name();
        console.log(`Success! Contract Name: ${name}`);

        console.log("Testing other contract functions...");
        
        try { console.log("Symbol:", await contract.symbol()); } catch(e) { console.error("Failed: symbol", e.message); }
        try { console.log("Share Price:", await contract.sharePrice()); } catch(e) { console.error("Failed: sharePrice", e.message); }
        try { console.log("Total Supply:", await contract.totalSupply()); } catch(e) { console.error("Failed: totalSupply", e.message); }
        try { console.log("Max Supply:", await contract.maxSupply()); } catch(e) { console.error("Failed: maxSupply", e.message); }
        try { console.log("Property Address:", await contract.propertyAddress()); } catch(e) { console.error("Failed: propertyAddress", e.message); }
        try { console.log("Decimals:", await contract.decimals()); } catch(e) { console.error("Failed: decimals", e.message); }
        try { console.log("Owner:", await contract.owner()); } catch(e) { console.error("Failed: owner", e.message); }
        try { console.log("Balance:", await provider.getBalance(contractAddress)); } catch(e) { console.error("Failed: balance", e.message); }
        
    } catch (error) {
        console.error("\n!!! CONNECTION FAILED !!!");
        console.error("Error details:", error.message);
        if (error.code) console.error("Error code:", error.code);
    }
}

testConnection();
