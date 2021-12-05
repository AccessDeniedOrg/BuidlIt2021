import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import profileImg from "../../../assets/images/artistProfile.png"
import "./css/ArtistProfile.css"

const ArtistProfile = () => {
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
                                            <p><b>Portfolio Value:</b></p>
                                        </div>
                                        <div style={{ marginRight: "95px" }} className="me-profile-data-right">
                                            <p> 0</p>
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
                                        <p>• <em>The wallet address is auto generated for every login.</em></p>
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

export default ArtistProfile;