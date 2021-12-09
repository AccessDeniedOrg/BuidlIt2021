const express = require("express");
const { getTransactions } = require("../controllers/transactions");

const router = express.Router();

router.post("/getTransactions", getTransactions);

module.exports = {
    route: router,
};
