import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from "react-bootstrap"
import "./css/UserInfo.css"
import "./css/Guidelines.css"

const UserInfo = (props) => {

    const [nftCount, setNftCount] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getNFTs = async () => {
            axios.post(`${process.env.REACT_APP_BACKEND_API}/artist/getNfts`, {
                role: "user",
                email: window.localStorage.getItem("email")
            }).then((res) => {
                setNftCount((res.data.data).length);
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        }

        getNFTs()

    }, [])

    const renderProfile = () => {
        if (isLoading) {
            return (
                <div className="container text-center">
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
                    <div style={{ marginTop: "70px" }} className="col-lg-6">
                        <div className="me-my-account-profile">
                            <div className="me-my-profile-head">
                                <div className="me-profile-name">
                                    <h4><strong>Account Details</strong></h4>
                                </div>
                            </div>
                            <div style={{ marginTop: "-40px" }} className="me-my-profile-body">
                                <ul>
                                    <li>
                                        <div className="me-profile-data">
                                            <p><b>Username:</b></p>
                                        </div>
                                        <div className="me-profile-data-right">
                                            <p> {window.localStorage.getItem('username')}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="me-profile-data">
                                            <p><b>Email:</b></p>
                                        </div>
                                        <div className="me-profile-data-right">
                                            <p> {window.localStorage.getItem('email')}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="me-profile-data">
                                            <p><b>NFTs Owned:</b></p>
                                        </div>
                                        <div className="me-profile-data-right">
                                            <p>{nftCount}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="me-profile-data">
                                            <p><b>NFT Wallet Address:</b></p>
                                        </div>
                                        <div className="me-profile-data-right">
                                            <p>{window.localStorage.getItem("walletaddress")}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <button onClick={props.handleGoToCollection} style={{ width: "250px" }} className="me-btn text-center">
                                    <strong>View Your NFT Collection</strong>
                                </button>
                            </div>
                        </div>
                        <div className="me-my-wallet-profile">
                            <div className="me-my-wallet-head">
                                <div className="me-profile-name">
                                    <h4 style={{ fontWeight: "600" }}>Guidelines</h4>
                                </div>
                            </div>
                            <div style={{ marginLeft: "-30px", marginTop: "-10px" }} className="me-my-wallet-body">
                                <ul>
                                    <li className="guide-list-items">
                                        <p>• <em>The wallet address is auto generated.</em></p>
                                    </li>
                                    <li className="guide-list-items">
                                        <p>• <em>The alongside table shows latest transactions made by your account.</em></p>
                                    </li>
                                    <li className="guide-list-items">
                                        <p>• <em>Do <b>NOT</b> make deposit on the provided wallet address as it is only for holding NFTs. Any deposit will result in loosing the funds.</em></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
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

export default UserInfo;