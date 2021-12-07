import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import profileImg from "../../../assets/images/artistProfile.png"
import axios from 'axios';
import { Spinner } from "react-bootstrap"
import "./css/ArtistProfile.css"

const ArtistProfile = () => {

    const [earnings, setEarnings] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getEarnings = async () => {
            axios.post(`${process.env.REACT_APP_BACKEND_API}/artist/getArtistEarnings`, {
                walletAddressArtist: window.localStorage.getItem("walletaddress")
            }).then((res) => {
                console.log(res.data.sum)
                setEarnings(res.data.sum)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        }

        getEarnings()

    }, [])

    const renderProfile = () => {
        if (isLoading) {
            return (
                <div style={{ marginLeft: "100px", }} className="container text-center">
                    <Spinner
                        style={{
                            marginTop: "280px",
                            marginBottom: "10px",
                            color: "#ffded1",
                        }}
                        animation="border"
                    />
                    <div style={{ marginBottom: "700px" }}>
                        <p>Loading your profile...</p>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <Container className="text-center" style={{ marginLeft: "13%", marginTop: "2%" }}>
                        <Row>
                            <h3 className="studio-title-greeting">Hi {`${window.localStorage.getItem("username")}`}.</h3>
                            <h4 className="studio-title">Welcome To Your Granté Studio !</h4>
                        </Row>
                    </Container>
                    <Container style={{ marginTop: "70px" }}>
                        <Row>
                            <Col sm={12} lg={7} md={7} xl={7}>
                                <div style={{ marginBottom: "0", height: "270px" }} className="me-my-account-profile">
                                    <div className="me-my-profile-head">
                                        <div className="me-profile-name">
                                            <h4><strong>Account Details</strong></h4>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "-50px" }} className="me-my-profile-body">
                                        <ul>
                                            <li>
                                                <div className="me-profile-data">
                                                    <p><b>Username:</b></p>
                                                </div>
                                                <div style={{ marginRight: "95px" }} className="me-profile-data-right">
                                                    <p> {window.localStorage.getItem('username')}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="me-profile-data">
                                                    <p><b>Email:</b></p>
                                                </div>
                                                <div style={{ marginRight: "95px" }} className="me-profile-data-right">
                                                    <p> {window.localStorage.getItem('email')}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="me-profile-data">
                                                    <p><b>Earnings:</b></p>
                                                </div>
                                                <div style={{ marginRight: "95px" }} className="me-profile-data-right">
                                                    <p>${earnings}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="me-profile-data">
                                                    <p><b>NFT Wallet Address:</b></p>
                                                </div>
                                                <div style={{ marginRight: "0" }} className="me-profile-data-right">
                                                    <p className="me-profile-data-right">{window.localStorage.getItem('walletaddress')}</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div style={{ height: "220px" }} className="me-my-wallet-profile">
                                    <div className="me-my-wallet-head">
                                        <div className="me-profile-name">
                                            <h4 style={{ fontWeight: "600" }}>Guidelines</h4>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "-20px" }} className="me-my-wallet-body">
                                        <ul>
                                            <li style={{ marginTop: "-40px", marginLeft: "-35px" }} className="guide-list-items">
                                                <p>• <em>The wallet address is auto generated.</em></p>
                                            </li>
                                            <li style={{ marginTop: "-40px", marginLeft: "-35px", paddingTop: "10px" }} className="guide-list-items">
                                                <p>• <em>The Transactions tab shows latest transactions made by you.</em></p>
                                            </li>
                                            <li style={{ marginTop: "-40px", marginLeft: "-35px", paddingTop: "10px" }} className="guide-list-items">
                                                <p>• <em>Do <b>NOT</b> make deposit on the provided wallet address, it is only for holding NFTs. Any deposit will result in loosing the funds.</em></p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={12} lg={5} md={5} xl={5}>
                                <img style={{ width: "155%", margin: "0" }} src={profileImg} alt="profile" />
                            </Col>
                        </Row>
                    </Container>
                </>
            );
        }
    }

    return (
        <>
            {renderProfile()}
        </>
    )


}

export default ArtistProfile;