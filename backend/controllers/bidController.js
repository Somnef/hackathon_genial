const { getContractInstance, web3 } = require("../utils/contractUtil");
const GlobalError = require("../utils/GlobalError");
const User = require("../models/User"); // User model for database access

const createBid = async (req, res, next) => {
    const {offerId, pricePerUnit } = req.body;

    try {
        if (!offerId || !pricePerUnit) {
            throw new GlobalError("Missing required fields", 400);
        }

        const userId = req.user.id;

        const user = await User.findById(userId
        );
        if (!user || !user.walletId || !user.privateKey) {
            throw new GlobalError("User wallet or private key not found", 404);
        }

        const walletId = user.walletId;
        const privateKey = user.privateKey;

        const contract = getContractInstance();

        const callFun = contract.methods.bidEnergy(offerId, pricePerUnit);
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
            message: "Energy bid created successfully",
            transactionHash: receipt.transactionHash,
        });
    }
    catch (error) {
        console.error("Error creating energy bid:", error);
        next(error);
    }
  };

const listBids = async (req, res, next) => {
    try {
        const contract = getContractInstance();
        const { offerId } = req.params;

        const bids = await contract.methods.getBids(offerId).call();
        res.status(200).json({
            success: true,
            message: "Bids retrieved successfully",
            bids,
        });
    } catch (error) {
        console.error("Error listing bids:", error);
        next(error);
    }
}

module.exports = {
    createBid,
    listBids,
};
