const { getContractInstance, web3 } = require("../utils/contractUtil");
const GlobalError = require("../utils/GlobalError");

// Create Energy Offer
const createOffer = async (req, res) => {
  const { amount, pricePerUnit, expiry } = req.body;

  if (!amount || !pricePerUnit || !expiry) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const contract = getContractInstance(); // Use the utility function
    const accounts = await web3.eth.getAccounts(); // Fetch available accounts
    const seller = accounts[0];

    const receipt = await contract.methods
      .createOffer(amount, pricePerUnit, expiry) // Replace with your contract's method
      .send({ from: seller });

    res.status(201).json({
      success: true,
      message: "Energy offer created successfully",
      offerId: receipt.events.OfferCreated.returnValues.offerId,
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    console.error("Error creating energy offer:", error);
    res.status(500).json({
      success: false,
      message: "Error creating energy offer",
      error: error.message,
    });
  }
};

module.exports = { createOffer };
