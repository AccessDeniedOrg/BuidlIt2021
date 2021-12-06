const UploadArt = require("../models/uploadArt");
const UserNft = require("../models/userNft");

const getFilteredNFTs = async (req, res) => {
	const { price } = req.body;
	UploadArt.find({ price: { $lte: price } }, async function (err, data) {
		if (!data) {
			res.send("No NFTS");
		} else {
			res.send(data);
		}
	});
};

const getNft = async (req, res) => {
	const { email, role } = req.body;

	if (role === "user") {
		UserNft.find({ email: email }, (err, docs) => {
			if (err) {
				res.send("Error in retrieving docs ");
			} else {
				res.send({ status: "success", data: docs });
			}
		});
	} else if (role === "artist") {
		UploadArt.find({ email: email }, (err, docs) => {
			if (err) {
				res.send("Error in retrieving docs ");
			} else {
				res.send({ status: "success", data: docs });
			}
		});
	} else {
		res.send("Invalid Role");
	}
};

module.exports = {
	getNft,
	getFilteredNFTs,
};
