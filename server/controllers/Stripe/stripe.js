const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Artist = require("../../models/artist");

const accountCreation = async (req, res) => {
	const account = await stripe.accounts.create({ type: "standard" });
	console.log(account);
	return { account: account.id };
};

const onBoarding = async (req, res) => {
	const { email } = req.body;
	let accountId = ""

	Artist.findOne({ email: email }, async (err, data) => {
		if (!data) {
			res.send("Not registered")
		} else {
			accountId = data.accountId
		}
	})

	const accountLink = await stripe.accountLinks.create({
		account: "acct_1K2c2YSEeu1mz3mY",
		refresh_url: `${process.env.FRONTEND_API}/onboardingerror`,
		return_url: `${process.env.FRONTEND_API}/artist`,
		type: "account_onboarding",
	});
	res.redirect(accountLink);
};

const chargesEnabled = async (req, res) => {
	console.log(req.body)
	const { email } = req.body;
	console.log(email);
	let accountId = "";

	Artist.findOne({ email: email }, async function (err, data) {
		console.log(data);
		if (data) {
			res.send("Not registered")
		} else {
			accountId = data.accountId;
			console.log(accountId)
		}
	})
	// res.send(accountId);
	const chargeEnabled = await stripe.accounts.retrieve(accountId);
	console.log(chargesEnabled);
	res.send(chargeEnabled.charges_enabled);
};

module.exports = {
	accountCreation,
	onBoarding,
	chargesEnabled,
};
