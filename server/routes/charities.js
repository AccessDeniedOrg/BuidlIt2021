const express = require("express");
const {
	getAllCharities,
	pendingCharity,
	addPendingCharity,
	updateCharity,
	deleteCharity,
	getTotalFundRaised,
} = require("../controllers/charities");

const router = express.Router();

//Get All charities
router.get("/all-charities", getAllCharities);
router.post("/pendingCharity", pendingCharity);

router.post("/addPendingCharity", addPendingCharity);

router.post("/updateCharity", updateCharity);

router.post("/deleteCharity", deleteCharity);

router.get("/getTotalFundRaised", getTotalFundRaised);

module.exports = {
	route: router,
};
