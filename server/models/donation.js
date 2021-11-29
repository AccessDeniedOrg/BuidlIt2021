var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Shop Model
(donationSchema = new Schema({
    order_id: String,
    recepient: String,
    email: String,
    amount: Number,
    timestamp: Number,
})),
    (Donation = mongoose.model("Donation", donationSchema));

module.exports = Donation;