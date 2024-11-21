const { getContractInstance, web3 } = require("../utils/contractUtil");
const GlobalError = require("../utils/GlobalError");
const User = require("../models/User");

const createBid = async (req, res, next) => {
    const { offerId, pricePerUnit } = req.body;

    try {
        if (!offerId || !pricePerUnit) {
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

        const callFun = contract.methods.placeBid(offerId);
        const gas = await callFun.estimateGas({ 
            from: walletId
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
            value: pricePerUnit,
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
        });
    }
    catch (error) {
        // Handle potential revert errors from the blockchain
        if (error.message.includes('revert')) {
            return next(new GlobalError("Bid failed. Possible reasons: auction ended, bid too low, or seller attempting to bid.", 400));
        }
        console.error("Error creating energy bid:", error);
        next(error);
    }
};

const listBids = async (req, res, next) => {
    try {
        const contract = getContractInstance();
        const { offerId } = req.params;

        const bids = await contract.methods.getBidsByOffer(offerId).call();
        res.status(200).json({
            success: true,
            message: "Bids retrieved successfully",
            bids,
        });
    } catch (error) {
        console.error("Error listing bids:", error);
        next(error);
    }
};

module.exports = {
    createBid,
    listBids,
};
