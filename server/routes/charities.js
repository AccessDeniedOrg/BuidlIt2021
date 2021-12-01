const express = require("express");
const {
	getAllCharities,
	addCharity,
	updateCharity,
	deleteCharity,
	updateAfterNFTTransfer,
} = require("../controllers/charities");

const router = express.Router();

//Get All charities
router.get("/all-charities", getAllCharities);

//Update charity NFT
router.post("/update-charity", updateAfterNFTTransfer);

router.post("/addCharity", addCharity);

router.post("/updateCharity", updateCharity);

router.post("/deleteCharity", deleteCharity);

module.exports = {
	route: router,
};
