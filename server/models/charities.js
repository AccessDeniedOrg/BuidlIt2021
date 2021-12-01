var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Shop Model
(charitiesSchema = new Schema({
	logo: String,
	description: String,
	name: String,
	num_of_donors: Number,
	target: Number,
	target_collected: Number,
	title: String,
})),
	(Charities = mongoose.model("Charities", charitiesSchema));

module.exports = Charities;
