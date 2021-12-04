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
	const { artName, artistName, price, IPFShash, email } = req.body;
	let newNFT = new UploadArt({
		email: email,
		artName: artName,
		artistName: artistName,
		price: price,
		IPFShash: IPFShash
	});

	newNFT.save(function (err, NFT) {
		if (err) res.send(err);
		else res.status(200).send({ msg: "success" });
	});
}

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
