const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Artist = require("../../models/artist");

const accountCreation = async (email) => {
	const account = await stripe.accounts.create({
		type: 'custom',
		country: 'US',
		email: email,
		capabilities: {
			card_payments: { requested: true },
			transfers: { requested: true },
		},
	});
	console.log(account);
	return { account: account.id };
};

const onBoarding = async (req, res) => {
	const { email } = req.body;

	Artist.findOne({ email: email }, async (err, data) => {
		if (!data) {
			res.send("Not registered")
		} else {
			// console.log(data);
			const accountLink = await stripe.accountLinks.create({
				account: data.accountId,
				refresh_url: `${process.env.FRONTEND_API}/onboardingerror`,
				return_url: `${process.env.FRONTEND_API}/artist/minting`,
				type: "account_onboarding",
			});
			res.send(accountLink.url);
		}
	})


};

const chargesEnabled = async (req, res) => {
	console.log(req.body)
	const { email } = req.body;
	console.log(email);
	let accountId = "";

	Artist.findOne({ email: email }, async function (err, data) {
		console.log(data);
		if (!data) {
			res.send("Not registered")
		} else {
			const chargeEnabled = await stripe.accounts.retrieve(data.accountId);
			console.log(chargesEnabled);
			res.send(chargeEnabled.charges_enabled);
		}
	})

};

module.exports = {
	accountCreation,
	onBoarding,
	chargesEnabled,
};
