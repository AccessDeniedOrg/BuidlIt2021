var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// art Model
(userNft = new Schema({
	artName: String,
	email: String,
})),
	(UserNft = mongoose.model("UserNft", userNft));

module.exports = UserNft;
