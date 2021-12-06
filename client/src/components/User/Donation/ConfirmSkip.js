import React from "react";
import { Modal } from 'react-bootstrap';

const ConfirmSkip = (props) => {

    return (
        <>
            <Modal
                show={props.openSkipConfirmation}
                onHide={props.handleCloseSkipConfirmation}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={{ backgroundColor: "#000000" }}>
                    <Modal.Title className="login-title" style={{ color: "#ffded1" }}>Minting Confirmation</Modal.Title>
                    <button style={{ backgroundColor: "#000000", color: "#ffded1", float: "right" }} className="float-right close-btn" onClick={props.handleCloseSkipConfirmation}>X</button>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>
                        Are sure you want to skip selection of NFT?<br />
                        If you skip this step a part of your donation will be given to charities who have not reached their goal at the end of the month.<br />
                        Please click on "Confirm Skip" if you wish to skip selection.
                    </p>
                    <button className="me-btn" onClick={props.handleCloseSkipConfirmation}>Cancel</button>
                    <button className="me-btn" style={{ marginLeft: "10px" }} onClick={props.handleConfirmSkip}>Confirm Skip</button>
                </Modal.Body>
            </Modal>

        </>
    )

}

export default ConfirmSkip;