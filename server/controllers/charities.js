const Charities = require("../models/charities");
const PendingCharities = require("../models/pendingCharities");
const { sendMail } = require("./sendEmail");

// Get Accepted charaties
const getAllCharities = async (req, res) => {
	Charities.find((err, docs) => {
		if (err) {
			res.send({ msg: "fail" });
		} else {
			res.send({ status: "success", data: docs });
		}
	});
};

// Get Pending charaties
const getPendingCharities = async (req, res) => {
	PendingCharities.find((err, docs) => {
		if (err) {
			res.send("Error in retrieving docs ");
		} else {
			res.send({ status: "success", data: docs });
		}
	});
};

// Add charity
const pendingCharity = async (req, res) => {
	const { logo, description, name, email, target, title, end_date, proofLink } =
		req.body;

	var newCharity = new PendingCharities({
		logo: logo,
		description: description,
		name: name,
		email: email,
		target: target,
		title: title,
		num_of_donors: 0,
		target_collected: 0,
		end_date: end_date,
		proofLink: proofLink,
	});

	newCharity.save(function (err, Charity) {
		if (err) {
			res.send({
				status: "error",
				msg: "There was an error in adding the Charity",
			});
		} else {
			console.log({
				status: "success",
			});
		}
	});

	const emailBody = `
				<div >
					<p style="font-weight: bold;" >Hello Admin,</p>
					<p>You have a new charity request from ${name}</p>
					<p>visit <a href="${process.env.FRONTEND_API}/admin/addCharity">${process.env.FRONTEND_API}/admin/addCharity</a> to accept or decline</p>
					
				</div>
				`;

	await sendMail(
		"accessdeniedbuidl@gmail.com",
		"GrantéStudio",
		emailBody,
		"New Charity Request"
	);
	res.send({
		status: "success",
		msg: "Charity Added Successfully ",
	});
};

// Add charity to db
const addPendingCharity = async (req, res) => {
	const { logo, description, name, email, target, title, end_date, _id } = req.body;

	var newCharity = new Charities({
		logo: logo,
		description: description,
		name: name,
		email: email,
		target: target,
		title: title,
		target_collected: 0,
		num_of_donors: 0,
		end_date: end_date,
	});

	newCharity.save(function (err, Charity) {
		if (err) {
			res.send({
				status: "error",
				msg: "There was an error in adding the Charity",
			});
		} else {
			console.log({
				status: "success",
				msg: "Charity Added Successfully ",
			});
		}
	});

	PendingCharities.deleteOne({ _id: _id }, async function (err, data) {
		if (err) res.send("Could not be deleted");
		else console.log("successfully deleted");
	});

	const emailBody = `
						<div >
							<p>Hello ${name},</p>
							<p>Congratualtions✨ your charity had been verified by our team and you are eligible to be listed on GrantéStudio.<br/>
							Please reply to this email with an affirmative, after which you will be sent an onboarding link that will expire in 2-3 mins. </p>		
							<br/>
							<p>Regards, <br/>GrantéStudio</p>		
						</div>
						`;

	await sendMail(
		email,
		"GrantéStudio",
		emailBody,
		"Charity Listing Request"
	);
	res.send({
		status: "success",
		msg: "Charity Added Successfully ",
	});
};

// declinePendingCharity
const declinePendingCharity = async (req, res) => {
	const { email, name, _id } = req.body;
	PendingCharities.deleteOne({ _id: _id }, async function (err, data) {
		if (err) res.send("Could not be deleted");
		else console.log("successfully deleted");
	});
	const emailBody = `
	<div">
		<p>Hello ${name},</p>
		<p>We are sorry to inform you that your campaign is not eligible to be listed on GrantéStudio. For further details kindly check our Terms & Conditions for listing charities</p>
		<br/>
		<p>Regards, <br/>GrantéStudio</p>		
	</div>
	`;

	await sendMail(email, "GrantéStudio", emailBody, "Charity Listing Request");
	res.send({
		status: "success",
		msg: "Charity Added Successfully ",
	});
};

// Edit Product Info
const updateCharity = async (req, res) => {
	const { name, email, description, target, title, end_date } = req.body;

	Charities.findOneAndUpdate(
		{ email: email },
		{
			$set: {
				logo: logo,
				description: description,
				name: name,
				target: target,
				title: title,
				end_date: end_date,
			},
		},
		(error, doc) => {
			if (error) {
				res.send({
					status: "error",
					msg: "There was an error editing the product information",
				});
			} else {
				res.send({
					status: "success",
					msg: "Product Info Updated Successfully ",
				});
			}
		}
	);
};

// Delete charity from database
const deleteCharity = async (req, res) => {
	const { _id } = req.body;

	Charities.findOneAndUpdate(
		{
			_id: _id,
		},
		{
			$set: {
				end_date: 0,
			},
		},
		(err, docs) => {
			if (err === null) {
				res.send({
					status: "success",
					msg: "Charity successfully deleted from database",
				});
			} else {
				res.send({ status: "error", msg: "Charity could not be deleted" });
			}
		}
	);
};

// Get fund raised
const getTotalFundRaised = async (req, res) => {
	Charities.find((err, docs) => {
		if (err) {
			res.send("Error");
		} else {
			let total = 0;
			docs.map((target) => {
				total = total + target.target_collected;
			});
			res.send({ total: total });
		}
	});
};

module.exports = {
	getAllCharities,
	getPendingCharities,
	pendingCharity,
	addPendingCharity,
	declinePendingCharity,
	updateCharity,
	deleteCharity,
	getTotalFundRaised,
};
