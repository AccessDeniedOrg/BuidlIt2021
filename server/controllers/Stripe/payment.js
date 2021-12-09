const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const UploadArt = require("../../models/uploadArt");
const Charities = require("../../models/charities");
const donationTransaction = require("../../models/transactions");
const UserNft = require("../../models/userNft");
const { transferNFT } = require("../polygon");
const User = require("../../models/user");

// Create a PaymentIntent:
const checkoutSession = async (req, res) => {
	const {
		totalAmt,
		charityAmt,
		NFTPrice,
		walletAddressUser,
		IPFShash,
		charityEmail,
		charityName,
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

	if (NFTPrice === 0) {
		var newTransaction = new donationTransaction({
			transactionId: transactionID,
			totalAmt: totalAmt,
			charityAmt: charityAmt,
			charityName: charityName,
			walletAddressUser: walletAddressUser, //using email
			walletAddressArtist: "", //using IpfsHash
			NFTPrice: 0,
			IPFShash: IPFShash,
			charityEmail: charityEmail,
			type: type,
			completed: "false",
			timestamp: Date.now(),
		});

		newTransaction.save(function (err, Transaction) {
			if (err) res.send({ msg: "Failure", err });
			else console.log(Transaction);
		});
	} else {
		// Saving transaction to DB
		UploadArt.findOne({ IPFShash: IPFShash }, async function (err, data) {
			// console.log("artist", data);
			Artist.findOne({ email: data.email }, async function (err, artist) {
				var newTransaction = new donationTransaction({
					transactionId: transactionID,
					totalAmt: totalAmt,
					charityAmt: charityAmt,
					charityName: charityName,
					walletAddressUser: walletAddressUser, //using email
					walletAddressArtist: artist.walletAddress, //using IpfsHash
					NFTPrice: NFTPrice,
					IPFShash: IPFShash,
					charityEmail: charityEmail,
					type: type,
					completed: "false",
					timestamp: Date.now(),
				});

				newTransaction.save(function (err, Transaction) {
					if (err) res.send({ msg: "Failure", err });
					else console.log(Transaction);
				});
			});
		});
	}

	// Payment Intent
	const paymentIntent = await stripe.paymentIntents.create({
		amount: totalAmt * 100,
		currency: "usd",
		payment_method_types: ["card"],
		transfer_group: `Segregation - ${transactionID}`,
	});

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
		payment_intent_data: {
			transfer_group: paymentIntent.transfer_group,
		},
		mode: "payment",
		success_url: `${process.env.FRONTEND_API}/success/${encrypedTransactionId}`,
		cancel_url: `${process.env.FRONTEND_API}//checkout-error`,
	});

	res.send(session.url);
};

// Get created transaction
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
		if (NFTPrice === 0) {
			Charities.findOne({ email: charityEmail }, async function (err, data) {
				const transfer = await stripe.transfers.create({
					amount: charityAmt * 100,
					currency: "usd",
					destination: data.accountId,
					transfer_group: `Segregation - ${transactionId}`,
				});
				console.log("Charity: ", transfer);
			});

			donationTransaction.findOneAndUpdate(
				{ transactionId: transactionId },
				{ $set: { completed: "true" } },
				async function (err, data) {
					console.log(data.completed);
					if (err) res.send({ msg: "Failure", err });
					else console.log("successfully updated");
				}
			);
		} else {
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
		}
		Charities.findOne({ email: charityEmail }, async function (err, data) {
			const new_num_of_donors = data.num_of_donors + 1;
			const updated_target_collected = data.target_collected + charityAmt;
			Charities.findOneAndUpdate(
				{ email: charityEmail },
				{
					$set: {
						num_of_donors: new_num_of_donors,
						target_collected: updated_target_collected,
					},
				},
				async function (err, data) {
					console.log(data.completed);
					if (err) res.send({ msg: "Failure", err });
					else console.log(" Charity amount successfully updated");
				}
			);
		});
	} catch (err) {
		console.log("Transfer Error:", err);
		msg = "Failure";
	}
	res.send({ msg });
};

const tranferNFtOwnership = async (req, res) => {
	const { userWalletAddress, IPFShash, transactionId } = req.body;
	try {
		UploadArt.findOne({ IPFShash: IPFShash }, async function (err, data) {
			User.findOne(
				{ walletAddress: userWalletAddress },
				async function (err, userData) {
					donationTransaction.findOne(
						{ transactionId: transactionId },
						async function (err, transactionData) {
							await transferNFT(
								transactionData.walletAddressArtist,
								userWalletAddress,
								data.tokenId
							);
						}
					);

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
				if (err) console.log("Could not be deleted");
				else console.log("successfully deleted");
			});

			donationTransaction.findOneAndUpdate(
				{ transactionId: transactionId },
				{ $set: { completed: "true" } },
				async function (err, data) {
					console.log(data.completed);
					if (err) res.send({ msg: "Failure", err });
					else console.log("successfully updated");
				}
			);
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
