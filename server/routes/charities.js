const express = require("express");
const {
    getAllCharities,
    updateAfterNFTTransfer,
} = require("../controllers/charities");

const router = express.Router();

//Get All products For sender and receiver
router.get("/all-charities", getAllCharities);

//Update Product
router.post("/update-charity", updateAfterNFTTransfer);

module.exports = {
    route: router,
};