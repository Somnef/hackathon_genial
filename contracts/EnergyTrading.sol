// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyTrading {
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
    event EnergyOffered(address seller, uint256 energyAmount, uint256 pricePerUnit);
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

    // Register a user with their wallet address
    function registerUser() external {
        require(!users[msg.sender], "User already registered.");
        users[msg.sender] = true;
        emit UserRegistered(msg.sender);
    }

    // Offer energy for sale
    function offerEnergy(uint256 _energyAmount, uint256 _pricePerUnit, uint256 _auctionDurationMinutes) external onlyRegisteredUser {
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
            highestBid: 0,
            auctionEnded: false
        }));

        emit EnergyOffered(msg.sender, _energyAmount, _pricePerUnit);
    }

    // Place a bid on an energy offer
    function placeBid(uint256 offerId, uint256 _bidAmount) external onlyRegisteredUser payable {
        EnergyOffer storage offer = energyOffers[offerId];

        // Automatically check if the auction has ended
        _endAuctionIfExpired(offerId);

        require(block.timestamp < offer.auctionEndTime, "Auction has ended.");
        require(_bidAmount > offer.highestBid, "Bid must be higher than the current highest bid.");

        // Refund previous highest bidder
        if (offer.highestBidder != address(0)) {
            payable(offer.highestBidder).transfer(offer.highestBid);
        }

        // Store the new bid
        bids.push(Bid({
            bidder: msg.sender,
            amount: _bidAmount,
            offerId: offerId
        }));

        // Update highest bid
        offer.highestBidder = msg.sender;
        offer.highestBid = msg.value;

        emit NewBid(msg.sender, msg.value);
    }

    // Automatically end the auction if the time has expired
    function _endAuctionIfExpired(uint256 offerId) private {
        EnergyOffer storage offer = energyOffers[offerId];

        if (block.timestamp >= offer.auctionEndTime && !offer.auctionEnded) {
            // Mark auction as ended
            offer.auctionEnded = true;

            // Transfer the highest bid to the seller
            payable(offer.seller).transfer(offer.highestBid);

            // Emit auction end event
            emit AuctionEnded(offer.highestBidder, offer.highestBid, offer.energyAmount);
        }
    }

    // End the auction and transfer the energy to the highest bidder (for sellers)
    function endAuction(uint256 offerId) external onlySeller(offerId) {
        EnergyOffer storage offer = energyOffers[offerId];

        // Automatically check if auction time has passed and end it
        _endAuctionIfExpired(offerId);

        // Auction has already been ended automatically or manually
        require(offer.auctionEnded, "Auction has not ended yet.");
    }

    // Get all active (running) offers
    function getActiveOffers() external view returns (uint256[] memory) {
        uint256 activeCount = 0;

        // Count how many auctions are still active
        for (uint256 i = 0; i < energyOffers.length; i++) {
            if (block.timestamp < energyOffers[i].auctionEndTime && !energyOffers[i].auctionEnded) {
                activeCount++;
            }
        }

        // Allocate space for active auction IDs
        uint256[] memory activeOfferIds = new uint256[](activeCount);
        uint256 index = 0;

        // Store the IDs of active auctions
        for (uint256 i = 0; i < energyOffers.length; i++) {
            if (block.timestamp < energyOffers[i].auctionEndTime && !energyOffers[i].auctionEnded) {
                activeOfferIds[index] = i;
                index++;
            }
        }

        return activeOfferIds;
    }

    // Get all bids for a specific offer
    function getBids(uint256 offerId) external view returns (Bid[] memory) {
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
}
