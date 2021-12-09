const express = require("express");
const {
	getAllCharities,
	getPendingCharities,
	pendingCharity,
	addPendingCharity,
	declinePendingCharity,
	updateCharity,
	deleteCharity,
	getTotalFundRaised,
} = require("../controllers/charities");

const router = express.Router();

//Get All charities
router.get("/all-charities", getAllCharities);

router.get("/getPendingCharities", getPendingCharities);

router.post("/pendingCharity", pendingCharity);

router.post("/addPendingCharity", addPendingCharity);

router.post("/declinePendingCharity", declinePendingCharity);

router.post("/updateCharity", updateCharity);

router.post("/deleteCharity", deleteCharity);

router.get("/getTotalFundRaised", getTotalFundRaised);

module.exports = {
	route: router,
};
