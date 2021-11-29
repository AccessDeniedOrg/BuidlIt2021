import React, { useState } from 'react';
import axios from 'axios';
import { Card } from "react-bootstrap";
import './css/CheckoutPage.css'
import logo from '../../assets/images/thefundingnetworklogo.png'

let orderid;

const CheckoutPage = (props) => {

    const [amount, setAmount] = useState("")
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
            await axios.post(`${process.env.REACT_APP_BACKEND_API}/transactions/create-order`, {
                amount: amount * 100
            }).then((res) => {
                orderid = res.data.order.id
                console.log(orderid)
                console.log(res)
                var options = {
                    "key": process.env.REACT_APP_RAZORPAY_KEY_ID,
                    "amount": amount * 100,
                    "currency": "INR",
                    "name": "The Funding Network",
                    "description": "Donation",
                    "image": logo,
                    "order_id": orderid,
                    "handler": async (response) => {
                        console.log(response.razorpay_order_id)
                        await axios.post(`${process.env.REACT_APP_BACKEND_API}/transactions/get-order`, {
                            orderid: response.razorpay_order_id
                        }).then(async (res) => {
                            await axios.post(`${process.env.REACT_APP_BACKEND_API}/transactions/store-transaction`, {
                                order_id: response.razorpay_order_id,
                                recepient: props.charity.name,
                                email: window.localStorage.getItem("email"),
                                amount: res.data.amount
                            }).then(async (res) => {
                                console.log(res)
                                await axios.post(`${process.env.REACT_APP_BACKEND_API}/donation/update-charity`, {
                                    id: props.charity._id,
                                    funds: res.data.amount
                                }).then((res) => {
                                    console.log(res)
                                })
                                window.location.href = '/donate'
                            })
                        })
                    },
                    "prefill": {
                        "name": window.localStorage.getItem("username"),
                        "email": window.localStorage.getItem("email"),
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                var rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response) {
                    console.log("Payment Failed")
                });
                rzp1.open();
            })
        } else {
            setError({ ...errorHandlerObj })
        }

    }

    return (
        <>
            <div style={{ margin: "120px" }}>
                <Card className="checkout-page" style={{ marginBottom: "30px" }}>
                    <Card.Header className="checkout-header text-center"><div className="checkout-heading">CHECKOUT</div></Card.Header>
                    <Card.Body className="text-center">
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-center">
                                    <img style={{ width: "25%" }} src={props.charity.logo} alt="charity_logo" />
                                </div>
                                <br />
                                <div className="d-flex justify-content-center" style={{ marginTop: "30px" }}>
                                    <div className="col-6">
                                        <span style={{ float: "left" }}><b>Charity Name: </b></span>
                                        <span style={{ float: "right" }}>{props.charity.name}</span>
                                    </div>
                                </div>
                                <br />
                                <div className="d-flex justify-content-center" style={{ marginTop: "30px" }}>
                                    <div className="col-6">
                                        <span style={{ float: "left" }}><b>Campaign Name: </b></span>
                                        <span style={{ float: "right" }}>{props.charity.title}</span>
                                    </div>
                                </div>
                                <br />
                                <div className="d-flex justify-content-center">
                                    <div className="col-6">
                                        <span><b>Campaign Description </b></span>
                                        <span style={{ float: "right" }}>{props.charity.description}</span>
                                    </div>
                                </div>
                                <br />
                                <hr />
                                <br />
                                <div className="d-flex justify-content-center">
                                    <b>Please enter the amount to donate (in INR)</b>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <input style={{ width: "30%", height: "40px" }} value={amount} onChange={handleAmountChange}></input>
                                </div>
                                {
                                    error['amountError'] === "" ? <></> : <div style={{ color: "red" }}>{error['amountError']}</div>
                                }
                                <br />
                            </div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-center">
                            <button onClick={props.handleBackToDonationPage} className="me-btn" style={{ float: "left", marginRight: "10px" }}>Back</button>
                            <button onClick={handleDonation} className="me-btn" style={{ float: "right" }}>Proceed to Donate</button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default CheckoutPage