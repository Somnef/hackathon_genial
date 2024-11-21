const { getContractInstance, web3 } = require("../utils/contractUtil");
const GlobalError = require("../utils/GlobalError");
const User = require("../models/User"); // User model for database access

const createOffer = async (req, res, next) => {
  const { amount, pricePerUnit, expiry } = req.body;

  try {
    // Validation
    if (!amount || !pricePerUnit || !expiry) {
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

    const callFun = contract.methods.offerEnergy(amount, pricePerUnit, expiry);
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

module.exports = { createOffer };
