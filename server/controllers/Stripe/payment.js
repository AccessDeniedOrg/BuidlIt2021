const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create a PaymentIntent:
const paymentIntent = async (req, res) => {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 10000,
		currency: "usd",
		payment_method_types: ["card"],
		transfer_group: "GranteStudio-Segregation",
	});

	// Create a Transfer to the connected account (later):
	const transfer = await stripe.transfers.create({
		amount: 7000,
		currency: "usd",
		destination: "acct_1K33EEJtDCOP3WSw",
		transfer_group: "GranteStudio-Segregation",
	});

	res.send(transfer);
};

// Create a second Transfer to another connected account (later):
// const secondTransfer = await stripe.transfers.create({
// 	amount: 2000,
// 	currency: "usd",
// 	destination: "{{OTHER_CONNECTED_STRIPE_ACCOUNT_ID}}",
// 	transfer_group: "GranteStudio-Segregation",
// });

module.exports = {
	paymentIntent,
};
