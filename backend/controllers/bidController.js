const { getContractInstance, web3 } = require("../utils/contractUtil");
const GlobalError = require("../utils/GlobalError");
const User = require("../models/User");

const createBid = async (req, res, next) => {
  const { offerId, bidAmount } = req.body;

  try {
    if (!offerId || !bidAmount) {
      throw new GlobalError("Missing required fields", 400);
    }

    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || !user.walletId || !user.privateKey) {
      throw new GlobalError("User wallet or private key not found", 404);
    }

    const walletId = user.walletId;
    const privateKey = user.privateKey;

    const contract = getContractInstance();

    // Fetch offer details to validate bid
    const offer = await contract.methods.energyOffers(offerId).call();

    // Validate auction is still active
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (currentTimestamp >= offer.auctionEndTime || offer.auctionEnded) {
      throw new GlobalError("Auction has already ended", 400);
    }

    // Ensure the bidder is not the seller
    if (offer.seller.toLowerCase() === walletId.toLowerCase()) {
      throw new GlobalError("Seller cannot bid on their own offer", 400);
    }

    // Convert bid amount to wei
    const bidAmountWei = web3.utils.toWei(bidAmount.toString(), 'ether');

    const callFun = contract.methods.placeBid(+offerId);
    
    // Estimate gas with the bid value
    const gas = await callFun.estimateGas({
      from: walletId,
      value: bidAmountWei
    });

    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(walletId, "latest");
    const chainId = await web3.eth.getChainId();

    const tx = {
      from: walletId,
      to: contract.options.address,
      gas,
      gasPrice,
      data: callFun.encodeABI(),
      value: bidAmountWei,
      nonce,
      chainId,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    res.status(201).json({
      success: true,
      message: "Energy bid created successfully",
      transactionHash: txReceipt.transactionHash,
      bidAmount
    });
  } catch (error) {
    console.error("Bid Creation Error:", error);

    if (error.message.includes("revert")) {
      return next(
        new GlobalError(
          `Bid failed. Possible reasons: auction ended, bid too low, or seller attempting to bid. Error: ${error.message}`,
          400
        )
      );
    }
    next(error);
  }
};

const listBids = async (req, res, next) => {
  try {
    const contract = getContractInstance();
    const { offerId } = req.params;

    const bids = await contract.methods.getBidsByOffer(offerId).call();
    
    // Transform bids to convert BigInt to string
    const transformedBids = bids.map(bid => ({
      bidder: bid.bidder,
      amount: web3.utils.fromWei(bid.amount.toString(), 'ether'),
      offerId: bid.offerId.toString()
    }));

    res.status(200).json({
      success: true,
      message: "Bids retrieved successfully",
      bids: transformedBids,
    });
  } catch (error) {
    console.error("Error listing bids:", error);
    next(error);
  }
};

module.exports = {
  createBid,
  listBids
};