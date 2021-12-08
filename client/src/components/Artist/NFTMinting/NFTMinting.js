import React, { useState, useEffect } from 'react';
import noOnboardImg from "../../../assets/images/noOnboarding.gif"
import ConfirmationMinting from './ConfirmationMinting';
import { Spinner, Container, Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import "./css/NFTMinting.css"

const NFTMinting = (props) => {

    const [hasOnboarded, setHasOnboarded] = useState(false)
    const [openMintingConfirmation, setOpenMintingConfirmation] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [file, setFile] = useState("")
    const [ipfsFile, setIpfsFile] = useState({})
    const [imgPreview, setImgPreview] = useState("")
    const [errors, setErrors] = useState({})
    const [nftData, setNftData] = useState({
        artName: "",
        price: ""
    })

    let errorHandlerObj = {}

    let handlerObj;
    const nftDataHandler = (selectedInput) => (e) => {
        handlerObj = { ...nftData };
        handlerObj[selectedInput] = e.target.value;
        setNftData({ ...handlerObj });
        console.log(nftData);
    };

    useEffect(() => {

        const didOnboard = async () => {
            await axios.post(`${process.env.REACT_APP_BACKEND_API}/stripe-onBoarding/chargesEnabled`, {
                email: window.localStorage.getItem("email")
            }).then((res) => {
                console.log(res.data)
                setHasOnboarded(res.data)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        }

        didOnboard()

    }, [])

    const handleOnboard = async () => {
        await axios.post(`${process.env.REACT_APP_BACKEND_API}/stripe-onBoarding/onBoarding`, {
            email: window.localStorage.getItem("email")
        }).then((res) => {
            console.log(res.data)
            window.location.href = res.data
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleFileUpload = (e) => {
        e.preventDefault()
        var fileExtension = (e.target.files[0].name).split('.').pop();
        if (
            fileExtension === "png" ||
            fileExtension === "gif" ||
            fileExtension === "jpg" ||
            fileExtension === "jpeg"
        ) {
            getBase64(e.target.files[0])
            setIpfsFile(e.target.files[0])
            setFile(e.target.files[0].name)
        } else {
            setFile("Accepted formats: .png, .gif, .jpg or .jpeg")
        }
        console.log(e.target.files[0])
    }

    const handleMintNFT = (e) => {
        e.preventDefault()
        setErrors({})
        const validAmount = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/
        errorHandlerObj = {
            amountError: "",
            nameError: ""
        }
        if (!validAmount.test(nftData.price)) {
            errorHandlerObj['amountError'] = "Invalid Amount"
        } else {
            if (parseFloat(nftData.price) <= 20.00) {
                errorHandlerObj['amountError'] = "Amount should be more than $20.00"
            }
            else if (parseFloat(nftData.price) >= 400.00) {
                errorHandlerObj['amountError'] = "Amount should be less than $400.00"
            }
        }
        if (nftData.artName === "") {
            errorHandlerObj['nameError'] = "This field should not be empty."
        }
        if (
            errorHandlerObj['nameError'] === "" &&
            errorHandlerObj['amountError'] === ""
        ) {
            setOpenMintingConfirmation(true)
        } else {
            setErrors({ ...errorHandlerObj });
            console.log("Minting Failed");
            console.log(errorHandlerObj);
        }

    }

    const getBase64 = (file) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImgPreview(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    }

    const handleCloseMintingConfirmation = () => {
        setOpenMintingConfirmation(false)
    }

    const renderMintingForm = () => {
        if (isLoading) {
            return (
                <div className="container text-center">
                    <Spinner
                        style={{
                            marginTop: "340px",
                            marginBottom: "10px",
                            color: "#ffded1",
                        }}
                        animation="border"
                    />
                    <div style={{ marginBottom: "700px" }}>
                        <p>Verifying...</p>
                    </div>
                </div>
            )
        } else {
            console.log(hasOnboarded)
            if (hasOnboarded) {
                return (
                    <>
                        <Container className="text-center" style={{ marginLeft: "13%", marginTop: "5%" }}>
                            <Row>
                                <h4 className="studio-title">Mint Your Own NFT Art Here!</h4>
                            </Row>
                        </Container>
                        <Container style={{ marginTop: "50px", marginLeft: "10%" }}>
                            <Row>
                                <Col sm={12} lg={7} md={7} xl={7}>
                                    <div style={{ marginBottom: "0", height: "570px" }} className="me-my-account-profile">
                                        <div className="me-my-profile-head">
                                            <div className="me-profile-name">
                                                <h4><strong>Fill Art Details</strong></h4>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: "-50px" }} className="me-my-profile-body">
                                            <Form>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Art Name:</Form.Label>
                                                    <Form.Control
                                                        name="name"
                                                        value={nftData["artName"]}
                                                        onChange={nftDataHandler("artName")}
                                                        placeholder="Enter Art Piece Name"
                                                    />
                                                    {
                                                        errors['nameError'] === "" ? <></> : <div style={{ color: "red" }}>{errors['nameError']}</div>
                                                    }
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Price (USD):</Form.Label>
                                                    <Form.Control
                                                        name="price"
                                                        value={nftData["price"]}
                                                        onChange={nftDataHandler("price")}
                                                        type="number"
                                                        placeholder="Enter Price"
                                                    />
                                                    {
                                                        errors['amountError'] === "" ? <></> : <div style={{ color: "red" }}>{errors['amountError']}</div>
                                                    }
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Upload File</Form.Label>
                                                    <div>
                                                        <label className="custom-file-upload">
                                                            <input style={{ border: "none" }} type="file" onChange={handleFileUpload} accept="image/x-png,image/gif,image/jpeg" />
                                                            Upload From Device
                                                        </label>
                                                        <span style={{ marginLeft: "10px" }}>{file}</span>
                                                    </div>
                                                </Form.Group>
                                                <div style={{ marginTop: "40px", marginBottom: "-20px" }} className="text-center">
                                                    <button
                                                        className="me-btn inner-text"
                                                        type="submit"
                                                        onClick={handleMintNFT}
                                                    >
                                                        Mint NFT
                                                    </button>
                                                </div>
                                            </Form>
                                        </div>
                                        <hr />
                                    </div>
                                </Col>
                                <Col style={{ border: "dashed 3px #ffded1", borderRadius: "15px", padding: "15px" }} sm={12} lg={5} md={5} xl={5}>
                                    <h4 style={{ fontWeight: "600" }}>NFT Preview</h4>
                                    {file === "" || file === "Accepted formats: .png, .gif, .jpg or .jpeg"
                                        ? (
                                            <>
                                                <Container className="text-center">
                                                    <Row>
                                                        <h4 style={{ marginTop: "60%", color: "#ffded1", fontSize: "18px" }}>Upload Your Art File</h4>
                                                    </Row>
                                                </Container>
                                            </>
                                        )
                                        : <div ><img style={{ objectFit: "contain", marginTop: "20%" }} width="100%" src={imgPreview} alt="preview" /></div>}
                                </Col>
                            </Row>
                        </Container>
                    </>
                )
            } else {
                return (
                    <>
                        <div style={{ marginLeft: "8%" }} className="container text-center">
                            <div className="row">
                                <div className="col-12">
                                    <img width="50%" src={noOnboardImg} alt="noOnboard" />
                                </div>
                            </div>
                            <div style={{ marginTop: "-20px" }} className="row">
                                <div className="col-12">
                                    <p>
                                        <b>
                                            Looks like you have not onboarded yet!< br />
                                            Onboarding is required to collect the funds in your Stripe Account whenever your NFTs are selected during donations.<br />
                                        </b>
                                    </p>
                                    <p>
                                        <b><em>PS: If you already have a Stripe Account make sure to use the same email during the onboarding process if you wish to use the same account to collect your funds.</em></b>
                                    </p>
                                </div>
                            </div>
                            <button style={{ marginTop: "35px" }} onClick={handleOnboard} className="me-btn">Onboard Now</button>
                        </div>
                    </>
                )
            }
        }

    }

    return (
        <>
            {renderMintingForm()}
            <ConfirmationMinting
                openMintingConfirmation={openMintingConfirmation}
                handleCloseMintingConfirmation={handleCloseMintingConfirmation}
                price={nftData.price}
                artName={nftData.artName}
                file={ipfsFile}
            />
        </>
    );
}

export default NFTMinting;