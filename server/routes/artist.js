const express = require("express");
const {
	sendOtp,
	registerArtist,
	loginArtist,
} = require("../controllers/artist");

const {
	getAllArt,
	addArt,
	getArtToEdit,
	editArtPrice,
} = require("../controllers/uploadArt");

const { getNft } = require("../controllers/getNfts");

const router = express.Router();

//send mail for verification
router.get("/registerArtist", (req, res) => {
	res.send("Register Artist");
});
router.post("/registerArtist", sendOtp);

//Registration on after verification
router.get("/registerVerifiedArtist", (req, res) => {
	res.send("Register-verified-artist");
});
router.post("/registerVerifiedArtist", registerArtist);

//Login
router.get("/loginArtist", (req, res) => {
	res.send("Login Page");
});
router.post("/loginArtist", loginArtist);

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

module.exports = {
	route: router,
};
