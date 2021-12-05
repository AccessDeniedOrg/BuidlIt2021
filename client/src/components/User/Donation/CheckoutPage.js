import React, { useState } from 'react';
// import axios from 'axios';
import { Card } from "react-bootstrap";
import './css/CheckoutPage.css'

//let orderid;

const CheckoutPage = (props) => {

    const [amount, setAmount] = useState("")
    const [step, setStep] = useState(1)
    const [error, setError] = useState({})

    let errorHandlerObj = {
        amountError: ""
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

    const handleDonation = async (e) => {
        setError({})
        const validAmount = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/
        errorHandlerObj = {
            amountError: ""
        }
        if (!validAmount.test(amount)) {
            errorHandlerObj['amountError'] = "Invalid Amount"
        } else {
            if ((parseFloat(props.charity.target) - parseFloat(props.charity.target_collected)).toFixed(2) < parseFloat(amount)) {
                errorHandlerObj['amountError'] = "Exceeded Limit"
            }
            else if (parseFloat(amount) <= 5000.00) {
                errorHandlerObj['amountError'] = "Amount should be more than ₹5000.00"
            }
        }
        if (errorHandlerObj['amountError'] === "") {
            e.preventDefault()
            console.log("Setting up stripe payment...")
        } else {
            setError({ ...errorHandlerObj })
        }

    }

    return (
        <>
            <div style={{ margin: "155px 150px 0 150px" }}>
                <Card className="checkout-page">
                    <Card.Header style={{ borderBottom: "none", paddingTop: "30px", paddingRight: "30px", paddingLeft: "30px" }} className="checkout-header">
                        <span className="checkout-heading">Add Donation Amount</span>
                        <span style={{ float: "right", marginTop: "0" }} className="checkout-heading">1/3</span>
                    </Card.Header>
                    <Card.Body>
                        <div style={{ padding: "0px" }} className="row">
                            <div className="col-6">
                                <div className="d-flex justify-content-center">
                                    <img style={{ width: "200px", height: "200px", objectFit: "contain" }} src={props.charity.logo} alt="charity_logo" />
                                </div>
                            </div>
                            <div style={{ paddingTop: "30px" }} className="col-6">
                                <br />
                                <div style={{ marginTop: "7px" }}>
                                    <span style={{ float: "left" }}><b>Charity Name: </b></span>
                                    <span className="charity-data-right">{props.charity.name}</span>
                                </div>
                                <br />
                                <div style={{ marginTop: "7px" }}>
                                    <span style={{ float: "left" }}><b>Campaign Name: </b></span>
                                    <span className="charity-data-right">{props.charity.title}</span>
                                </div>
                                <br />
                                <div style={{ marginTop: "7px" }}>
                                    <span style={{ float: "left" }}><b>Campaign Description: </b></span>
                                    <span className="charity-data-right">{props.charity.description}</span>
                                </div>
                                <br />
                            </div>
                        </div>
                        <hr />
                        <br />
                        <br />
                        <div className="d-flex justify-content-center">
                            <b>Please enter the amount to donate (in USD)</b>
                        </div>
                        <div className="d-flex justify-content-center">
                            <input style={{ width: "30%", height: "40px" }} value={amount} onChange={handleAmountChange}></input>
                        </div>
                        {
                            error['amountError'] === "" ? <></> : <div style={{ color: "red" }}>{error['amountError']}</div>
                        }
                        <br />
                        <div className="d-flex justify-content-center">
                            <button onClick={props.handleBackToDonationPage} className="me-btn" style={{ float: "left", marginRight: "10px" }}>Back</button>
                            <button onClick={handleDonation} className="me-btn" style={{ float: "right" }}>Next</button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default CheckoutPage