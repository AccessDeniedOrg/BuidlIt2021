const Donation = require("../models/donation");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require("razorpay");
const env = require("dotenv").config();

var instance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
	var options = {
		amount: req.body.amount,
		currency: "INR",
		receipt: uuidv4(),
	};
	instance.orders.create(options, function (err, order) {
		if (err) {
			console.log(err);
			res.send({
				msg: "Failed",
			});
		} else {
			res.send({
				msg: "Success",
				order: order,
			});
		}
	});
};

const getOrder = async (req, res) => {
	const response = await instance.orders.fetch(req.body.orderid);
	res.send({
		amount: (parseFloat(response.amount) / 100).toFixed(2),
	});
};

const storeTransaction = async (req, res) => {
	const order_id = req.body.order_id;
	const recepient = req.body.recepient;
	const email = req.body.email;
	const amount = req.body.amount;

	var ts = Math.round(Date.now() / 1000);

	var newTransaction = new Donation({
		order_id: order_id,
		recepient: recepient,
		email: email,
		amount: parseFloat(amount).toFixed(2),
		timestamp: ts,
	});

	newTransaction.save(function (err) {
		if (err) console.log(err);
		else console.log("Successfully registered");
	});

	res.send({
		msg: "Transaction stored",
		amount: parseFloat(amount).toFixed(2),
	});
};

const getDonations = async (req, res) => {
	const email = req.body.email;
	Donation.find({ email: email }, async function (error, doc) {
		if (error) {
			res.send({
				status: "Error",
				msg: error.response.data,
			});
		} else {
			res.send({
				status: "success",
				data: doc,
			});
		}
	});
};

module.exports = {
	createOrder,
	getDonations,
	storeTransaction,
	getOrder,
};
