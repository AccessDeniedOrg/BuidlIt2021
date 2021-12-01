const UploadArt = require("../models/uploadArt");

// Get All Arts
const getAllArt = async (req, res) => {
	UploadArt.find((err, docs) => {
		if (err) {
			res.send("Error in retrieving docs ");
		} else {
			res.send({ status: "success", data: docs });
		}
	});
};

// Add Art to db
const addArt = async (req, res) => {
	const { artName, email, price } = req.body;
	var newArt = new UploadArt({
		artName: artName,
		email: email,
		price: price,
	});

	newArt.save(function (err, Art) {
		if (err) {
			res.send({
				status: "error",
				msg: "There was an error in adding the Art",
			});
		} else {
			res.send({
				status: "success",
				msg: "Art Added Successfully ",
			});
		}
	});
};

const getArtToEdit = async (req, res) => {
	const id = req.params.id;
	UploadArt.findOne(
		{
			_id: id,
		},
		(err, docs) => {
			if (err === null) {
				res.send({
					status: "success",
					data: docs,
				});
			} else {
				res.send({ status: "error", msg: "Art could not be found" });
			}
		}
	);
};

// Edit Art Info
const editArtPrice = async (req, res) => {
	const data = req.body;
	const id = data._id;
	const price = data.price;

	UploadArt.findOneAndUpdate(
		{ _id: id },
		{
			$set: {
				price: price,
			},
		},
		(error, doc) => {
			if (error) {
				res.send({
					status: "error",
					msg: "There was an error editing the Art information",
				});
			} else {
				res.send({
					status: "success",
					msg: "Art Info Updated Successfully ",
				});
			}
		}
	);
};

module.exports = {
	getAllArt,
	addArt,
	getArtToEdit,
	editArtPrice,
};
