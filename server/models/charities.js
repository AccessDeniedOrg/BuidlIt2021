var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Shop Model
(charitiesSchema = new Schema({
	logo: String,
	description: String,
	name: String,
	email: String,
	num_of_donors: Number,
	target: Number,
	target_collected: Number,
	end_date: Number,
	title: String,
	accountId: String,
})),
	(Charities = mongoose.model("Charities", charitiesSchema));

module.exports = Charities;
