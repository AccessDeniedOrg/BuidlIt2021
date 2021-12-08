import React, { useState } from "react";
import axios from 'axios'
import { Modal, Spinner } from 'react-bootstrap';

const DecoupleModelConfirmation = (props) => {

    const [modalStage, setModalStage] = useState("confirm")
    const [errorMessage, setErrorMessage] = useState("")

    const executeDecoupling = async () => {
        setModalStage("decoupling")
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


    const handleCloseDecoupleConfirmation = () => {
        setModalStage("warning")
        props.handleCloseDecoupleConfirmation()
    }

    const handleGoToNFTCollection = (e) => {
        handleCloseDecoupleConfirmation()
        window.location.href = `/artist/nftcollection`
    }

    const renderModalContent = () => {

        if (modalStage === "confirm") {
            return (
                <>
                    <p>Please click on 'Confirm Decouple' to start decoupling your NFT from GrantéStudio.</p>
                    <button onClick={executeDecoupling} className="me-btn" style={{ float: 'left' }}>
                        Confirm Minting
                    </button>
                    <button onClick={handleCloseDecoupleConfirmation} className="me-btn" style={{ float: 'right' }}>
                        Cancel
                    </button>
                </>
            )

        }
        else if (modalStage === "warning") {
            return (
                <>
                    <p>Warning!<br />Once you click "Go Ahead" your NFT will be deleted from GrantéStudio</p>
                    <button onClick={executeDecoupling} className="me-btn" style={{ float: 'left' }}>
                        Confirm Minting
                    </button>
                    <button onClick={handleCloseDecoupleConfirmation} className="me-btn" style={{ float: 'right' }}>
                        Cancel
                    </button>
                </>
            )
        }
        else {
            let message;
            if (modalStage === "decoupling") {
                message = "Pinning to IPFS..."
            }
            else if (modalStage === "decouplingSuccess") {
                message = "Your NFT has been decoupled successfully!"
            } else {
                message = "Decoupling failed."
            }

            if (modalStage !== "decouplingFailed" && modalStage !== "decouplingSuccess") {
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
                            {modalStage === "decouplingFailed"
                                ? (
                                    <>
                                        <div style={{ color: "red" }}>
                                            <p>{message}<br />{errorMessage}</p>
                                        </div>
                                        <button onClick={handleCloseDecoupleConfirmation} className="me-btn">
                                            Go Back To NFT Collection
                                        </button>
                                    </>
                                )
                                : (
                                    <>
                                        <div style={{ color: "green" }}>
                                            <p>{message}</p>
                                            <br />
                                        </div>
                                        <button onClick={handleGoToOpensea} className="me-btn">
                                            View Your Decoupled NFT on OpenSea
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
                show={props.openDecoupleConfirmation}
                onHide={handleCloseDecoupleConfirmation}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={{ backgroundColor: "#000000" }}>
                    <Modal.Title className="login-title" style={{ color: "#ffded1" }}>Decouple Confirmation</Modal.Title>
                    <button style={{ backgroundColor: "#000000", color: "#ffded1", float: "right" }} className="float-right close-btn" onClick={handleCloseDecoupleConfirmation}>X</button>
                </Modal.Header>
                <Modal.Body>
                    {renderModalContent()}
                </Modal.Body>
            </Modal>

        </>
    )

}

export default DecoupleModelConfirmation;