const mongoose = require("mongoose");
const Charities = require("../models/charities");

// Get All charaties
const getAllCharities = async (req, res) => {
	Charities.find((err, docs) => {
		if (err) {
			res.send("Error in retrieving docs ");
		} else {
			res.send({ status: "success", data: docs });
		}
	});
};

// Add charity to db
const addCharity = async (req, res) => {
	const {
		logo,
		description,
		name,
		num_of_donors,
		target,
		target_collected,
		title,
	} = req.body;

	var newCharity = new Charities({
		logo: logo,
		description: description,
		name: name,
		num_of_donors: num_of_donors,
		target: target,
		target_collected: target_collected,
		title: title,
	});

	newCharity.save(function (err, Charity) {
		if (err) {
			res.send({
				status: "error",
				msg: "There was an error in adding the Charity",
			});
		} else {
			res.send({
				status: "success",
				msg: "Charity Added Successfully ",
			});
		}
	});
};

// Edit Product Info
const updateCharity = async (req, res) => {
	const {
		logo,
		description,
		name,
		num_of_donors,
		target,
		target_collected,
		title,
	} = req.body;

	Charities.findOneAndUpdate(
		{ _id: id },
		{
			$set: {
				logo: logo,
				description: description,
				name: name,
				num_of_donors: num_of_donors,
				target: target,
				target_collected: target_collected,
				title: title,
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

// Delete Product from database
const deleteCharity = async (req, res) => {
	const id = req.body._id;
	Charities.deleteOne(
		{
			_id: id,
		},
		(err, docs) => {
			if (err === null) {
				res.send({
					status: "success",
					msg: "Product successfully deleted from database",
				});
			} else {
				res.send({ status: "error", msg: "Product could not be deleted" });
			}
		}
	);
};

// Update donor count and target
const updateAfterNFTTransfer = async (req, res) => {
	var c_id = mongoose.Types.ObjectId(req.body.id);
	var updated_count = 0;
	var updated_target_collected = 0;

	Charities.findOne({ _id: c_id }, async function (err, data) {
		if (err) console.log("From update error", err);
		else {
			if (data) {
				updated_count = parseFloat(data.num_of_donors) + 1;
				updated_target_collected =
					parseFloat(data.target_collected) + parseFloat(req.body.funds);
				// update record
				Charities.findOneAndUpdate(
					{ _id: c_id },
					{
						$set: {
							num_of_donors: updated_count,
							target_collected: updated_target_collected,
						},
					},
					(error, doc) => {
						if (error) {
							res.send({
								status: "Error",
								msg: "There was an error updating the count",
							});
						} else {
							res.send({ status: "success", data: doc });
						}
					}
				);
			} else {
				res.send({
					status: "Error",
					msg: "Charity does not exist",
				});
			}
		}
	});
};

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
	addCharity,
	updateCharity,
	deleteCharity,
	updateAfterNFTTransfer,
	getTotalFundRaised,
};
