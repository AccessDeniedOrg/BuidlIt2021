const express = require("express");

const {
	onBoarding,
	accountCreation,
	chargesEnabled,
} = require("../../controllers/Stripe/stripe");

const router = express.Router();

// Get All Art
router.post("/onBoarding", onBoarding);
router.post("/accountCreation", accountCreation);
router.post("/chargesEnabled", chargesEnabled);

module.exports = {
	route: router,
};
