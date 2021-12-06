const express = require("express");

const {
	checkoutSession,
	dualTransfer,
	getTransaction,
	tranferNFtOwnership,
} = require("../../controllers/Stripe/payment");

const router = express.Router();

router.post("/checkoutSession", checkoutSession);

router.post("/dualTransfer", dualTransfer);

router.post("/getTransaction", getTransaction);

router.post("/tranferNFtOwnership", tranferNFtOwnership);

module.exports = {
	route: router,
};
