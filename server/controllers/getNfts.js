const UploadArt = require("../models/uploadArt");
const UserNft = require("../models/userNft");
const donationTransactions = require("../models/transactions");

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
				res.send({ msg: "Error in retrieving docs " });
			} else {
				res.send({ status: "success", data: docs });
			}
		});
	} else if (role === "artist") {
		UploadArt.find({ email: email }, (err, docs) => {
			if (err) {
				res.send({ msg: "Error in retrieving docs " });
			} else {
				res.send({ status: "success", data: docs });
			}
		});
	} else {
		res.send("Invalid Role");
	}
};

const getArtistEarnings = async (req, res) => {
	const { walletAddressArtist } = req.body;

	donationTransactions.find({ walletAddressArtist: walletAddressArtist }, (err, data) => {
		if (err) {
			res.send({ msg: "Error in retrieving docs " });
		} else {
			let sum = 0;
			for (let i = 0; i < data.length; i++) {
				sum = sum + data[i].NFTPrice
			}
			// console.log(sum);
			return res.send({ sum: sum });
		}
	})
}

module.exports = {
	getNft,
	getFilteredNFTs,
	getArtistEarnings
};
