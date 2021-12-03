const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const accountCreation = async (req, res) => {
	const account = await stripe.accounts.create({ type: "standard" });
	console.log(account);
	return { account: account };
};

const onBoarding = async (req, res) => {
	const accountLink = await stripe.accountLinks.create({
		account: "acct_1K2c2YSEeu1mz3mY",
		refresh_url: `${process.env.FRONTEND_API}/onboardingerror`,
		return_url: `${process.env.FRONTEND_API}/artist`,
		type: "account_onboarding",
	});
	res.send(accountLink);
};

const chargesEnabled = async (req, res) => {
	const chargeEnabled = await stripe.accounts.retrieve("acct_1K2c2YSEeu1mz3mY");
	console.log(chargesEnabled);
	res.send(chargeEnabled.charges_enabled);
};

module.exports = {
	accountCreation,
	onBoarding,
	chargesEnabled,
};
