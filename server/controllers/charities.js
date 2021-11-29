const mongoose = require("mongoose");
const Charities = require("../models/charities");

// Get All Products
const getAllCharities = async (req, res) => {
    Charities.find((err, docs) => {
        if (err) {
            res.send("Error in retrieving docs ");
        } else {
            res.send({ status: "success", data: docs });
        }
    });
};

// Update donor count and target
const updateAfterNFTTransfer = async (req, res) => {
    var c_id = mongoose.Types.ObjectId(req.body.id);
    var updated_count = 0;
    var updated_target_collected = 0;

    Charities.findOne({ _id: c_id }, async function (err, data) {
        if (err) console.log("From update error", err);
        else {
            if (data) {
                updated_count = parseFloat(data.num_of_donors) + 1;
                updated_target_collected = parseFloat(data.target_collected) + parseFloat(req.body.funds);
                // update record
                Charities.findOneAndUpdate(
                    { _id: c_id },
                    {
                        $set: {
                            num_of_donors: updated_count,
                            target_collected: updated_target_collected,
                        },
                    },
                    (error, doc) => {
                        if (error) {
                            res.send({
                                status: "Error",
                                msg: "There was an error updating the count",
                            });
                        } else {
                            res.send({ status: "success", data: doc });
                        }
                    }
                );

            } else {
                res.send({
                    status: "Error",
                    msg: "Charity does not exist",
                });
            }
        }
    });
};

module.exports = {
    getAllCharities,
    updateAfterNFTTransfer,
};