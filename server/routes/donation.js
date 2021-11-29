const express = require("express");
const {
    getDonations,
    createOrder,
    storeTransaction,
    getOrder
} = require("../controllers/donation");

const router = express.Router();

//Create order on donation
router.post("/create-order", createOrder);

//Store successful transactions in database
router.post("/store-transaction", storeTransaction);

//Get user donation transactions
router.post("/get-donations", getDonations);

//Get order by id
router.post("/get-order", getOrder);

module.exports = {
    route: router,
};