var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// art Model
(listing = new Schema({
	listing: [],
	date: Number,
})),
	(Listing = mongoose.model("Listing", listing));

module.exports = Listing;
