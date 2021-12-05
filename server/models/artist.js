var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Artist Model
(artistSchema = new Schema({
	email: String,
	name: String,
	password: String,
	accountId: String,
	walletAddress: String,
})),
	(Artist = mongoose.model("Artist", artistSchema));

module.exports = Artist;
