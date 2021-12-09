const { decoupleNFT } = require('../polygon');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const UploadArt = require('../../models/uploadArt')
const userNFT = require('../../models/userNft')
const { v4: uuidv4 } = require("uuid");
const CryptoJS = require("crypto-js");

const decouple = async (req, res) => {
    const { role, IPFShash, walletAddressExternal, address } = req.body;
    const transactionID = uuidv4();
    // Encrypting Transaction ID
    const encrypedTransactionId = encodeURIComponent(
        CryptoJS.AES.encrypt(
            JSON.stringify({ transactionID }),
            process.env.ENCRYPTION_SECRET
        )
    );

    if (role === "artist") {
        UploadArt.findOne({ IPFShash: IPFShash }, async (err, data) => {
            console.log(data.tokenId)

            var newTransaction = new donationTransaction({
                transactionId: transactionID,
                totalAmt: "",
                charityAmt: "",
                walletAddressUser: "", //using email
                walletAddressArtist: address, //using IpfsHash
                walletAddressExternal: walletAddressExternal,
                NFTPrice: 0,
                IPFShash: IPFShash,
                charityName: "",
                charityEmail: "",
                type: "Decoupling",
                completed: "false",
                timestamp: Date.now(),
            });

            newTransaction.save(function (err, Transaction) {
                if (err) res.send({ msg: "Failure", err });
                else console.log(Transaction);
            });

            //Checkout Session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        name: "GranteStudio-Charity",
                        amount: 500,
                        currency: "usd",
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${process.env.FRONTEND_API}/successDecouple/${encrypedTransactionId}`,
                cancel_url: `${process.env.FRONTEND_API}/checkout-error`,
            });

            res.send(session.url);
        })


    } else if (role === "user") {
        userNFT.findOne({ IPFShash: IPFShash }, async (err, data) => {
            console.log(data.tokenId)

            var newTransaction = new donationTransaction({
                transactionId: transactionID,
                totalAmt: "",
                charityAmt: "",
                walletAddressUser: address, //using email
                walletAddressArtist: "", //using IpfsHash
                walletAddressExternal: walletAddressExternal,
                NFTPrice: 0,
                IPFShash: IPFShash,
                charityEmail: "",
                charityName: "",
                type: "Decoupling",
                completed: "false",
                timestamp: Date.now(),
            });

            newTransaction.save(function (err, Transaction) {
                if (err) res.send({ msg: "Failure", err });
                else console.log(Transaction);
            });

            await decoupleNFT(address, walletAddressExternal, data.tokenId)

            //Delete from Mongo and Update transaction to completed
            userNFT.deleteOne({ IPFShash: IPFShash }, async function (err, data) {
                if (err) res.send("Could not be deleted");
                else console.log("successfully deleted");
            });

            donationTransaction.findOneAndUpdate(
                { transactionId: transactionID },
                { $set: { completed: "true" } },
                async function (err, data) {
                    console.log(data.completed);
                    if (err) res.send({ msg: "Failure", err });
                    res.send({ msg: "Success" });
                }
            );

        })
    }
};

const decoupleArtistNFT = async (req, res) => {

    const { transactionID, IPFShash, walletAddressExternal, address } = req.body;

    //Get token ID from Upload Art

    UploadArt.findOne({ IPFShash: IPFShash }, async (err, data) => {
        if (err) {
            res.send({ msg: "Failure", err })
        }
        else {
            await decoupleNFT(address, walletAddressExternal, data.tokenId)
            //Delete from Mongo and Update transaction to completed
            UploadArt.deleteOne({ IPFShash: IPFShash }, async function (err, nftData) {
                if (err) console.log("Could not be deleted");
                else console.log("successfully deleted");
            });

            donationTransaction.findOneAndUpdate(
                { transactionId: transactionID },
                { $set: { completed: "true" } },
                async function (err, transactionData) {
                    console.log(transactionData.completed);
                    if (err) res.send({ msg: "Failure", err });
                    else res.send({ msg: "Success", tokenId: data.tokenId });
                }
            );
        }
    })
}

module.exports = {
    decouple,
    decoupleArtistNFT
};
