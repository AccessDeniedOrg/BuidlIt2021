const express = require("express");

const {
	getAllArt,
	addArt,
	getArtToEdit,
	editArtPrice,
} = require("../controllers/uploadArt");

const { getNft, getFilteredNFTs } = require("../controllers/getNfts");

const router = express.Router();

// Get All Art
router.get("/getAllArt", getAllArt);

// Add Art
router.post("/addArt", addArt);

// Get Art
router.post("/getArtToEdit", getArtToEdit);

// Edit Art Price
router.post("/editArtPrice", editArtPrice);

// get Nfts
router.post("/getNfts", getNft);

// filtered Nfts
router.post("/getFilteredNFTs", getFilteredNFTs);

module.exports = {
	route: router,
}
