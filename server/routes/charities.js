const express = require("express");
const {
	getAllCharities,
	addCharity,
	updateCharity,
	deleteCharity,
	updateAfterNFTTransfer,
	getTotalFundRaised,
} = require("../controllers/charities");

const router = express.Router();

//Get All charities
router.get("/all-charities", getAllCharities);

//Update charity NFT
router.post("/update-charity", updateAfterNFTTransfer);

router.post("/addCharity", addCharity);

router.post("/updateCharity", updateCharity);

router.post("/deleteCharity", deleteCharity);

router.get("/getTotalFundRaised", getTotalFundRaised);

module.exports = {
	route: router,
};
