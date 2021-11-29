import React from "react";
import { Modal, Form, Container, Row, Col } from 'react-bootstrap';
import './css/Login.css'

const Login = (props) => {

    const renderModalContent = () => {
        if (props.openRegister) {
            if (props.openSuccess) {
                return (
                    <>
                        <br />
                        <br />
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col md="auto">You have been verified successfully!</Col>
                            </Row>
                            <br />
                            <br />
                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <button
                                        className="me-btn inner-text"
                                        type="submit"
                                        onClick={props.handleBackToLogin}
                                    >
                                        Login Now
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </>
                );
            } else if (props.openVerify) {
                return (
                    <>
                        <Form>
                            <Form.Text className="text-muted" style={{ display: "block" }}>
                                A verification email has been sent to{" "}
                                {props.registerValues["email"]}.
                                <br />
                                Please enter below the 6-digit OTP sent to your email.
                            </Form.Text>
                            <br />
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    value={props.verifyValues["otp"]}
                                    onChange={props.handleVerifyChange("otp")}
                                    placeholder="Enter 6-digit OTP"
                                />
                            </Form.Group>
                            <div className="text-center">
                                {props.errors["otpError"] === "" ? (
                                    props.errors["verifyError"] === "" ? (
                                        <></>
                                    ) : (
                                        <div className="error-msg">
                                            {props.errors["verifyError"]}
                                        </div>
                                    )
                                ) : (
                                    <div className="error-msg">{props.errors["otpError"]}</div>
                                )}
                                <button
                                    className="me-btn inner-text"
                                    type="submit"
                                    onClick={props.handleVerify}
                                >
                                    Verify
                                </button>
                            </div>
                        </Form>
                    </>
                );
            } else {
                return (
                    <>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={props.registerValues['name']} onChange={props.handleRegisterChange('name')} placeholder="Enter your name" />
                                {props.errors['nameError'] === "" ? <></> : <div className='error-msg'>{props.errors['nameError']}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control value={props.registerValues['email']} onChange={props.handleRegisterChange('email')} type="email" placeholder="Enter your email" />
                                {props.errors['emailError'] === "" ? <></> : <div className='error-msg'>{props.errors['emailError']}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={props.registerValues['password']} onChange={props.handleRegisterChange('password')} type="password" placeholder="Enter Password" />
                                {props.errors['passwordError'] === "" ? <></> : <div className='error-msg'>{props.errors['passwordError']}</div>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control value={props.registerValues['confirm_password']} onChange={props.handleRegisterChange('confirm_password')} type="password" placeholder="Confirm Password" />
                                {props.errors['matchError'] === "" ? <></> : <div className='error-msg'>{props.errors['matchError']}</div>}
                            </Form.Group>
                            <button
                                className="me-btn inner-text"
                                type="submit"
                                style={{ float: 'right' }}
                                onClick={props.handleRegistration}
                            >
                                Register
                            </button>
                            <button
                                className="me-btn inner-text"
                                type="submit"
                                style={{ float: 'left' }}
                                onClick={props.handleBackToLogin}
                            >
                                Back
                            </button>
                            {
                                props.errors['serverError'] === ""
                                    ? (
                                        props.errors['existingError'] === ""
                                            ? <></>
                                            : <div className='error-msg'>{props.errors['existingError']}</div>
                                    )
                                    : <div className='error-msg'>{props.errors['serverError']}</div>
                            }
                        </Form>
                    </>
                )
            }
        } else {
            return (
                <>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={props.loginValues['email']} onChange={props.handleLoginChange('email')} placeholder="Enter email" />
                            {props.errors['emailError'] === "" ? <></> : <div className='error-msg'>{props.errors['emailError']}</div>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={props.loginValues['password']} onChange={props.handleLoginChange('password')} placeholder="Password" />
                            {props.errors['passwordError'] === "" ? <></> : <div className='error-msg'>{props.errors['passwordError']}</div>}
                        </Form.Group>
                        <button
                            className="me-btn inner-text"
                            type="submit"
                            onClick={props.handleLogin}
                        >
                            Login
                        </button>
                        {
                            props.errors['serverError'] === ""
                                ? (
                                    props.errors['authEmailError'] === ""
                                        ? (
                                            props.errors['authPasswordError'] === ""
                                                ? <></>
                                                : <span className='error-msg'>{props.errors['authPasswordError']}</span>
                                        )
                                        : <span className='error-msg'>{props.errors['authEmailError']}</span>
                                )
                                : <span className='error-msg'>{props.errors['serverError']}</span>
                        }
                        <Form.Text className="text-muted" style={{ display: 'block' }}>
                            Not a member? <a onClick={props.handleOpenRegister} href="#register">Register Here</a>
                        </Form.Text>
                    </Form>
                </>
            )

        }
    }

    return (
        <>
            <Modal
                show={props.loginModalOpen}
                onHide={props.handleLoginModalClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>{props.openRegister ? "REGISTER" : "LOGIN"}</Modal.Title>
                    <button className="float-right close-btn" onClick={props.handleLoginModalClose}>X</button>
                </Modal.Header>
                <Modal.Body>
                    {renderModalContent()}
                </Modal.Body>
            </Modal>

        </>
    )

}

export default Login;