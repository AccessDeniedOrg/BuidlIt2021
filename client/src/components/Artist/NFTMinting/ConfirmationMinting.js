import React, { useState } from "react";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Modal, Spinner } from 'react-bootstrap';

const ConfirmationMinting = (props) => {

    const [modalStage, setModalStage] = useState("confirm")
    const [errorMessage, setErrorMessage] = useState("")

    const executeMintng = async () => {
        setModalStage("pinning")
        const form_data = new FormData()
        form_data.append('file', props.file)
        const request = {
            method: 'post',
            url: process.env.REACT_APP_PINATA_END_POINT,
            maxContentLength: 'Infinity',
            headers: {
                pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
                'Content-Type': `multipart/form-data; boundary=${form_data._boundary}`,
            },
            data: form_data,
        };
        await axios(request).then(async (res) => {
            setModalStage("storing")
            let hash = res.data.IpfsHash
            await axios.post(`${process.env.REACT_APP_BACKEND_API}/artist/addArt`, {
                artName: props.artName,
                email: window.localStorage.getItem("email"),
                price: props.price,
                IPFShash: hash,
                artistName: window.localStorage.getItem("username"),
                artistWalletAddress: window.localStorage.getItem("walletaddress")
            }).then((res) => {
                console.log(res.data.msg)
                if (res.data.msg === "success") {
                    setModalStage("mintingSuccess")
                } else {
                    setErrorMessage(res.data.msg)
                    setModalStage("mintingFailed")
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

        }).catch((err) => {
            console.log(err.response.data)
        })

    }


    const handleCloseMintingConfirmation = () => {
        setModalStage("confirm")
        props.handleCloseMintingConfirmation()
    }

    const handleGoToNFTCollection = (e) => {
        handleCloseMintingConfirmation()
        window.location.href = `/artist/nftcollection`
    }

    const renderModalContent = () => {
        if (modalStage === "confirm") {
            return (
                <>
                    <p>Please click on 'Confirm Minting' to start minting your NFT.</p>
                    <button onClick={executeMintng} className="me-btn" style={{ float: 'left' }}>
                        Confirm Minting
                    </button>
                    <button onClick={handleCloseMintingConfirmation} className="me-btn" style={{ float: 'right' }}>
                        Cancel
                    </button>
                </>
            )

        } else {
            let message;
            if (modalStage === "pinning") {
                message = "Pinning to IPFS..."
            }
            // else if (modalStage === "checkingStatus") {
            //     message = "..."
            // }
            else if (modalStage === "storing") {
                message = "Adding NFT to your collection..."
            }
            else if (modalStage === "mintingSuccess") {
                message = "Minting Successful!"
            } else {
                message = "Minting failed."
            }

            if (modalStage !== "mintingFailed" && modalStage !== "mintingSuccess") {
                return (
                    <>
                        <div className="container text-center">
                            <Spinner style={{ margin: "20px 0", color: "#ffded1" }} animation="border" />
                            <div>
                                <p>{message}</p>
                            </div>
                            <div>
                                <p><em>**Do <b>NOT</b> click Back or refresh the page as it may lead to loosing your NFT.</em></p>
                            </div>
                        </div>
                    </>
                )
            } else {
                return (
                    <>
                        <div className="container text-center">
                            {modalStage === "mintingFailed"
                                ? (
                                    <>
                                        <div style={{ color: "red" }}>
                                            <FontAwesomeIcon
                                                style={{ fontSize: "28px", marginTop: "10px", marginBottom: "10px" }}
                                                icon={faTimesCircle}
                                            />
                                            <p>{message}<br />{errorMessage}</p>
                                        </div>
                                        <button onClick={handleCloseMintingConfirmation} className="me-btn">
                                            Go Back To Minting
                                        </button>
                                    </>
                                )
                                : (
                                    <>
                                        <div style={{ color: "green" }}>
                                            <FontAwesomeIcon
                                                style={{ fontSize: "28px", marginTop: "10px", marginBottom: "10px" }}
                                                icon={faCheckCircle}
                                            />
                                            <p>{message}</p>
                                            <br />
                                        </div>
                                        <button onClick={handleGoToNFTCollection} className="me-btn">
                                            Go To Your NFT Collection
                                        </button>
                                    </>
                                )}

                        </div>
                    </>
                )
            }

        }
    }

    return (
        <>
            <Modal
                show={props.openMintingConfirmation}
                onHide={handleCloseMintingConfirmation}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={{ backgroundColor: "#000000" }}>
                    <Modal.Title className="login-title" style={{ color: "#ffded1" }}>Minting Confirmation</Modal.Title>
                    <button style={{ backgroundColor: "#000000", color: "#ffded1", float: "right" }} className="float-right close-btn" onClick={handleCloseMintingConfirmation}>X</button>
                </Modal.Header>
                <Modal.Body>
                    {renderModalContent()}
                </Modal.Body>
            </Modal>

        </>
    )

}

export default ConfirmationMinting;