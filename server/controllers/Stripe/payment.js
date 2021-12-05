const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create a PaymentIntent:
const paymentIntent = async (req, res) => {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 10000,
		currency: "usd",
		payment_method_types: ["card"],
		transfer_group: "GranteStudio-Segregation",
	});

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
		success_url: "https://www.google.com",
		cancel_url: "https://in.search.yahoo.com/?fr2=inr",
	});

	res.send(session.url);
};

module.exports = {
	paymentIntent,
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
