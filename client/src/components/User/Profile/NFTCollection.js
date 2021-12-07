import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noNFTCollection from "../../../assets/images/noNFTCollection.gif";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Card, Spinner } from "react-bootstrap"
import axios from "axios";

const NFTCollection = (props) => {

    const [nfts, setNfts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getNFTs = async () => {
            axios.post(`${process.env.REACT_APP_BACKEND_API}/artist/getNfts`, {
                role: "user",
                email: window.localStorage.getItem("email")
            }).then((res) => {
                setNfts(res.data.data);
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        }

        getNFTs()

    }, [])

    const displayUserNFTS = () => {
        if (isLoading) {
            return (
                <div className="container text-center">
                    <Spinner
                        style={{
                            marginTop: "240px",
                            marginBottom: "10px",
                            color: "#ffded1",
                        }}
                        animation="border"
                    />
                    <div style={{ marginBottom: "700px" }}>
                        <p>Loading Your NFTs...</p>
                    </div>
                </div>
            )
        } else {
            if (nfts.length !== 0) {
                return (
                    <div className="row" style={{ margin: "0" }}>
                        {nfts.map((nft, index) => {
                            return (
                                <div
                                    className="col-sm-12 col-md-6 col-lg-4"
                                    key={index}
                                    style={{ marginBottom: "60px" }}
                                >
                                    <Card style={{ height: "410px", width: "25rem", cursor: "pointer", border: "solid 1px rgba(227, 226, 225, 0.4)" }} key={index}>
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
                                        <Card.Body className="text-center">
                                            <button
                                                className="me-btn"
                                                style={{
                                                    width: "70%",
                                                    height: "50px",
                                                    fontSize: "15px",
                                                    marginLeft: "5px",
                                                    backgroundColor: "orange"
                                                }}
                                            >
                                                Decouple
                                            </button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                )
            } else {
                return (
                    <>
                        <div
                            style={{ marginLeft: "8%", marginTop: "10%" }}
                            className="container text-center"
                        >
                            <div className="row">
                                <div className="col-12">
                                    <img width="50%" src={noNFTCollection} alt="noNFTCollection" />
                                </div>
                            </div>
                            <div style={{ marginTop: "10px" }} className="row">
                                <div className="col-12">
                                    <p>
                                        <b>
                                            Oh No! Looks like you have not minted you Art NFTs yet.
                                            <br />
                                            <button
                                                style={{ marginTop: "35px" }}
                                                onClick={() => {
                                                    window.location.href = `/client/donation`;
                                                }}
                                                className="me-btn"
                                            >
                                                Mint Your First NFT
                                            </button>
                                            <br />
                                        </b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                );
            }
        }

    };

    return (
        <>
            <div style={{ marginTop: "70px" }} className="me-my-account me-padder-top me-padder-bottom">
                <div className="container">
                    <div className="back-div" style={{ marginBottom: "20px" }}>
                        <FontAwesomeIcon
                            onClick={props.handleBackToProfile}
                            className="back-to-main-icon"
                            icon={faArrowCircleLeft}
                        />
                        <span
                            onClick={props.handleBackToProfile}
                            className="back-to-main-text"
                        >
                            Back To Profile
                        </span>
                    </div>
                    {displayUserNFTS()}
                </div>
            </div>
        </>
    );
}

export default NFTCollection;