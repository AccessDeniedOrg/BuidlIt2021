import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import noNFT from '../../../assets/images/noNFTDonation.png'
import axios from 'axios';
import { Card, Spinner } from "react-bootstrap";
import './css/CheckoutPage.css'
import ConfirmSkip from './ConfirmSkip';

//let orderid;

const CheckoutPage = (props) => {

    const [amount, setAmount] = useState("")
    const [step, setStep] = useState(1)
    const [openSkipConfirmation, setOpenSkipConfirmation] = useState(false)
    const [selectedNFT, setSelectedNFT] = useState({})
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [nFTLoading, setNFTLoading] = useState(false)
    const [nfts, setNfts] = useState([])
    const [title, setTitle] = useState("Add Donation Amount")
    const [error, setError] = useState({})


    let errorHandlerObj = {
        amountError: "",
        nftSelectionError: ""
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

    const handlePrevious = (step, title) => {
        setSelectedIndex(-1)
        setError({})
        setSelectedNFT({})
        setStep(step)
        setTitle(title)
    }

    const handleDisplaySummary = () => {
        if (Object.keys(selectedNFT).length === 0 && nfts.length !== 0) {
            setError({ nftSelectionError: "No NFT Selected. Either select NFT or skip this step." })
        } else {
            setError({})
            setStep(step + 1)
            setTitle("Donation Summary")
        }
    }

    const handleConfirmSkip = () => {
        handleCloseSkipConfirmation()
        setSelectedIndex(-1)
        setError({})
        setSelectedNFT({})
        setStep(step + 1)
        setTitle("Donation Summary")
    }

    const handleOpenSkipconfirm = () => {
        setOpenSkipConfirmation(true)
    }

    const handleCloseSkipConfirmation = () => {
        setOpenSkipConfirmation(false)
    }

    const handleSelect = (index) => {
        setSelectedIndex(index)
        setSelectedNFT(nfts[index])
    }

    const handleConfirmDonation = async () => {
        let IPFShash, NFTPrice
        if (Object.keys(selectedNFT).length === 0) {
            IPFShash = ""
            NFTPrice = 0
        } else {
            IPFShash = selectedNFT.IPFShash
            NFTPrice = selectedNFT.price
        }
        await axios.post(`${process.env.REACT_APP_BACKEND_API}/stripe-payment/checkoutSession`, {
            "totalAmt": parseFloat(amount),
            "charityAmt": parseFloat(amount) * 0.9,
            "NFTPrice": NFTPrice,
            "walletAddressUser": window.localStorage.getItem("walletaddress"),
            "IPFShash": IPFShash,
            "charityName": props.charity.name,
            "charityEmail": props.charity.email,
            "type": "Donation"
        }).then((res) => {
            window.location.href = res.data
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleDisplayNFTs = async (e) => {
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
            else if (parseFloat(amount) <= 50.00) {
                errorHandlerObj['amountError'] = "Amount should be more than $50.00"
            }
        }
        if (errorHandlerObj['amountError'] === "") {
            e.preventDefault()
            setStep(step + 1)
            setTitle("Choose NFT")
            setNFTLoading(true)
            //Axios Request To Display NFTs
            axios.post(`${process.env.REACT_APP_BACKEND_API}/artist/getFilteredNFTs`, {
                price: parseFloat(amount) * 0.1
            }).then((res) => {
                console.log(res)
                setNfts(res.data);
                setNFTLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            setError({ ...errorHandlerObj })
        }

    }

    const displayNFTs = () => {
        if (nFTLoading) {
            return (
                <>
                    <div className="text-center">
                        <Spinner
                            style={{
                                marginTop: "340px",
                                marginBottom: "10px",
                                color: "#ffded1",
                            }}
                            animation="border"
                        />
                        <div style={{ marginBottom: "700px" }}>
                            <p>Loading NFTs...</p>
                        </div>
                    </div>
                </>
            )
        } else {
            if (nfts.length === 0) {
                return (
                    <>
                        <div className="text-center">
                            <img style={{ marginTop: "-90px" }} width="35%" src={noNFT} alt="noNFT" />
                            <h6 style={{ marginTop: "-30px" }}>
                                Sorry, no NFTs available for this donation.<br />
                                A percentage of your donation will be used to help Charities who have not reached their goal this month.<br />
                                Please Click the "Next" Button if you wish to continue with the donation.
                            </h6>
                        </div>
                    </>
                )
            } else {
                console.log(parseFloat(amount) * 0.1)
                return (
                    <>
                        <p style={{ marginTop: "-30px", marginBottom: "40px" }}><em>Please click on the NFT you want to select. Incase you want to skip this step, click on "Skip"</em></p>
                        <Scrollbars style={nfts.length <= 3 ? { height: 370 } : { height: 600 }}>
                            <div className="row" style={{ margin: "0" }}>
                                {nfts.map((nft, index) => {
                                    let addedStyle = { border: "solid 1px rgba(227, 226, 225, 0.4)" }
                                    if (selectedIndex === index) {
                                        addedStyle = { border: "solid 2px #d45f2f", backgroundColor: "rgba(255, 222, 209, 0.3)" }
                                    }
                                    return (
                                        <div
                                            className="col-sm-12 col-md-6 col-lg-4"
                                            key={index}
                                            style={{ marginBottom: "60px" }}
                                        >
                                            <Card onClick={() => { handleSelect(index) }} style={{ height: "310px", width: "18rem", cursor: "pointer", ...addedStyle }} key={index}>
                                                <Card.Title className="text-center" style={{ fontSize: "20px", float: "left", marginTop: "20px" }}>
                                                    {nft.artName}
                                                </Card.Title>
                                                <Card.Img
                                                    style={{ height: "200px", objectFit: "contain" }}
                                                    variant="top"
                                                    src={`https://gateway.pinata.cloud/ipfs/${nft.IPFShash}`}
                                                />
                                                <Card.Body>
                                                    <Card.Title style={{ fontSize: "15px", float: "right", marginBottom: "10px" }}>
                                                        - {nft.artistName}
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>
                        </Scrollbars>
                    </>
                )
            }
        }

    }

    const renderSteps = () => {
        switch (step) {
            case 2: {
                console.log(nfts)
                return (
                    <>
                        <div style={{ padding: "40px" }}>
                            {displayNFTs()}
                        </div>
                        <div className="text-center">
                            {
                                error['nftSelectionError'] === "" ? <></> : <div style={{ color: "red" }}>{error['nftSelectionError']}</div>
                            }
                            <div style={{ marginBottom: "10px" }} className="d-flex justify-content-center">
                                <button onClick={() => { handlePrevious(1, "Add Donation Amount") }} className="me-btn" style={{ float: "left", marginRight: "20px" }}>Previous</button>
                                {nfts.length === 0 ? <></> : <button onClick={handleOpenSkipconfirm} className="me-btn" style={{ backgroundColor: "white", border: "solid 2px #d45f2f", marginRight: "20px" }}>Skip</button>}
                                <button onClick={handleDisplaySummary} className="me-btn" style={{ float: "right" }}>Next</button>
                            </div>
                        </div>
                    </>
                )
            }
            case 3: {
                return (
                    <>
                        <div style={{ padding: "0px" }} className="row text-center">
                            <h4 style={{ fontWeight: "600", marginTop: "20px", marginBottom: "20px" }}><u>Charity Details</u></h4>
                            <div className="col-6">
                                <div className="d-flex justify-content-center">
                                    <img style={{ width: "200px", height: "200px", objectFit: "contain" }} src={props.charity.logo} alt="charity_logo" />
                                </div>
                            </div>
                            <div style={{ paddingTop: "30px", marginLeft: "-50px" }} className="col-6">
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
                        <div style={{ padding: "0px" }} className="row text-center">
                            <h4 style={{ fontWeight: "600", marginTop: "20px", marginBottom: "20px" }}><u>NFT Details</u></h4>
                            {Object.keys(selectedNFT).length === 0
                                ? (
                                    <>
                                        <div className="row text-center">
                                            <h5 style={{ color: "gray", marginTop: "30px", marginBottom: "30px", marginLeft: "15px" }}>No NFT Selected</h5>
                                        </div>
                                    </>
                                )
                                : (
                                    <>
                                        <div className="col-6">
                                            <div className="d-flex justify-content-center">
                                                <img style={{ width: "200px", height: "200px", objectFit: "contain" }} src={`https://gateway.pinata.cloud/ipfs/${selectedNFT.IPFShash}`} alt="charity_logo" />
                                            </div>
                                        </div>
                                        <div style={{ paddingTop: "30px", marginLeft: "-50px" }} className="col-6">
                                            <br />
                                            <div style={{ marginTop: "7px" }}>
                                                <span style={{ float: "left" }}><b>Art Name: </b></span>
                                                <span className="charity-data-right">{selectedNFT.artName}</span>
                                            </div>
                                            <br />
                                            <div style={{ marginTop: "7px" }}>
                                                <span style={{ float: "left" }}><b>Artist Name: </b></span>
                                                <span className="charity-data-right">{selectedNFT.artistName}</span>
                                            </div>
                                            <br />
                                        </div>
                                    </>
                                )
                            }

                        </div>
                        <br />
                        <br />
                        <div className="text-center">
                            <div style={{ marginBottom: "10px" }} className="d-flex justify-content-center">
                                <button onClick={() => { handlePrevious(2, "Choose NFT") }} className="me-btn" style={{ float: "left", marginRight: "20px" }}>Previous</button>
                                <button onClick={handleConfirmDonation} className="me-btn" style={{ float: "right" }}>Confirm Donation</button>
                            </div>
                        </div>
                    </>
                )
            }
            default: {
                return (
                    <>
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
                        <div className="text-center">
                            <div className="d-flex justify-content-center">
                                <b>Please enter the amount to donate (in USD)</b>
                            </div>
                            <div className="d-flex justify-content-center">
                                <input style={{ width: "30%", height: "40px" }} value={amount} onChange={handleAmountChange}></input>
                            </div>
                            <br />
                            {
                                error['amountError'] === "" ? <></> : <div style={{ color: "red" }}>{error['amountError']}</div>
                            }
                            <br />
                            <div className="d-flex justify-content-center">
                                <br />
                                <button onClick={props.handleBackToDonationPage} className="me-btn" style={{ float: "left", marginRight: "10px" }}>Back</button>
                                <button onClick={handleDisplayNFTs} className="me-btn" style={{ float: "right" }}>Next</button>
                            </div>
                        </div>
                    </>
                )
            }

        }
    }

    return (
        <>
            <div style={{ margin: "155px 150px 90px 150px" }}>
                <Card className="checkout-page">
                    <Card.Header style={{ borderBottom: "none", paddingTop: "30px", paddingRight: "30px", paddingLeft: "30px" }} className="checkout-header">
                        <span className="checkout-heading">{`${title}`}</span>
                        <span style={{ float: "right", marginTop: "0" }} className="checkout-heading">{`${step}`}/3</span>
                    </Card.Header>
                    <Card.Body>
                        {renderSteps()}
                    </Card.Body>
                </Card>
            </div>
            <ConfirmSkip
                openSkipConfirmation={openSkipConfirmation}
                handleCloseSkipConfirmation={handleCloseSkipConfirmation}
                handleConfirmSkip={handleConfirmSkip}
            />
        </>
    );
}

export default CheckoutPage