import React from "react";
import { Modal } from 'react-bootstrap';
import FormContent from "./FormContent";
import './css/Login.css'

const Login = (props) => {

    return (
        <>
            <Modal
                show={props.loginModalOpen}
                onHide={props.handleLoginModalClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={{ backgroundColor: "#000000" }}>
                    <Modal.Title className="login-title" style={{ color: "#ffded1" }} >{props.openRegister ? "REGISTER" : "Login"}</Modal.Title>

                    <button style={{ backgroundColor: "#000000", color: "#ffded1", float: "right" }} className="float-right close-btn" onClick={props.handleLoginModalClose}>X</button>
                </Modal.Header>
                <Modal.Body>
                    <FormContent />
                </Modal.Body>
            </Modal>

        </>
    )

}

export default Login;