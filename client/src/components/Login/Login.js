import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import FormContent from "./FormContent";
import './css/Login.css'

const Login = (props) => {

    const [title, setTitle] = useState("Login")

    const handleTitleChange = (title) => {
        setTitle(title)
    }

    return (
        <>
            <Modal
                show={props.loginModalOpen}
                onHide={props.handleLoginModalClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={{ backgroundColor: "#000000" }}>
                    <Modal.Title className="login-title" style={{ color: "#ffded1" }} >{title}</Modal.Title>

                    <button style={{ backgroundColor: "#000000", color: "#ffded1", float: "right" }} className="float-right close-btn" onClick={props.handleLoginModalClose}>X</button>
                </Modal.Header>
                <Modal.Body>
                    <FormContent
                        role="user"
                        handleLoginModalClose={props.handleLoginModalClose}
                        handleTitleChange={handleTitleChange}
                    />
                </Modal.Body>
            </Modal>

        </>
    )

}

export default Login;