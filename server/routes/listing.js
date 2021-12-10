const express = require("express");
const {
	createListing,
	getLatestList,
	getTotalReserves,
} = require("../controllers/listing");

const router = express.Router();

router.get("/createListing", createListing);

router.get("/getLatestList", getLatestList);

router.get("/getTotalReserves", getTotalReserves);

module.exports = {
	route: router,
};
