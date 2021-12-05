var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Shop Model
(transactionSchema = new Schema({
    order_id: String,
    recepient: String,
    email: String,
    amount: Number,
    timestamp: Number,
})),
    (Transactions = mongoose.model("Transactions", transactionSchema));

module.exports = Transactions;