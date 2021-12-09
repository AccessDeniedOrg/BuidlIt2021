const express = require("express");
const {
    decouple,
    decoupleArtistNFT
} = require("../controllers/Stripe/decouple");

const router = express.Router();

router.post("/decoupleNFT", decouple);

router.post("/decoupleArtistNFT", decoupleArtistNFT);


module.exports = {
    route: router,
};
