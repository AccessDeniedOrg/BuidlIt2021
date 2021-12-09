import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import sideImg from "../../assets/images/charityListing.png";
import { Form } from 'react-bootstrap';

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

    let handlerObj

    const handleCharityDataChange = (selectedInput) => (e) => {
        handlerObj = { ...charityData };
        handlerObj[selectedInput] = e.target.value;
        setCharityData({ ...handlerObj });
    };

    const handleBackToClient = () => {
        window.location.href = "/client";
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <div style={{ marginTop: "20%" }}>
                            <img width="80%" src={sideImg} alt="sideart" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div style={{ marginTop: "8%" }}>
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
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Campaign Name</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={charityData["title"]}
                                        onChange={handleCharityDataChange("title")}
                                        placeholder="Enter 6-digit OTP"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Campaign Description</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={charityData["description"]}
                                        onChange={handleCharityDataChange("description")}
                                        placeholder="Enter 6-digit OTP"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Charity Name</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={charityData["name"]}
                                        onChange={handleCharityDataChange("name")}
                                        placeholder="Enter 6-digit OTP"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={charityData["email"]}
                                        onChange={handleCharityDataChange("email")}
                                        placeholder="Enter 6-digit OTP"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Campaign Target</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={charityData["target"]}
                                        onChange={handleCharityDataChange("target")}
                                        placeholder="Enter 6-digit OTP"
                                    />
                                </Form.Group>
                                <button
                                    className="me-btn inner-text"
                                    type="submit"
                                // onClick={handleApplyForListing}
                                >
                                    Verify
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Listing;