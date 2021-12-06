const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const UploadArt = require("../../models/uploadArt");
const Charities = require("../../models/charities");
const donationTransaction = require("../../models/transactions");
const UserNft = require("../../models/userNft");
const User = require("../../models/user");

// Create a PaymentIntent:
const checkoutSession = async (req, res) => {
	let paymentIntentObject;
	const {
		totalAmt,
		charityAmt,
		NFTPrice,
		walletAddressUser,
		IPFShash,
		charityEmail,
		type,
	} = req.body;

	const transactionID = uuidv4();
	// Encrypting Transaction ID
	const encrypedTransactionId = encodeURIComponent(
		CryptoJS.AES.encrypt(
			JSON.stringify({ transactionID }),
			process.env.ENCRYPTION_SECRET
		)
	);

	UploadArt.findOne({ IPFShash: IPFShash }, async function (err, data) {
		// console.log("artist", data);
		Artist.findOne({ email: data.email }, async function (err, artist) {
			var newTransaction = new donationTransaction({
				transactionId: transactionID,
				totalAmt: totalAmt,
				charityAmt: charityAmt,
				walletAddressUser: walletAddressUser, //using email
				walletAddressArtist: artist.walletAddress, //using IpfsHash
				NFTPrice: NFTPrice,
				IPFShash: IPFShash,
				charityEmail: charityEmail,
				type: type,
				timestamp: Date.now(),
			});

			newTransaction.save(function (err, Transaction) {
				if (err) console.log(err);
				else console.log(Transaction);
			});
		});
	});

	if (NFTPrice === 0) {
		//DirectTransfer
		Charities.findOne({ email: charityEmail }, async function (err, data) {
			const paymentIntent = await stripe.paymentIntents.create({
				payment_method_types: ["card"],
				amount: totalAmt * 100,
				currency: "usd",
				transfer_data: {
					destination: data.accountId,
				},
			});
			paymentIntentObject = {
				application_fee_amount: totalAmt * 10,
				transfer_data: paymentIntent.transfer_data,
			};
		});

		// res.send(paymentIntent);
	} else {
		// Payment Intent
		const paymentIntent = await stripe.paymentIntents.create({
			amount: totalAmt * 100,
			currency: "usd",
			payment_method_types: ["card"],
			transfer_group: "GranteStudio-Segregation",
		});
		paymentIntentObject = {
			transfer_group: paymentIntent.transfer_group,
		};
		//res.send(paymentIntent);
	}

	//Checkout Session
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				name: "GranteStudio-Charity",
				amount: totalAmt * 100,
				currency: "usd",
				quantity: 1,
			},
		],
		payment_intent_data: paymentIntentObject,
		mode: "payment",
		success_url: `https://www.google.com/${encrypedTransactionId}`,
		cancel_url: "https://in.search.yahoo.com/?fr2=inr",
	});

	res.send(session.url);
};

const getTransaction = async (req, res) => {
	const { transactionId } = req.body;
	donationTransaction.findOne(
		{ transactionId: transactionId },
		async function (err, data) {
			res.send(data);
		}
	);
};

// Transfers
const dualTransfer = async (req, res) => {
	const {
		charityAmt,
		NFTPrice,
		walletAddressArtist,
		charityEmail,
		transactionId,
	} = req.body;
	let msg = "";

	//Create a Transfer to the connected account (later):
	try {
		Charities.findOne({ email: charityEmail }, async function (err, data) {
			const transfer = await stripe.transfers.create({
				amount: charityAmt * 100,
				currency: "usd",
				destination: data.accountId,
				transfer_group: `Segregation - ${transactionId}`,
			});
			console.log("Charity: ", transfer);
		});

		Artist.findOne(
			{ walletId: walletAddressArtist },
			async function (err, data) {
				const transfer = await stripe.transfers.create({
					amount: NFTPrice * 100,
					currency: "usd",
					destination: data.accountId,
					transfer_group: `Segregation - ${transactionId}`,
				});
				console.log("Artist: ", transfer);
			}
		);
		msg = "Success";
	} catch (err) {
		console.log("Transfer Error:", err);
		msg = "Failure";
	}
	res.send({ msg });
};

const tranferNFtOwnership = async (req, res) => {
	const { userWalletAddress, IPFShash } = req.body;
	try {
		UploadArt.findOne({ IPFShash: IPFShash }, async function (err, data) {
			// console.log("data:", data);
			User.findOne(
				{ walletAddress: userWalletAddress },
				async function (err, userData) {
					// console.log(userData);
					newNFTOwner = new UserNft({
						artName: data.artName,
						artistName: data.artistName,
						email: userData.email,
						IPFShash: data.IPFShash,
						tokenId: data.tokenId,
					});

					newNFTOwner.save(function (err, Transaction) {
						if (err) res.send({ msg: "Failure", err });
						else console.log(Transaction);
					});
				}
			);
			//Delete from artNFTCollection
			UploadArt.deleteOne({ IPFShash: IPFShash }, async function (err, data) {
				if (err) res.send("Could not be deleted");
				else console.log("successfully deleted");
			});
		});

		res.send({ msg: "Success" });
	} catch (err) {
		res.send({ msg: "Failure", err });
	}
};

module.exports = {
	checkoutSession,
	dualTransfer,
	getTransaction,
	tranferNFtOwnership,
};
