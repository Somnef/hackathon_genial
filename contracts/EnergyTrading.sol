// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyTrading {
    address payable owner;

    // Basic user data
    mapping(address => bool) public users;

    // Energy offer details

    struct EnergyOffer {
        uint256 id;
        address seller;
        uint256 energyAmount;  // in kWh or any unit
        uint256 pricePerUnit;  // price per energy unit
        uint256 auctionEndTime;
        address highestBidder;
        uint256 highestBid;
        bool auctionEnded;
    }

    struct Bid {
        address bidder;
        uint256 amount;
        uint256 offerId;
    }

    EnergyOffer[] public energyOffers;
    Bid[] public bids;

    event UserRegistered(address user);
    event EnergyOffered(uint256 id, address seller, uint256 energyAmount, uint256 pricePerUnit);
    event NewBid(address bidder, uint256 bidAmount);
    event AuctionEnded(address winner, uint256 amount, uint256 energyAmount);

    modifier onlyRegisteredUser() {
        require(users[msg.sender], "User must be registered.");
        _;
    }

    modifier onlySeller(uint256 offerId) {
        require(msg.sender == energyOffers[offerId].seller, "Only the seller can call this.");
        _;
    }

    constructor() {
        // Register the contract creator as owner
        owner = payable(msg.sender);

        // Register the contract creator as a user
        users[msg.sender] = true;
    }

    // Register a user with their wallet address
    function registerUser() external {
        require(!users[msg.sender], "User already registered.");
        users[msg.sender] = true;
        emit UserRegistered(msg.sender);
    }

    // Offer energy for sale
    function offerEnergy(uint256 _energyAmount, uint256 _pricePerUnit, uint256 _startingPrice, uint256 _auctionDurationMinutes) external onlyRegisteredUser {
        require(_energyAmount > 0, "Energy amount must be greater than zero.");
        require(_pricePerUnit > 0, "Price per unit must be greater than zero.");

        uint256 auctionEndTime = block.timestamp + _auctionDurationMinutes * 1 minutes;

        energyOffers.push(EnergyOffer({
            id: energyOffers.length,
            seller: msg.sender,
            energyAmount: _energyAmount,
            pricePerUnit: _pricePerUnit,
            auctionEndTime: auctionEndTime,
            highestBidder: address(0),
            highestBid: _startingPrice,
            auctionEnded: false
        }));

        emit EnergyOffered(energyOffers.length, msg.sender, _energyAmount, _pricePerUnit);
    }

    // Place a bid on an energy offer
    function placeBid(uint256 offerId) external onlyRegisteredUser payable {
        EnergyOffer storage offer = energyOffers[offerId];

        if (block.timestamp >= offer.auctionEndTime) {
            this.endAuction(offerId);
            return;
        }

        require(!offer.auctionEnded, "Auction has ended.");
        require(offer.seller != msg.sender, "Seller cannot bid on their own offer.");

        require(msg.value > offer.highestBid, "Bid must be higher than the current highest bid.");

        // Refund the previous highest bidder
        if (offer.highestBidder != address(0)) {
            payable(offer.highestBidder).transfer(offer.highestBid);
        }

        // Update the highest bid
        offer.highestBidder = msg.sender;
        offer.highestBid = msg.value;

        // Store the bid
        bids.push(Bid({
            bidder: msg.sender,
            amount: msg.value,
            offerId: offerId
        }));

        emit NewBid(msg.sender, msg.value);
    }

    // End the auction and transfer the energy to the highest bidder (for sellers)
    function endAuction(uint256 offerId) external onlySeller(offerId) {
        require(offerId < energyOffers.length, "Invalid offer ID.");
        EnergyOffer storage offer = energyOffers[offerId];

        require(!offer.auctionEnded, "Auction has already ended.");

        offer.auctionEnded = true;

        // Ensure the contract has enough balance to transfer
        require(address(this).balance >= offer.highestBid, "Insufficient contract balance.");

        // Transfer the highest bid from the buyer to the seller
        if (offer.highestBidder != address(0)) {
            payable(offer.seller).transfer(offer.highestBid);
        }

        emit AuctionEnded(offer.highestBidder, offer.highestBid, offer.energyAmount);
    }

    // Get all active (running) offers
    function getActiveOffers() external view returns (EnergyOffer[] memory) {
        uint256 activeCount = 0;

        // Count how many auctions are still active
        for (uint256 i = 0; i < energyOffers.length; i++) {
            if (block.timestamp < energyOffers[i].auctionEndTime && !energyOffers[i].auctionEnded) {
                activeCount++;
            }
        }

        // Allocate space for active auction IDs
        EnergyOffer[] memory activeOffers = new EnergyOffer[](activeCount);
        uint256 index = 0;

        // Store the IDs of active auctions
        for (uint256 i = 0; i < energyOffers.length; i++) {
            if (block.timestamp < energyOffers[i].auctionEndTime && !energyOffers[i].auctionEnded) {
                activeOffers[index] = energyOffers[i];
                index++;
            }
        }

        return activeOffers;
    }

    // Get all bids for a specific offer
    function getBidsByOffer(uint256 offerId) external view returns (Bid[] memory) {
        uint256 bidCount = 0;

        // Count how many bids are placed on the offer
        for (uint256 i = 0; i < bids.length; i++) {
            if (bids[i].offerId == offerId) {
                bidCount++;
            }
        }

        // Allocate space for bids
        Bid[] memory offerBids = new Bid[](bidCount);
        uint256 index = 0;

        // Store the bids for the offer
        for (uint256 i = 0; i < bids.length; i++) {
            if (bids[i].offerId == offerId) {
                offerBids[index] = bids[i];
                index++;
            }
        }

        return offerBids;
    }

    // Get all offers by a specific user
    function getOffersByUser(address user) external view returns (EnergyOffer[] memory) {
        uint256 userOfferCount = 0;

        // Count how many offers the user has
        for (uint256 i = 0; i < energyOffers.length; i++) {
            if (energyOffers[i].seller == user) {
                userOfferCount++;
            }
        }

        // Allocate space for user offers
        EnergyOffer[] memory userOffers = new EnergyOffer[](userOfferCount);
        uint256 index = 0;

        // Store the offers by the user
        for (uint256 i = 0; i < energyOffers.length; i++) {
            if (energyOffers[i].seller == user) {
                userOffers[index] = energyOffers[i];
                index++;
            }
        }

        return userOffers;
    }

    // Get all bids by a specific user
    function getBidsByUser(address user) external view returns (Bid[] memory) {
        uint256 userBidCount = 0;

        // Count how many bids the user has placed
        for (uint256 i = 0; i < bids.length; i++) {
            if (bids[i].bidder == user) {
                userBidCount++;
            }
        }

        // Allocate space for user bids
        Bid[] memory userBids = new Bid[](userBidCount);
        uint256 index = 0;

        // Store the bids by the user
        for (uint256 i = 0; i < bids.length; i++) {
            if (bids[i].bidder == user) {
                userBids[index] = bids[i];
                index++;
            }
        }

        return userBids;
    }
}
