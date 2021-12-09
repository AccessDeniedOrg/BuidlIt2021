var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Shop Model
(donationTransactionSchema = new Schema({
	transactionId: String,
	type: String,
	charityEmail: String,
	charityName: String,
	IPFShash: String,
	walletAddressUser: String,
	walletAddressArtist: String,
	walletAddressExternal: String,
	totalAmt: Number,
	charityAmt: Number,
	NFTPrice: Number,
	completed: String,
	timestamp: Number,
})),
	(donationTransaction = mongoose.model(
		"donationTransaction",
		donationTransactionSchema
	));

module.exports = donationTransaction;
