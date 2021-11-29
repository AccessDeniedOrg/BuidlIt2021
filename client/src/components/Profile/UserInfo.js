import React from 'react';
import "./css/UserInfo.css"
import "./css/Guidelines.css"

const UserInfo = () => {
    return (
        <>
            <div style={{ marginTop: "70px" }} className="col-lg-6">
                <div className="me-my-account-profile">
                    <div className="me-my-profile-head">
                        <div className="me-profile-name">
                            <h4>Account Details</h4>
                        </div>
                    </div>
                    <div className="me-my-profile-body">
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
                                    <p><b>Portfolio Value:</b></p>
                                </div>
                                <div className="me-profile-data-right">
                                    <p> 0</p>
                                </div>
                            </li>
                            <li>
                                <div className="me-profile-data">
                                    <p><b>NFT Wallet Address:</b></p>
                                </div>
                                <div className="me-profile-data-right">
                                    <p> TVyXtKiMoG2PZpSsAnMaLZW747PSvRAQmT</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="text-center">
                        <button className="me-btn text-center">
                            View Your NFT Collection
                        </button>
                    </div>
                </div>
                <div className="me-my-wallet-profile">
                    <div className="me-my-wallet-head">
                        <div className="me-wallet-name">
                            <h4>Guidelines</h4>
                        </div>
                    </div>
                    <div className="me-my-wallet-body">
                        <ul>
                            <li className="guide-list-items">
                                <p>• <em>The wallet address is auto generated for every login.</em></p>
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

export default UserInfo;