import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { sha256 } from "js-sha256";

const FormContent = (props) => {
    const errorObj = {
        nameError: "Name should be atleast 5 characters long", //Below Name in Register
        emailError: "Invalid Email - Please use format abc@example.com", //Below Email in Register
        passwordError: "Password should be atleast 8 characters long", //Below Password in Register
        matchError: "Passwords do not match", //Below Confirm Password in Register
        otpError: "Your OTP should be a 6-digit number", //Below OTP
    };

    const [openRegister, setOpenRegister] = useState(false);
    const [openVerify, setOpenVerify] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [loginValues, setLoginValues] = useState({
        email: "",
        password: "",
    });
    const [registerValues, setRegisterValues] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [verifyValues, setVerifyValues] = useState({
        otp: "",
    });
    const [collectRes, setCollectRes] = useState({
        name: "",
        email: "",
        password: "",
        hash: "",
    });

    let handlerObj;
    let errorHandlerObj = {
        nameError: "",
        emailError: "",
        passwordError: "",
        matchError: "",
        authError: "",
        otpError: "",
    };

    useEffect(() => { }, []);

    const clearInputs = () => {
        setLoginValues({
            email: "",
            password: "",
        });
        setRegisterValues({
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        });
        setVerifyValues({
            otp: "",
        });
        setErrors({});
    };

    //Handling Modal. Always open on Login Form
    const handleLoginModalClose = () => {
        props.handleLoginModalClose();
        setOpenRegister(false);
        setOpenVerify(false);
        setOpenSuccess(false);
        clearInputs();
    };

    const handleOpenRegister = () => {
        setErrors({});
        let title;
        if (props.role === "user") {
            title = "Register";
        } else {
            title = "Register For Your Own Granté Studio";
        }
        props.handleTitleChange(title);
        setOpenRegister(true);
    };

    const handleBackToLogin = (e) => {
        e.preventDefault();
        setErrors({});
        clearInputs();
        let title;
        if (props.role === "user") {
            title = "Login";
        } else {
            title = "Login To Your Granté Studio";
        }
        props.handleTitleChange(title);
        setOpenRegister(false);
        setOpenVerify(false);
        setOpenSuccess(false);
    };

    //Handling Form Submission
    const handleRegistration = (e) => {
        e.preventDefault();
        setErrors({});
        const validEmail =
            /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
        errorHandlerObj = {
            nameError: "",
            emailError: "",
            passwordError: "",
            matchError: "",
            existingError: "",
            serverError: "",
        };

        if (registerValues["name"].length < 5) {
            errorHandlerObj["nameError"] = errorObj["nameError"];
        }
        if (!validEmail.test(registerValues["email"])) {
            errorHandlerObj["emailError"] = errorObj["emailError"];
        }
        if (registerValues["password"].length < 8) {
            errorHandlerObj["passwordError"] = errorObj["passwordError"];
        }
        if (registerValues["password"] !== registerValues["confirm_password"]) {
            errorHandlerObj["matchError"] = errorObj["matchError"];
        }
        if (
            errorHandlerObj["nameError"] === "" &&
            errorHandlerObj["emailError"] === "" &&
            errorHandlerObj["passwordError"] === "" &&
            errorHandlerObj["matchError"] === ""
        ) {
            //Hits '/register' endpoint of Backend API
            //Check for existing email and server error --> Registration Failed

            const hashedPassword = sha256(registerValues["password"]);

            axios
                .post(`${process.env.REACT_APP_BACKEND_API}/auth/register`, {
                    email: `${registerValues["email"]}`,
                    name: `${registerValues["name"]}`,
                    password: `${hashedPassword}`,
                    role: `${props.role}`,
                })
                .then((res) => {
                    if (res.data.msg === "OTP sent") {
                        console.log(res.data.otp); //remove afterwards
                        setErrors({});
                        clearInputs();
                        setCollectRes({
                            name: res.data.name,
                            email: res.data.email,
                            password: res.data.password,
                            hash: res.data.hash,
                        });
                        setOpenVerify(true);
                    } else {
                        errorHandlerObj["existingError"] = `${res.data.msg}`;
                        setErrors({ ...errorHandlerObj });
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        } else {
            setErrors({ ...errorHandlerObj });
            console.log("Registration Failed");
            console.log(errorHandlerObj);
        }
    };

    //Handle Email Verification
    const handleVerify = (e) => {
        e.preventDefault();
        errorHandlerObj = {
            otpError: "",
            verifyError: "",
        };
        const validOTP = /^\d{6}$/;
        if (!validOTP.test(verifyValues["otp"])) {
            errorHandlerObj["otpError"] = errorObj["otpError"];
        }
        if (errorHandlerObj["otpError"] === "") {
            axios
                .post(`${process.env.REACT_APP_BACKEND_API}/auth/register-verified`, {
                    email: `${collectRes["email"]}`,
                    name: `${collectRes["name"]}`,
                    password: `${collectRes["password"]}`,
                    hash: `${collectRes["hash"]}`,
                    otp: `${verifyValues["otp"]}`,
                    role: `${props.role}`,
                })
                .then((res) => {
                    if (res.data.msg === "Verified Success") {
                        setOpenSuccess(true);
                        clearInputs();
                        setErrors({});
                    } else {
                        errorHandlerObj["verifyError"] = `${res.data.msg}`;
                        setErrors({ ...errorHandlerObj });
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        } else {
            setErrors({ ...errorHandlerObj });
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setErrors({});
        const validEmail =
            /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/;
        errorHandlerObj = {
            emailError: "",
            passwordError: "",
            authError: "",
        };

        if (!validEmail.test(loginValues["email"])) {
            errorHandlerObj["emailError"] = errorObj["emailError"];
        }
        if (loginValues["password"].length < 8) {
            errorHandlerObj["passwordError"] = errorObj["passwordError"];
        }

        if (
            errorHandlerObj["emailError"] === "" &&
            errorHandlerObj["passwordError"] === ""
        ) {
            const hashedPassword = sha256(loginValues["password"]);
            axios
                .post(`${process.env.REACT_APP_BACKEND_API}/auth/login`, {
                    email: `${loginValues["email"]}`,
                    password: `${hashedPassword}`,
                    role: `${props.role}`,
                })
                .then((res) => {
                    console.log(res.data)
                    if (res.data.msg === "Logged In") {
                        setErrors({});
                        window.localStorage.setItem("walletaddress", res.data.walletAddress)
                        window.localStorage.setItem("email", res.data.email);
                        window.localStorage.setItem("username", res.data.name);
                        window.localStorage.setItem("role", res.data.role);
                        if (res.data.role === "user") {
                            handleLoginModalClose();
                            window.location.href = "/client/profile";
                        } else {
                            window.location.href = '/artist';
                        }
                    } else {
                        errorHandlerObj["authError"] = `${res.data.msg}`;
                        setErrors({ ...errorHandlerObj });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setErrors({ ...errorHandlerObj });
            console.log("Login Failed");
            console.log(errorHandlerObj);
        }
    };

    //Change Handlers
    const handleLoginChange = (selectedInput) => (e) => {
        handlerObj = { ...loginValues };
        handlerObj[selectedInput] = e.target.value;
        setLoginValues({ ...handlerObj });
    };

    const handleVerifyChange = (selectedInput) => (e) => {
        handlerObj = { ...verifyValues };
        handlerObj[selectedInput] = e.target.value;
        setVerifyValues({ ...handlerObj });
    };

    const handleRegisterChange = (selectedInput) => (e) => {
        handlerObj = { ...registerValues };
        handlerObj[selectedInput] = e.target.value;
        setRegisterValues({ ...handlerObj });
    };

    const renderModalContent = () => {
        if (openRegister) {
            if (openSuccess) {
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
                                        onClick={handleBackToLogin}
                                    >
                                        Login Now
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </>
                );
            } else if (openVerify) {
                return (
                    <>
                        <Form>
                            <Form.Text className="text-muted" style={{ display: "block" }}>
                                A verification email has been sent to {registerValues["email"]}.
                                <br />
                                Please enter below the 6-digit OTP sent to your email.
                            </Form.Text>
                            <br />
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    value={verifyValues["otp"]}
                                    onChange={handleVerifyChange("otp")}
                                    placeholder="Enter 6-digit OTP"
                                />
                            </Form.Group>
                            <div className="text-center">
                                {errors["otpError"] === "" ? (
                                    errors["verifyError"] === "" ? (
                                        <></>
                                    ) : (
                                        <div className="error-msg">{errors["verifyError"]}</div>
                                    )
                                ) : (
                                    <div className="error-msg">{errors["otpError"]}</div>
                                )}
                                <button
                                    className="me-btn inner-text"
                                    type="submit"
                                    onClick={handleVerify}
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
                                <Form.Control
                                    name="name"
                                    value={registerValues["name"]}
                                    onChange={handleRegisterChange("name")}
                                    placeholder="Enter your name"
                                />
                                {errors["nameError"] === "" ? (
                                    <></>
                                ) : (
                                    <div className="error-msg">{errors["nameError"]}</div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    name="email"
                                    value={registerValues["email"]}
                                    onChange={handleRegisterChange("email")}
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                {errors["emailError"] === "" ? (
                                    <></>
                                ) : (
                                    <div className="error-msg">{errors["emailError"]}</div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    value={registerValues["password"]}
                                    onChange={handleRegisterChange("password")}
                                    type="password"
                                    placeholder="Enter Password"
                                />
                                {errors["passwordError"] === "" ? (
                                    <></>
                                ) : (
                                    <div className="error-msg">{errors["passwordError"]}</div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    value={registerValues["confirm_password"]}
                                    onChange={handleRegisterChange("confirm_password")}
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                                {errors["matchError"] === "" ? (
                                    <></>
                                ) : (
                                    <div className="error-msg">{errors["matchError"]}</div>
                                )}
                            </Form.Group>
                            <button
                                className="me-btn inner-text"
                                type="submit"
                                style={{ float: "right" }}
                                onClick={handleRegistration}
                            >
                                Register
                            </button>
                            <button
                                className="me-btn inner-text"
                                type="submit"
                                style={{ float: "left" }}
                                onClick={handleBackToLogin}
                            >
                                Back
                            </button>
                            {errors["existingError"] === "" ? (
                                <></>
                            ) : (
                                <div className="error-msg add-error-style">
                                    {errors["existingError"]}
                                </div>
                            )}
                        </Form>
                    </>
                );
            }
        } else {
            return (
                <>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={loginValues["email"]}
                                onChange={handleLoginChange("email")}
                                placeholder="Enter email"
                            />
                            {errors["emailError"] === "" ? (
                                <></>
                            ) : (
                                <div className="error-msg">{errors["emailError"]}</div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={loginValues["password"]}
                                onChange={handleLoginChange("password")}
                                placeholder="Password"
                            />
                            {errors["passwordError"] === "" ? (
                                <></>
                            ) : (
                                <div className="error-msg">{errors["passwordError"]}</div>
                            )}
                        </Form.Group>
                        <div className="text-center">
                            <button
                                className="me-btn inner-text"
                                type="submit"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                            {errors["authError"] === "" ? (
                                <></>
                            ) : (
                                <span className="error-msg">{errors["authError"]}</span>
                            )}
                            <Form.Text className="text-muted" style={{ display: "block" }}>
                                Not a member?{" "}
                                <a
                                    style={{ cursor: "pointer" }}
                                    onClick={handleOpenRegister}
                                    href="#register"
                                >
                                    Register Here
                                </a>
                            </Form.Text>
                        </div>
                    </Form>
                </>
            );
        }
    };
    return <>{renderModalContent()}</>;
};

export default FormContent;
