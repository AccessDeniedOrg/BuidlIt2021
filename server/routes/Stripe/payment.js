const express = require("express");

const { paymentIntent } = require("../../controllers/Stripe/payment");

const router = express.Router();

router.post("/paymentIntent", paymentIntent);

module.exports = {
	route: router,
};
