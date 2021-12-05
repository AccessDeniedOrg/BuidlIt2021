var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// art Model
(uploadArtSchema = new Schema({
	artName: String,
	artistName: String,
	email: String,
	price: Number,
	IPFShash: String,
	tokenId: String,
})),
	(uploadArt = mongoose.model("uploadArt", uploadArtSchema));

module.exports = uploadArt;
