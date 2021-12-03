var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// art Model
(uploadArtSchema = new Schema({
	artName: String,
	email: String,
	price: Number,
	baseUrl: String,
})),
	(uploadArt = mongoose.model("uploadArt", uploadArtSchema));

module.exports = uploadArt;
