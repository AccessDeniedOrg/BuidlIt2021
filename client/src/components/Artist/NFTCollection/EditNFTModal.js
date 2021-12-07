import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Spinner } from "react-bootstrap";

const EditNFTModal = (props) => {

    const [errors, setErrors] = useState({})
    const [nftData, setNftData] = useState({
        artName: "",
        price: ""
    })

    // Handler to handle state change
    let handlerObj;
    let errorHandlerObj;

    const nftDataHandler = (selectedInput) => (e) => {
        handlerObj = { ...nftData };
        handlerObj[selectedInput] = e.target.value;
        setNftData({ ...handlerObj });
        console.log(nftData);
    };

    const handleEditNFT = async (e) => {
        e.preventDefault()
        console.log(props.selectedNft)
        setErrors({})
        const validAmount = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/
        errorHandlerObj = {
            amountError: "",
            nameError: ""
        }
        if (!validAmount.test(nftData.price)) {
            errorHandlerObj['amountError'] = "Invalid Amount"
        } else {
            if (parseFloat(nftData.price) <= 20.00) {
                errorHandlerObj['amountError'] = "Amount should be more than $20.00"
            }
            else if (parseFloat(nftData.price) >= 400.00) {
                errorHandlerObj['amountError'] = "Amount should be less than $400.00"
            }
        }
        if (nftData.artName === "") {
            errorHandlerObj['nameError'] = "This field should not be empty."
        }
        if (
            errorHandlerObj['nameError'] === "" &&
            errorHandlerObj['amountError'] === ""
        ) {
            await axios
                .post(`${process.env.REACT_APP_BACKEND_API}/artist/editArtPrice`, {
                    IPFShash: props.selectedNft.IPFShash,
                    price: nftData.price,
                    artName: nftData.artName
                })
                .then((res) => {
                    console.log(res.data.msg);
                    handleCloseEditConfirmation()
                })
                .catch((error) => {
                    console.log(error.response.message);
                });
        } else {
            setErrors({ ...errorHandlerObj });
            console.log("Minting Failed");
            console.log(errorHandlerObj);
        }

    };

    const handleCloseEditConfirmation = () => {
        setErrors({})
        setNftData({
            artName: "",
            price: ""
        })
        props.handleCloseEditConfirmation()
    }

    return (
        <>
            <Modal
                show={props.openEditConfirmation}
                onHide={handleCloseEditConfirmation}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={{ backgroundColor: "#000000" }}>
                    <Modal.Title className="login-title" style={{ color: "#ffded1" }} >Edit NFT Details</Modal.Title>

                    <button style={{ backgroundColor: "#000000", color: "#ffded1", float: "right" }} className="float-right close-btn" onClick={handleCloseEditConfirmation}>X</button>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Art Name:</Form.Label>
                            <Form.Control
                                value={nftData["artName"]}
                                onChange={nftDataHandler("artName")}
                                placeholder="Enter New Art Name"
                            />
                            {
                                errors['nameError'] === "" ? <></> : <div style={{ color: "red" }}>{errors['nameError']}</div>
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Product Price:</Form.Label>
                            <Form.Control
                                value={nftData["price"]}
                                onChange={nftDataHandler("price")}
                                placeholder="Enter New Art Price"
                                type="number"
                            />
                            {
                                errors['amountError'] === "" ? <></> : <div style={{ color: "red" }}>{errors['amountError']}</div>
                            }
                        </Form.Group>
                        <div className="text-center">
                            <button
                                className="me-btn"
                                style={{ backgroundColor: "#facf69" }}
                                onClick={handleEditNFT}
                            >
                                Confirm Edit
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditNFTModal;