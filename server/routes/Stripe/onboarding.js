const express = require("express");

const {
	onBoarding,
	accountCreation,
	chargesEnabled,
} = require("../../controllers/Stripe/onboarding");

const router = express.Router();

router.post("/onBoarding", onBoarding);

//router.post("/accountCreation", accountCreation);
router.post("/chargesEnabled", chargesEnabled);

module.exports = {
	route: router,
};
