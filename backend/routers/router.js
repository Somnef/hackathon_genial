const express = require("express");
const offerController = require("../controllers/offerController");
const bidController = require("../controllers/bidController");
// const blockchainController = require("../controllers/blockchainController");
const authController = require("../controllers/authController");
const errorHandler = require("../middleware/errorHandler"); // Your custom error handler
const authMiddleware = require("../middleware/authMiddleware").verifyToken;

const router = express.Router();

// User routes
// router.get("/api/user/list", userController.list);
// router.post("/api/user/trade-history", userController.tradehistory);

// User auth routes

router.post("/api/user/auth/sign-up", authController.signUp);
router.post("/api/user/auth/login", authController.login);
router.get("/api/user/me", authMiddleware, authController.getMe);

// Offer routes

// contract.methods.offerEnergy
router.post("/api/offer/create", authMiddleware, offerController.createOffer);
router.get("/api/offer/list", authMiddleware, offerController.listOffer);
router.post("/api/offer/end", authMiddleware, offerController.endOffer);
router.get("/api/user/offers", authMiddleware, offerController.getOffersByUser);

// Auction bid routes
router.post("/api/auction/bid/create", authMiddleware, bidController.createBid);
router.get(
  "/api/auction/bid/list/:offerId",
  authMiddleware,
  bidController.listBids
);

// Blockchain routes
// router.post("/api/blockchain/transaction", blockchainController.transaction);
// router.get(
//   "/api/blockchain/transaction/:transactionHash",
//   blockchainController.getTransactionByHash
// );

// Global error handler middleware (after routes are defined)
router.use(errorHandler);

module.exports = router;
