const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CryptoJS = require("crypto-js");
const { uuidv4 } = require("uuidv4");
const UploadArt = require("../../models/uploadArt");
const Transactions = require("../../models/transactions");

// Create a PaymentIntent:
const checkoutSession = async (req, res) => {
	const { totalAmt, charityAmt, NFTPrice, userEmail, IPFShash, charityName, type } = req.body;
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 10000,
		currency: "usd",
		payment_method_types: ["card"],
		transfer_group: "GranteStudio-Segregation",
	});

	const transactionID = uuidv4();
	// Encrypting Transaction ID
	const encrypedTransactionId = encodeURIComponent(
		CryptoJS.AES.encrypt(
			JSON.stringify({ transactionID }),
			process.env.ENCRYPTION_SECRET
		)
	);

	const artist = UploadArt.findOne({ IPFShash: IPFShash });
	console.log(artist);

	// save transaction in DB
	var newTransaction = new User({
		transactionId: transactionID,
		totalAmt: totalAmt,
		charityAmt: charityAmt,
		walletAddressUser: walletAddressUser, //using email 
		walletAddressArtist: "", //using IpfsHash
		NFTPrice: NFTPrice,
		IPFShash: IPFShash,
		charityName: charityName,
		type: type,
		timestamp: Date.now
	});

	newTransaction.save(function (err, Transaction) {
		// if (err) res.send(err);

	})

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				name: "GranteStudio-Charity",
				amount: 1000,
				currency: "usd",
				quantity: 1,
			},
		],
		payment_intent_data: {
			transfer_group: paymentIntent.transfer_group,
		},
		mode: "payment",
		success_url: `https://www.google.com/${encrypedTransactionId}`,
		cancel_url: "https://in.search.yahoo.com/?fr2=inr",
	});

	res.send(session.url);
};

module.exports = {
	checkoutSession,
};

// Create a Transfer to the connected account (later):
// const transfer = await stripe.transfers.create({
// 	amount: 7000,
// 	currency: "usd",
// 	destination: "acct_1K3KDu4E779q6Shr",
// 	transfer_group: "GranteStudio-Segregation",
// });

// Create a second Transfer to another connected account (later):
// const secondTransfer = await stripe.transfers.create({
// 	amount: 2000,
// 	currency: "usd",
// 	destination: "{{OTHER_CONNECTED_STRIPE_ACCOUNT_ID}}",
// 	transfer_group: "GranteStudio-Segregation",
// });
