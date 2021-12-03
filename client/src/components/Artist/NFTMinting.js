import React, { useState, useEffect } from 'react';
import axios from "axios";

const NFTMinting = () => {

    const [hasOnboarded, setHasOnboarded] = useState(false)

    useEffect(() => {

        const didOnboard = async () => {
            await axios.post(`${process.env.REACT_APP_BACKEND_API}/stripe/chargesEnabled`, {
                email: window.localStorage.getItem("email")
            }).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }

        setHasOnboarded(didOnboard())

    }, [])

    const handleOnboard = () => {

    }

    const renderMintingForm = () => {
        if (hasOnboarded) {
            console.log("Render Form")
        } else {
            console.log("Render Onboard Message")
        }
    }

    return (
        <>
            <button onClick={handleOnboard} className="me-btn">Onboard</button>
        </>
    );
}

export default NFTMinting;