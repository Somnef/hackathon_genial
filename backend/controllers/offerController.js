const { getContractInstance, web3 } = require("../utils/contractUtil");
const GlobalError = require("../utils/GlobalError");
const User = require("../models/User"); // User model for database access

const createOffer = async (req, res, next) => {
  const { amount, pricePerUnit, expiry, startingPrice } = req.body;

  try {
    if (!amount || !pricePerUnit || !expiry || !startingPrice) {
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

    const callFun = contract.methods.offerEnergy(
      amount,
      pricePerUnit,
      expiry,
      startingPrice
    );
    const gas = await callFun.estimateGas({ from: walletId });
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(walletId, "latest");
    const chainId = await web3.eth.getChainId();

    const tx = {
      from: walletId,
      to: contract.options.address,
      gas,
      gasPrice,
      data: callFun.encodeABI(),
      nonce,
      chainId,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    const txHash = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    const receipt = await web3.eth.getTransactionReceipt(
      txHash.transactionHash
    );

    res.status(201).json({
      success: true,
      message: "Energy offer created successfully",
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    console.error("Error creating energy offer:", error);
    next(error);
  }
};

const listOffer = async (req, res, next) => {
  try {
    const contract = getContractInstance();

    const offers = await contract.methods.getActiveOffers().call();

    res.status(200).json({
      success: true,
      offers: offers.map((offer) => ({
        offerId: offer.id.toString(),
        seller: offer.seller,
        amount: offer.energyAmount.toString(),
        pricePerUnit: offer.pricePerUnit.toString(),
        expiry: offer.auctionEndTime.toString(),
        status: offer.auctionEnded,
      })),
    });
  } catch (error) {
    console.error("Error listing offers:", error);
    next(error);
  }
};

const endOffer = async (req, res, next) => {
  const { offerId } = req.body;

  try {
    if (!offerId) {
      throw new GlobalError("Missing required field: offerId", 400);
    }

    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || !user.walletId || !user.privateKey) {
      throw new GlobalError("User wallet or private key not found", 404);
    }

    const walletId = user.walletId;
    const privateKey = user.privateKey;

    const contract = getContractInstance();

    const callFun = contract.methods.endAuction(offerId);
    const gas = await callFun.estimateGas({ from: walletId });
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(walletId, "latest");
    const chainId = await web3.eth.getChainId();

    const tx = {
      from: walletId,
      to: contract.options.address,
      gas,
      gasPrice,
      data: callFun.encodeABI(),
      nonce,
      chainId,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    const txHash = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    const receipt = await web3.eth.getTransactionReceipt(
      txHash.transactionHash
    );

    res.status(200).json({
      success: true,
      message: "Offer ended successfully",
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    console.error("Error ending offer:", error);
    next(error);
  }
};

module.exports = { createOffer, listOffer, endOffer };
