import React, { useState, useEffect } from "react";
import sideArt from "../../assets/images/artistAuthArt.gif";
import FormContent from "./FormContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import "./css/ArtistLogin.css";
import "./css/Login.css";

const ArtistLogin = () => {
    const [title, setTitle] = useState("Login To Your Granté Studio");

    const handleTitleChange = (title) => {
        setTitle(title);
    };

    const handleBackToClient = () => {
        window.location.href = "/client";
    };

    useEffect(() => {
        if (window.localStorage.getItem("role") === "artist") {
            window.location.href = "/client"
        }
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <div style={{ marginTop: "20%" }}>
                            <img src={sideArt} alt="sideart" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div style={{ marginTop: "18%" }}>
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
                                    <strong>{title}</strong>
                                </h3>
                            </div>
                            <FormContent
                                role="artist"
                                handleTitleChange={handleTitleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArtistLogin;
