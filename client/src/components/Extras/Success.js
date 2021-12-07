import React, { useState, useEffect } from 'react';
import success from '../../assets/images/success.png';
import Confetti from 'react-confetti';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
var CryptoJS = require("crypto-js");

const Success = () => {

    const [stage, setStage] = useState("pending")
    const [msg, setMsg] = useState("")

    useEffect(() => {

        const getTransactionDetails = async () => {
            setMsg("Confirming Transactions...")
            const ciphertext = decodeURIComponent(window.location.pathname.slice(9))
            const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.REACT_APP_DECRYPT_SECRET);
            const plainText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).transactionID
            await axios.post(`${process.env.REACT_APP_BACKEND_API}/stripe-payment/getTransaction`, {
                transactionId: plainText
            }).then(async (res) => {
                console.log(res)
                if (res.data.completed === "true") {
                    window.location.href = "/expired"
                } else {
                    setStage("transfers")
                    setMsg("Performing Additional Transfers...")
                    console.log(res.data)
                    await axios.post(`${process.env.REACT_APP_BACKEND_API}/stripe-payment/dualTransfer`, {
                        charityAmt: res.data.charityAmt,
                        NFTPrice: res.data.NFTPrice,
                        walletAddressArtist: res.data.walletAddressArtist,
                        charityEmail: res.data.charityEmail,
                        transactionId: res.data.transactionId,
                    }).then(async (dualResp) => {
                        console.log(dualResp)
                        if (res.data.NFTPrice === 0) {
                            setStage("completed")
                        } else {
                            //Perform Blockchain Transfer
                            setStage("storing")
                            setMsg("Storing NFT to collection...")
                            await axios.post(`${process.env.REACT_APP_BACKEND_API}/stripe-payment/tranferNFtOwnership`, {
                                userWalletAddress: res.data.walletAddressUser,
                                IPFShash: res.data.IPFShash,
                                transactionId: plainText
                            }).then((storeResp) => {
                                setStage("completed")
                            }).catch((err) => {
                                console.log(err)
                            })
                        }

                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        }

        getTransactionDetails()

    }, [])


    const handleBackToStudio = (e) => {
        e.preventDefault()
        window.location.href = "/client/profile"
    }

    const renderStageContent = () => {
        switch (stage) {
            case "completed": {
                return (
                    <>
                        <p style={{ fontSize: "20px" }} className="text-center"><strong>Hurray! Donation Completed!</strong></p>
                        <button style={{ width: "150px", marginTop: "50px" }} onClick={handleBackToStudio} className="me-btn">Back to Profile</button>
                    </>
                )
            }
            default: {
                return (
                    <>
                        <Spinner style={{ margin: "20px 0", color: "#eb6e3b" }} animation="border" />
                        <div>
                            <p>{msg}</p>
                        </div>
                        <div>
                            <p><em>**Do <b>NOT</b> click Back or refresh the page as it may lead to loosing your NFT.</em></p>
                        </div>
                    </>
                )
            }
        }
    }

    return (
        <>
            {stage === "completed"
                ?
                <Confetti
                    width="1500px"
                    height="720px"
                />
                : <></>
            }
            <div className="text-center" style={{ margin: "40px" }}>
                <img width="30%" src={success} alt="success" />
                <div className="container text-center">
                    {renderStageContent()}
                </div>
            </div>
        </>
    );
}

export default Success;