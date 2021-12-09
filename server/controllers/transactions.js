const donationTransaction = require("../models/transactions");

const getTransactions = async (req, res) => {
    const { walletAddress, role } = req.body
    if (role === "user") {
        donationTransaction.find({ walletAddressUser: walletAddress }, async (err, data) => {
            if (err) {
                res.send("Error in retrieving transactions ");
            } else {

                res.send({ status: "success", data: data });
            }
        });
    } else {
        donationTransaction.find({ walletAddressArtist: walletAddress }, async (err, data) => {
            if (err) {
                res.send("Error in retrieving transactions ");
            } else {

                res.send({ status: "success", data: data });
            }
        });
    }

};


module.exports = {
    getTransactions
};
