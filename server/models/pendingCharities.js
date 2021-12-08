var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Shop Model
(pendingCharitiesSchema = new Schema({
	logo: String,
	description: String,
	name: String,
	email: String,
	target: Number,
	title: String,
	accountId: String,
	proofLink: String,
})),
	(pendingCharities = mongoose.model(
		"pendingCharities",
		pendingCharitiesSchema
	));

module.exports = pendingCharities;
