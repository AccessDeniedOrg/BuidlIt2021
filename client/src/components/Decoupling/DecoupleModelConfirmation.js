import React, { useState } from "react";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Modal, Spinner, Form } from 'react-bootstrap';
import { keccak256 } from 'js-sha3';

const DecoupleModelConfirmation = (props) => {

    const [modalStage, setModalStage] = useState("confirm")
    const [externalWalletAddress, setExternalWalletAddress] = useState("")
    const [error, setError] = useState("")

    const executeDecoupling = async () => {
        setModalStage("decoupling")
        await axios.post(`${process.env.REACT_APP_BACKEND_API}/transfer-externally/decoupleNFT`, {
            role: props.role,
            IPFShash: props.selectedNft.IPFShash,
            walletAddressExternal: externalWalletAddress,
            address: window.localStorage.getItem("walletaddress")
        }).then((res) => {
            console.log(res)
            if (props.role === "artist") {
                window.location.href = res.data
            } else {
                if (res.data.msg === "Success") {
                    setModalStage("decouplingSuccess")
                } else {
                    setModalStage("decouplingFailed")
                }
            }
        }).catch((err) => {
            console.log(err.response.data)
            setModalStage("decouplingFailed")
        })

    }


    const handleCloseDecoupleConfirmation = () => {
        setExternalWalletAddress("")
        setError("")
        setModalStage("confirm")
        props.handleCloseDecoupleConfirmation()
    }

    const isAddress = (address) => {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            return true;
        } else {
            return isChecksumAddress(address);
        }
    };

    const isChecksumAddress = (address) => {
        address = address.replace('0x', '');
        var addressHash = keccak256(address.toLowerCase());
        for (var i = 0; i < 40; i++) {
            if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                return false;
            }
        }
        return true;
    };

    const handleGoToWarning = () => {
        if (isAddress(externalWalletAddress)) {
            setModalStage("warning")
        } else {
            setError("Invalid Ethereum Address")
        }
    }

    const handleGoToNFTCollection = (e) => {
        e.preventDefault()
        window.location.href = "/client/profile"
    }

    const handleGoToOpensea = (e) => {
        e.preventDefault()
        window.open(`https://testnets.opensea.io/assets/mumbai/${process.env.REACT_APP_CONTRACT_ADDRESS}/${props.selectedNft.tokenId}`, '_blank')
    }

    const renderModalContent = () => {

        if (modalStage === "confirm") {
            console.log(props.selectedNft)
            return (
                <>
                    <div className="container">
                        <p>This option completely decouples '<em>{`${props.selectedNft.artName}`}</em>' from GrantéStudio.</p>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    value={externalWalletAddress}
                                    onChange={(e) => setExternalWalletAddress(e.target.value)}
                                    placeholder="Enter External Address"
                                />
                                <div className="error-msg">{error}</div>
                            </Form.Group>
                        </Form>
                        <p>Please click on 'Proceed' to start decoupling your NFT from GrantéStudio.</p>
                        <button onClick={handleGoToWarning} className="me-btn" style={{ float: 'right' }}>
                            Proceed
                        </button>
                        <button onClick={handleCloseDecoupleConfirmation} className="me-btn" style={{ float: 'left' }}>
                            Cancel
                        </button>
                    </div>
                </>
            )

        }
        else if (modalStage === "warning") {
            return (
                <>
                    <div style={{ color: "#d19a04" }} className="container text-center">
                        <FontAwesomeIcon
                            style={{ fontSize: "28px", marginTop: "10px", marginBottom: "10px" }}
                            icon={faExclamationCircle}
                        />
                        <p>Warning!<br />Once you click "Go Ahead" your NFT will be deleted from GrantéStudio. This step cannot be reverted.</p>
                    </div>
                    <button onClick={executeDecoupling} className="me-btn" style={{ float: 'right' }}>
                        Go Ahead
                    </button>
                    <button onClick={handleCloseDecoupleConfirmation} className="me-btn" style={{ float: 'left' }}>
                        Cancel
                    </button>
                </>
            )
        }
        else {
            let message;
            if (modalStage === "decoupling") {
                message = "Decoupling Your NFT..."
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
                                            <FontAwesomeIcon
                                                style={{ fontSize: "28px", marginTop: "10px", marginBottom: "10px" }}
                                                icon={faTimesCircle}
                                            />
                                            <p>{message}</p>
                                        </div>
                                        <button onClick={handleCloseDecoupleConfirmation} className="me-btn">
                                            Go Back To NFT Collection
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
                                        <button onClick={handleGoToNFTCollection} style={{ float: "left" }} className="me-btn">
                                            Go To Profile
                                        </button>
                                        <button onClick={handleGoToOpensea} style={{ float: "right" }} className="me-btn">
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