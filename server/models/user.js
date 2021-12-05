var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// User Model
(userSchema = new Schema({
	email: String,
	name: String,
	password: String,
	accountId: {
		type: String,
		default: "",
	},
	tokenId: String,
})),
	(User = mongoose.model("User", userSchema));

module.exports = User;
