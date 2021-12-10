import React, { useState } from 'react';
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import sideImg from "../../assets/images/charityListing.png";
import { Form } from 'react-bootstrap';
import "./css/Listing.css"

const Listing = () => {

    const [charityData, setCharityData] = useState({
        logo: "",
        description: "",
        name: "",
        email: "",
        target: "",
        title: "",
        end_date: "",
        proofLink: ""
    })
    const [uploaded, setUploaded] = useState(false)
    const [sent, setSent] = useState(false)
    const [logoPreview, setLogoPreview] = useState("")
    const [endDate, setEndDate] = useState("")
    const [errors, setErrors] = useState({})

    let handlerObj, errorHandlerObj

    const handleCharityDataChange = (selectedInput) => (e) => {
        handlerObj = { ...charityData };
        handlerObj[selectedInput] = e.target.value;
        setCharityData({ ...handlerObj });
    };

    const handleEndDateChange = (date) => {
        setEndDate(date)
    }

    const handleBackToClient = () => {
        setErrors({})
        window.location.href = "/client";
    };

    const handleApplyForListing = async (e) => {
        e.preventDefault()
        const validAmount = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/
        const validEmail =
            /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/;
        const validURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
        setErrors({})
        errorHandlerObj = {
            nameError: "",
            emailError: "",
            titleError: "",
            logoError: "",
            endDateError: "",
            descriptionError: "",
            targetError: "",
            proofLinkError: ""
        }

        if (charityData["description"].length < 20) {
            errorHandlerObj["descriptionError"] = "Too short";
        }
        if (charityData["description"].length > 200) {
            errorHandlerObj["descriptionError"] = "Too long";
        }
        if (charityData["name"].length === 0) {
            errorHandlerObj["nameError"] = "Required Field";
        }
        if (charityData["title"].length === 0) {
            errorHandlerObj["titleError"] = "Required Field";
        }
        if (!validEmail.test(charityData["email"])) {
            errorHandlerObj["emailError"] = "Invalid Email";
        }
        if (!validAmount.test(charityData["target"])) {
            errorHandlerObj['targetError'] = "Invalid Amount"
        } else {
            if (parseFloat(charityData["target"]) > 300000.00) {
                errorHandlerObj['targetError'] = "Exceeded Limit"
            }
            else if (parseFloat(charityData["target"]) <= 10000.00) {
                errorHandlerObj['targetError'] = "Target is too less"
            }
        }
        if (endDate.length === 0) {
            errorHandlerObj['endDateError'] = "Required Field"
        } else {
            if (endDate.getTime() < Date.now()) {
                errorHandlerObj['endDateError'] = "Invalid end date"
            }
        }
        if (!validURL.test(charityData["proofLink"])) {
            errorHandlerObj['proofLinkError'] = "Invalid link"
        }
        if (charityData["logo"] === "") {
            errorHandlerObj['logoError'] = "Logo Required"
        }
        if (
            errorHandlerObj["descriptionError"] === "" &&
            errorHandlerObj["nameError"] === "" &&
            errorHandlerObj["titleError"] === "" &&
            errorHandlerObj["emailError"] === "" &&
            errorHandlerObj["targetError"] === "" &&
            errorHandlerObj["endDateError"] === "" &&
            errorHandlerObj["logoError"] === "" &&
            errorHandlerObj["proofLinkError"] === ""
        ) {
            await axios.post(`${process.env.REACT_APP_BACKEND_API}/donation/pendingCharity`, {
                logo: charityData.logo,
                description: charityData.description,
                name: charityData.name,
                email: charityData.email,
                target: charityData.target,
                title: charityData.title,
                end_date: (endDate.getTime()) / 1000,
                proofLink: charityData.proofLink,
            }).then((res) => {
                console.log(res.data.status)
                if (res.data.status === "success") {
                    setSent(true)
                } else {
                    console.log("Request Failed")
                }
            }).catch((err) => {
                console.log(err)
            })

        } else {
            setErrors({ ...errorHandlerObj })
            console.log(errorHandlerObj)
        }
    }

    const handleLogoUpload = (e) => {
        e.preventDefault()
        setErrors({})
        errorHandlerObj = {
            logoError: "",
        }
        if (!e.target.files[0]) {
            setUploaded(false)
        } else {
            console.log(e.target.files[0].name)
            var fileExtension = (e.target.files[0].name).split('.').pop();
            if (
                fileExtension === "png" ||
                fileExtension === "jpg" ||
                fileExtension === "jpeg"
            ) {
                console.log("It is accepted")
                getBase64(e.target.files[0])
            } else {
                console.log("There is an error")
                errorHandlerObj['logoError'] = "Accepted formats: .png, .jpg or .jpeg"
                setErrors({ ...errorHandlerObj })
                setUploaded(false)
            }
            console.log(e.target.files[0])
        }
    }

    const getBase64 = (file) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            handlerObj = { ...charityData };
            handlerObj["logo"] = reader.result;
            setCharityData({ ...handlerObj })
            setLogoPreview(reader.result)
            setUploaded(true)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    }

    const renderForm = () => {
        if (sent) {
            return (
                <div style={{ marginTop: "200px" }} className="container text-center">
                    <div className="row">
                        <h4 style={{ fontWeight: "900" }}>Your campaign request has been sent successfully!</h4>
                    </div>
                </div>
            )
        } else {
            return (
                <Form>
                    <div className="row">
                        <div className="col-6">
                            <div>
                                {
                                    uploaded === true
                                        ? (
                                            <label style={{ border: "none", color: "gray" }} className="custom-file-upload">
                                                <input style={{ border: "none" }} onChange={handleLogoUpload} type="file" accept="image/x-png,image/gif,image/jpeg" />
                                                <FontAwesomeIcon
                                                    style={{ position: "relative", left: "30px", top: "-110px", cursor: "pointer" }}
                                                    className="edit-logo-icon"
                                                    icon={faPen}
                                                />
                                                <img src={logoPreview} width="90%" style={{ objectFit: "contain", marginLeft: "10px" }} alt="logoPreview" />
                                            </label>

                                        )
                                        : (
                                            <label style={{ border: "2px dashed", padding: "105px", marginTop: "30px" }} className="custom-file-upload">
                                                <input style={{ border: "none" }} onChange={handleLogoUpload} type="file" accept="image/x-png,image/gif,image/jpeg" />
                                                Upload Logo
                                            </label>
                                        )
                                }

                            </div>
                        </div>
                        <div className="col-6">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Campaign Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={charityData["title"]}
                                    onChange={handleCharityDataChange("title")}
                                    placeholder='Campaign Name'
                                />
                                {errors['titleError'] === "" ? <></> : <div className="error-msg">{errors['titleError']}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Charity Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={charityData["name"]}
                                    onChange={handleCharityDataChange("name")}
                                    placeholder='Charity Name'
                                />
                                {errors['nameError'] === "" ? <></> : <div className="error-msg">{errors['nameError']}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Campaign Description:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={charityData["description"]}
                                    onChange={handleCharityDataChange("description")}
                                    placeholder='Short description of campaign'
                                />
                                {errors['descriptionError'] === "" ? <></> : <div className="error-msg">{errors['descriptionError']}</div>}
                            </Form.Group>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-4">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={charityData["email"]}
                                    onChange={handleCharityDataChange("email")}
                                    placeholder='Email'
                                />
                                {errors['emailError'] === "" ? <></> : <div className="error-msg">{errors['emailError']}</div>}
                            </Form.Group>
                        </div>
                        <div className="col-4">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>End Date:</Form.Label>
                                <DatePicker
                                    value={endDate}
                                    selected={endDate}
                                    onChange={(date) => handleEndDateChange(date)}
                                    placeholderText="DD/MM/YY"
                                    dateFormat="dd/MM/yyyy"
                                />
                                {errors['endDateError'] === "" ? <></> : <div className="error-msg">{errors['endDateError']}</div>}
                            </Form.Group>
                        </div>
                        <div className="col-4">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Campaign Target:</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={charityData["target"]}
                                    onChange={handleCharityDataChange("target")}
                                    placeholder='Campaign Target'
                                />
                                {errors['targetError'] === "" ? <></> : <div className="error-msg">{errors['targetError']}</div>}
                            </Form.Group>
                        </div>
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Authenticity Proof (Secure link to certificate,documentation, etc.):</Form.Label>
                        <Form.Control
                            type="url"
                            value={charityData["proofLink"]}
                            onChange={handleCharityDataChange("proofLink")}
                            placeholder='Link'
                        />
                        {errors['proofLinkError'] === "" ? <></> : <div className="error-msg">{errors['proofLinkError']}</div>}
                    </Form.Group>
                    <div className="text-center">
                        <button
                            className="me-btn inner-text"
                            type="submit"
                            onClick={handleApplyForListing}
                        >
                            Apply
                        </button>
                        {errors['logoError'] === "" ? <></> : <div className="error-msg">{errors['logoError']}</div>}
                    </div>
                </Form>
            )
        }
    }

    return (
        <>
            <div style={{ marginBottom: "30px" }} className="container">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <div style={{ marginTop: "7%" }}>
                            <div className="back-div" style={{ marginBottom: "20px" }}>
                                <FontAwesomeIcon
                                    onClick={handleBackToClient}
                                    className="back-to-main-icon"
                                    icon={faArrowCircleLeft}
                                />
                                <span
                                    onClick={handleBackToClient}
                                    className="back-to-main-text"
                                >
                                    Back To Homepage
                                </span>
                            </div>
                            <div className="artist-login-title">
                                <h3>
                                    <strong>List your campaign with GrantéStudio</strong>
                                </h3>
                            </div>
                            {renderForm()}
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div style={{ marginTop: "20%", marginLeft: "20%" }}>
                            <img width="100%" src={sideImg} alt="sideart" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Listing;