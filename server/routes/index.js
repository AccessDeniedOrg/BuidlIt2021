const express = require("express");
const {
	sendOtp,
	register,
	login,
	emailQueries,
} = require("../controllers/index");

const router = express.Router();

//send mail for verification
router.post("/register", sendOtp);

//Registration on after verification
router.post("/register-verified", register);

//Login
router.get("/login", (req, res) => {
	res.send("Login Page");
});
router.post("/login", login);

// Queries
router.post("/queries", emailQueries);

module.exports = {
	route: router,
};
