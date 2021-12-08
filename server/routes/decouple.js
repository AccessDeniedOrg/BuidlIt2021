const express = require("express");
const {
    decouple
} = require("../controllers/Stripe/decouple");

const router = express.Router();

//Registration on after verification
router.post("/decoupleNFT", decouple);


module.exports = {
    route: router,
};
