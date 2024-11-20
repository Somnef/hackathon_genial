const { getContractInstance, web3 } = require("../utils/contractUtil");
const GlobalError = require("../utils/GlobalError");

const createBid = async (req, res, next) => {
  const { offerId, bidAmount } = req.body;

  try {
    if (!offerId || !bidAmount) {
      throw new GlobalError("Missing required fields", 400);
    }

    if (bidAmount <= 0) {
      throw new GlobalError("Bid amount must be greater than zero", 400);
    }

    const contract = getContractInstance();
    const accounts = await web3.eth.getAccounts();

    const bidder = accounts[0]; // Assuming the first account is the bidder

    // Check if the offer exists (you can add this if your contract supports offer validation)
    const offer = await contract.methods.getOffer(+offerId).call();
    if (!offer) {
      throw new GlobalError("Offer not found", 404);
    }

    // Proceed to create the bid in the smart contract
    const receipt = await contract.methods
      .placeBid(offerId, bidAmount)
      .send({ from: bidder.walletId });

    // Send a successful response
    res.status(201).json({
      success: true,
      message: "Bid placed successfully",
      bidId: receipt.events.BidPlaced.returnValues.bidId,
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    next(error);
  }
};

const listBids = async (req, res, next) => {
  const { offerId } = req.params;

  try {
    if (!offerId) {
      throw new GlobalError("Offer ID is required", 400);
    }

    // Get contract instance
    const contract = getContractInstance();

    // Get all bids for the given offerId
    const bids = await contract.methods.getBids(+offerId).call();

    res.status(200).json({
      success: true,
      bids,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBid, listBids };
