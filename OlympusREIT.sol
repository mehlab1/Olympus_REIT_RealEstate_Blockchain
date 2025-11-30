// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OlympusREIT is ERC20, Ownable {

    // --- Asset Config ---
    uint256 public sharePrice = 0.001 ether; 
    uint256 public maxSupply = 5000 * 10**18; 
    string public propertyAddress = "Penthouse A, Centaurus Mall, Islamabad";

    // --- Dividend Math ---
    uint256 constant MAGNITUDE = 2**128; 
    uint256 public magnifiedDividendPerShare;
    mapping(address => int256) public magnifiedDividendCorrections;
    mapping(address => uint256) public withdrawnDividends;

    // --- Events ---
    event SharesPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event SharesSold(address indexed seller, uint256 amount, uint256 refund);
    event LiquidityAdded(address indexed provider, uint256 amount);
    event RentDistributed(uint256 totalRent);
    event PriceAdjusted(uint256 newPrice);

    // --------------------------------------------------------
    // CONSTRUCTOR (Now Payable!)
    // --------------------------------------------------------
    constructor() payable ERC20("Olympus Penthouse", "SQFT") Ownable(msg.sender) {
        // If you send ETH during deployment, it sits in the vault as reserve.
    }

    // --------------------------------------------------------
    // CORE: BUY & SELL
    // --------------------------------------------------------
    function buyShares(uint256 _amount) public payable {
        uint256 cost = (_amount * sharePrice) / 10**18;
        require(msg.value >= cost, "Insufficient ETH sent");
        require(totalSupply() + _amount <= maxSupply, "IPO Sold Out");

        _mint(msg.sender, _amount);
        magnifiedDividendCorrections[msg.sender] -= int256(magnifiedDividendPerShare * _amount);

        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
        emit SharesPurchased(msg.sender, _amount, cost);
    }

    function sellShares(uint256 _amount) public {
        require(balanceOf(msg.sender) >= _amount, "Insufficient Share Balance");
        claimRent(); 

        uint256 refund = (_amount * sharePrice) / 10**18;
        
        // FINANCIAL SOLVENCY CHECK
        require(address(this).balance >= refund, "Liquidity Crisis: Contract cannot pay");

        _burn(msg.sender, _amount);
        magnifiedDividendCorrections[msg.sender] += int256(magnifiedDividendPerShare * _amount);

        payable(msg.sender).transfer(refund);
        emit SharesSold(msg.sender, _amount, refund);
    }

    // --------------------------------------------------------
    // LIQUIDITY MANAGEMENT (The "Central Bank" Tools)
    // --------------------------------------------------------
    
    function injectLiquidity() external payable onlyOwner {
        emit LiquidityAdded(msg.sender, msg.value);
    }

    function checkSolvency() public view returns (bool isSolvent, int256 deficitOrSurplus) {
        uint256 liability = (totalSupply() * sharePrice) / 10**18;
        uint256 assets = address(this).balance;
        
        if (assets >= liability) {
            return (true, int256(assets - liability));
        } else {
            return (false, int256(assets) - int256(liability));
        }
    }

    // --------------------------------------------------------
    // RENT & ADMIN
    // --------------------------------------------------------
    function distributeRent() public payable onlyOwner {
        require(totalSupply() > 0, "No shareholders");
        magnifiedDividendPerShare += (msg.value * MAGNITUDE) / totalSupply();
        emit RentDistributed(msg.value);
    }

    function claimRent() public {
        uint256 _withdrawable = withdrawableRentOf(msg.sender);
        if (_withdrawable > 0) {
            withdrawnDividends[msg.sender] += _withdrawable;
            payable(msg.sender).transfer(_withdrawable);
        }
    }

    // ✅ FIXED: Added division by MAGNITUDE to get actual ETH value
    function withdrawableRentOf(address _owner) public view returns(uint256) {
        int256 accumulated = int256(magnifiedDividendPerShare * balanceOf(_owner));
        int256 _withdrawable = accumulated + magnifiedDividendCorrections[_owner];
        if (_withdrawable < 0) return 0;
        
        uint256 totalOwed = uint256(_withdrawable) / MAGNITUDE;  // ✅ Divide by MAGNITUDE here
        if (totalOwed <= withdrawnDividends[_owner]) return 0;
        return totalOwed - withdrawnDividends[_owner];
    }

    function adjustSharePrice(uint256 _newPrice) external onlyOwner {
        sharePrice = _newPrice;
        emit PriceAdjusted(_newPrice);
    }

    function emergencyWithdraw(uint256 _amount) external onlyOwner {
        require(address(this).balance >= _amount, "Insufficient Funds");
        payable(owner()).transfer(_amount);
    }
    
    receive() external payable {
        emit LiquidityAdded(msg.sender, msg.value);
    }
}
