const { getContractInstance, web3 } = require("../utils/contractUtil");
const GlobalError = require("../utils/GlobalError");

// Create Energy Offer
const createOffer = async (req, res, next) => {
  const { amount, pricePerUnit, expiry } = req.body;

  try {
    // Validation
    if (!amount || !pricePerUnit || !expiry) {
      throw new GlobalError("Missing required fields", 400);
    }

    const contract = getContractInstance();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const seller = accounts[0];


    const receipt = await contract.functions
      .offerEnergy(+amount, +pricePerUnit, +expiry)
      .send({ from: seller });

    res.status(201).json({
      success: true,
      message: "Energy offer created successfully",
      offerId: receipt.events.OfferCreated.returnValues.offerId,
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOffer };
