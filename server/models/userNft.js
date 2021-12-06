var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// art Model
(userNft = new Schema({
	artName: String,
	artistName: String,
	email: String,
	IPFShash: String,
	tokenId: String,
})),
	(UserNft = mongoose.model("UserNft", userNft));

module.exports = UserNft;
