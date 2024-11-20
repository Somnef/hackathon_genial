const express = require('express');
const router = express.Router();

// User routes
const userController = require('./controllers/userController');
router.get('/api/user/list', userController.list);
router.post('/api/user/tradehistory', userController.tradehistory);

// User auth routes
const authController = require('./controllers/authController');
router.post('/api/user/auth/sign-up', authController.signUp);
router.post('/api/user/auth/login', authController.login);

// Auction routes
const auctionController = require('./controllers/auctionController');
router.post('/api/offer/create', offerController.create);
router.get('/api/offer/list', offerController.list);

// Auction bid routes
const bidController = require('./controllers/bidController');
router.post('/api/auction/bid/create', bidController.create);
router.get('/api/auction/bid/list', bidController.list);

// Blockchain routes
const blockchainController = require('./controllers/blockchainController');
router.post('/api/blockchain/transaction', blockchainController.transaction);
router.get('/api/blockchain/transaction/:transactionHash', blockchainController.getTransactionByHash);

module.exports = router;
