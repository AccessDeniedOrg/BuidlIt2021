import React, { useState, useEffect } from 'react';
import noOnboardImg from "../../../assets/images/noOnboarding.gif"
//import axios from "axios";

const NFTMinting = () => {

    const [hasOnboarded, setHasOnboarded] = useState(false)

    useEffect(() => {

        //     const didOnboard = async () => {
        //         await axios.post(`${process.env.REACT_APP_BACKEND_API}/stripe/chargesEnabled`, {
        //             email: window.localStorage.getItem("email")
        //         }).then((res) => {
        //             console.log(res.data)
        //         }).catch((err) => {
        //             console.log(err)
        //         })
        //     }

        //     const response = didOnboard()
        setHasOnboarded(false)

    }, [])

    const handleOnboard = () => {
        console.log("Starting Onboard...")
    }

    const renderMintingForm = () => {
        if (hasOnboarded) {
            console.log("Render Form")
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

    return (
        <>
            {renderMintingForm()}
        </>
    );
}

export default NFTMinting;