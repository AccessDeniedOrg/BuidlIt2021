import React, { useState } from "react";
import axios from "axios";
import { Modal, Form } from "react-bootstrap";

const EditNFTModal = (props) => {

    const [errors, setErrors] = useState({})
    const [nftPrice, setNftPrice] = useState("")

    // Handler to handle state change
    let errorHandlerObj;

    const handleEditNFT = async (e) => {
        e.preventDefault()
        console.log(props.selectedNft)
        setErrors({})
        const validAmount = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/
        errorHandlerObj = {
            amountError: "",
        }
        if (!validAmount.test(nftPrice)) {
            errorHandlerObj['amountError'] = "Invalid Amount"
        } else {
            if (parseFloat(nftPrice) <= 20.00) {
                errorHandlerObj['amountError'] = "Amount should be more than $20.00"
            }
            else if (parseFloat(nftPrice) >= 400.00) {
                errorHandlerObj['amountError'] = "Amount should be less than $400.00"
            }
        }
        if (
            errorHandlerObj['amountError'] === ""
        ) {
            await axios
                .post(`${process.env.REACT_APP_BACKEND_API}/artist/editArtPrice`, {
                    IPFShash: props.selectedNft.IPFShash,
                    price: nftPrice,
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
            console.log("Edit Failed");
            console.log(errorHandlerObj);
        }

    };

    const handleCloseEditConfirmation = () => {
        setErrors({})
        setNftPrice("")
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
                            <Form.Label>Product Price:</Form.Label>
                            <Form.Control
                                value={nftPrice}
                                onChange={(e) => { setNftPrice(e.target.value) }}
                                placeholder="Enter New Price"
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