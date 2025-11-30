require("dotenv").config();
const { ethers } = require("ethers");
const ABI = require("./OlympusREIT.abi.json");

async function transferOwnership() {
    console.log("--- Transferring Contract Ownership ---");
    
    const rpcUrl = process.env.RPC_URL;
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const currentOwnerKey = process.env.ADMIN_PRIVATE_KEY;
    
    // IMPORTANT: Replace this with your NEW owner address
    const newOwnerAddress = "0xYOUR_NEW_OWNER_ADDRESS_HERE";

    if (!rpcUrl || !contractAddress || !currentOwnerKey) {
        console.error("Error: Missing required environment variables");
        return;
    }

    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const currentOwnerWallet = new ethers.Wallet(currentOwnerKey, provider);
        const contract = new ethers.Contract(contractAddress, ABI, currentOwnerWallet);
        
        console.log(`Current Owner: ${currentOwnerWallet.address}`);
        console.log(`New Owner: ${newOwnerAddress}`);
        console.log(`Contract: ${contractAddress}`);
        
        // Verify current owner
        const currentOwner = await contract.owner();
        console.log(`\nContract's current owner: ${currentOwner}`);
        
        if (currentOwner.toLowerCase() !== currentOwnerWallet.address.toLowerCase()) {
            console.error("ERROR: The private key provided does not match the current contract owner!");
            return;
        }
        
        // Transfer ownership
        console.log("\nInitiating ownership transfer...");
        const tx = await contract.transferOwnership(newOwnerAddress);
        console.log(`Transaction sent: ${tx.hash}`);
        
        console.log("Waiting for confirmation...");
        const receipt = await tx.wait();
        
        if (receipt.status === 1) {
            console.log("✅ Ownership transferred successfully!");
            
            // Verify new owner
            const verifyOwner = await contract.owner();
            console.log(`\nNew contract owner: ${verifyOwner}`);
            
            console.log("\n⚠️  IMPORTANT: Update your .env file with the new owner's private key:");
            console.log("ADMIN_PRIVATE_KEY=your_new_owner_private_key_here");
        } else {
            console.log("❌ Transaction failed!");
        }
        
    } catch (error) {
        console.error("\n!!! Transfer Failed !!!");
        console.error("Error:", error.message);
    }
}

transferOwnership();
