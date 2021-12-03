const User = require("../models/user");
const Artist = require("../models/artist");
const crypto = require("crypto");
const { sendMail } = require("./sendEmail");
const { accountCreation } = require("../controllers/Stripe/stripe");

// Register User
const sendOtp = async (req, res) => {
	const { email, name, password, role } = req.body;

	if (role === "user") {
		User.findOne({ email: email }, async function (err, data) {
			if (!data) {
				//generate otp
				const { fullHash, expires, otp } = await generateOPT(
					email,
					name,
					password,
					role
				);
				res.status(200).send({
					msg: "OTP sent",
					expires,
					hash: fullHash,
					name,
					email,
					password,
					otp,
					role,
				});
			} else {
				res.send({ msg: "User already exists. Try a different email." });
			}
		});
	} else if (role === "artist") {
		Artist.findOne({ email: email }, async function (err, data) {
			if (!data) {
				//generate otp
				const { fullHash, expires, otp } = await generateOPT(
					email,
					name,
					password,
					role
				);

				res.status(200).send({
					msg: "OTP sent",
					expires,
					hash: fullHash,
					name,
					email,
					password,
					otp,
					role,
				});
			} else {
				res.send({ msg: "User already exists. Try a different email." });
			}
		});
	} else {
		res.send("Invalid Role");
	}
};

// verify and register
const register = async (req, res) => {
	const { name, email, password, hash, otp, role } = req.body;

	let [hashValue, expires] = hash.split(".");

	let now = Date.now();

	if (now > parseInt(expires)) {
		return res.send({ msg: "OTP Timeout" });
	}

	const data = `${email}.${name}.${password}.${role}.${otp}.${expires}`;
	const newCalculatedHash = crypto
		.createHmac("sha256", process.env.EMAIL_SECRET_KEY)
		.update(data)
		.digest("hex");

	if (newCalculatedHash === hashValue) {
		if (role === "user") {
			var newPerson = new User({
				email: email,
				name: name,
				password: password,
			});

			newPerson.save(function (err, Person) {
				if (err) res.send(err);
				else res.status(200).send({ msg: "Verified Success" });
			});
		} else if (role === "artist") {
			const accountId = await accountCreation();
			console.log(accountId);
			var newArtist = new Artist({
				email: email,
				name: name,
				password: password,
				accountId: accountId,
			});

			newArtist.save(function (err, Person) {
				if (err) console.log(err);
				else res.status(200).send({ msg: "Verified Success" });
			});
		}
	} else {
		res.send({ msg: "Invalid OTP" });
	}
};

// Login
const login = async (req, res) => {
	const { email, password, role } = req.body;

	if (role === "user") {
		User.findOne(
			{ email: email, password: password },
			async function (err, data) {
				if (data) {
					res.status(200).send({
						msg: "Logged In",
						name: data.name,
						email: email,
						role: role,
					});
				} else {
					res.send({ msg: "Email or Password is incorrect" });
				}
			}
		);
	} else if (role === "artist") {
		Artist.findOne(
			{ email: email, password: password },
			async function (err, data) {
				if (data) {
					res.status(200).send({
						msg: "Logged In",
						name: data.name,
						email: email,
						role: role,
					});
				} else {
					res.send({ msg: "Invalid Email" });
				}
			}
		);
	} else {
		res.send("Invalid Role");
	}
};

// Email Queries
const emailQueries = async (req, res) => {
	const { email, queryBody } = req.body;
	const emailBody = `
	<p>Query from:  ${email}</p>
	<p>Body: ${queryBody}</p>
	`;

	await sendMail(
		"sanchi.shirur4@gmail.com",
		"GrantéStudio-Query",
		emailBody,
		`Query from ${email}`
	);

	res.send("success");
};

const generateOPT = async (email, name, password, role) => {
	const otp = Math.floor(100000 + Math.random() * 900000);
	console.log(otp);
	const ttl = 5 * 60 * 1000;
	const expires = Date.now() + ttl;
	const data = `${email}.${name}.${password}.${role}.${otp}.${expires}`;
	const hash = crypto
		.createHmac("sha256", process.env.EMAIL_SECRET_KEY)
		.update(data)
		.digest("hex");
	const fullHash = `${hash}.${expires}`;
	const emailBody = `
				<div style="padding:10px;  color: black ;font-size:16px; line-height: normal;">
					<p style="font-weight: bold;" >Hello ${name},</p>
					<p>Your OTP to verify email is ${otp}</p>
					<p>If you have not registered on the website, kindly ignore the email</p>
					<br/>
					<p>Have a Nice Day!</p>
				</div>
				`;
	await sendMail(
		email,
		"GrantéStudio",
		emailBody,
		"GrantéStudio-Email Verification"
	);

	return { fullHash: fullHash, expires: expires, otp: otp };
};

module.exports = {
	sendOtp,
	register,
	login,
	emailQueries,
};
