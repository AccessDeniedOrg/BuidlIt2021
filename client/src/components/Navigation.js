import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Login from "./Login/Login";
import { sha256 } from "js-sha256";


const Navigation = (props) => {

    const errorObj = {
        'nameError': 'Name should be atleast 5 characters long',//Below Name in Register
        'emailError': 'Invalid Email - Please use format abc@example.com', //Below Email in Register
        'passwordError': 'Password should be atleast 8 characters long', //Below Password in Register
        'matchError': 'Passwords do not match', //Below Confirm Password in Register
        'otpError': "Your OTP should be a 6-digit number", //Below OTP
    }

    const [openRegister, setOpenRegister] = useState(false)
    const [openVerify, setOpenVerify] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errors, setErrors] = useState({})
    const [hasLoggedIn, setHasLoggedIn] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const [loginValues, setLoginValues] = useState({
        'email': "",
        'password': ""
    })
    const [registerValues, setRegisterValues] = useState({
        'name': "",
        'email': "",
        'password': "",
        'confirm_password': ""
    })
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

    useEffect(() => {
        if (window.localStorage.getItem("email")) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }

        if (authenticated) {
            setHasLoggedIn(true);
        } else {
            setHasLoggedIn(false);
        }
    }, [authenticated]);

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
        props.handleLoginModalClose()
        setOpenRegister(false)
        setOpenVerify(false);
        setOpenSuccess(false);
        clearInputs();
    }

    const handleOpenRegister = () => {
        setErrors({});
        setOpenRegister(true);
    }

    const handleBackToLogin = (e) => {
        e.preventDefault();
        setErrors({});
        clearInputs();
        setOpenRegister(false);
        setOpenVerify(false);
        setOpenSuccess(false);
    }

    //Handling Form Submission 
    const handleRegistration = (e) => {
        e.preventDefault()
        setErrors({})
        const validEmail = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/
        errorHandlerObj = {
            'nameError': "",
            'emailError': "",
            'passwordError': "",
            'matchError': "",
            'existingError': "",
            'serverError': ""
        }

        if (registerValues['name'].length < 5) {
            errorHandlerObj['nameError'] = errorObj['nameError']
        }
        if (!validEmail.test(registerValues['email'])) {
            errorHandlerObj['emailError'] = errorObj['emailError']
        }
        if (registerValues['password'].length < 8) {
            errorHandlerObj['passwordError'] = errorObj['passwordError']
        }
        if (registerValues['password'] !== registerValues['confirm_password']) {
            errorHandlerObj['matchError'] = errorObj['matchError']
        }
        if (
            errorHandlerObj['nameError'] === "" &&
            errorHandlerObj['emailError'] === "" &&
            errorHandlerObj['passwordError'] === "" &&
            errorHandlerObj['matchError'] === ""
        ) {
            //Hits '/register' endpoint of Backend API
            //Check for existing email and server error --> Registration Failed

            const hashedPassword = sha256(registerValues["password"]);

            axios
                .post(`${process.env.REACT_APP_BACKEND_API}/auth/register`, {
                    email: `${registerValues["email"]}`,
                    name: `${registerValues["name"]}`,
                    password: `${hashedPassword}`,
                })
                .then((res) => {
                    if (res.data.msg === "Registered") {
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
            setErrors({ ...errorHandlerObj })
            console.log("Registration Failed")
            console.log(errorHandlerObj)
        }
    }

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
        e.preventDefault()
        setErrors()
        const validEmail = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/
        errorHandlerObj = {
            'emailError': "",
            'passwordError': "",
            'authError': "",
        }

        if (!validEmail.test(loginValues['email'])) {
            errorHandlerObj['emailError'] = errorObj['emailError']
        }
        if (loginValues['password'].length < 8) {
            errorHandlerObj['passwordError'] = errorObj['passwordError']
        }

        if (
            errorHandlerObj['emailError'] === "" &&
            errorHandlerObj['passwordError'] === ""
        ) {
            //Hits '/login' endpoint of Backend API
            //Check for non-existing email, wrong password and server error --> Registration Failed

            const hashedPassword = sha256(loginValues["password"]);
            axios
                .post(`${process.env.REACT_APP_BACKEND_API}/auth/login`, {
                    email: `${loginValues["email"]}`,
                    password: `${hashedPassword}`,
                })
                .then((res) => {
                    if (res.data.msg === "Logged In") {
                        setHasLoggedIn(true);
                        setErrors({});
                        window.localStorage.setItem("email", res.data.email);
                        window.localStorage.setItem("username", res.data.name);
                        handleLoginModalClose();
                        window.location.href = '/profile';
                    } else {
                        errorHandlerObj["authError"] = `${res.data.msg}`;
                        setErrors({ ...errorHandlerObj });
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
                });


        } else {
            setErrors({ ...errorHandlerObj })
            console.log("Login Failed")
            console.log(errorHandlerObj)
        }

    }

    const handleLogout = () => {
        window.localStorage.removeItem("email")
        window.localStorage.removeItem("username")
        window.location.href = '/';
        setHasLoggedIn(false)
    }

    //Change Handlers
    const handleLoginChange = (selectedInput) => (e) => {
        handlerObj = { ...loginValues }
        handlerObj[selectedInput] = e.target.value
        setLoginValues({ ...handlerObj })
    }

    const handleVerifyChange = (selectedInput) => (e) => {
        handlerObj = { ...verifyValues };
        handlerObj[selectedInput] = e.target.value;
        setVerifyValues({ ...handlerObj });
    };

    const handleRegisterChange = (selectedInput) => (e) => {
        handlerObj = { ...registerValues }
        handlerObj[selectedInput] = e.target.value
        setRegisterValues({ ...handlerObj })
    }

    //Change Login/Register to My Account
    const renderNavContent = () => {
        if (hasLoggedIn) {
            return (
                <Nav.Item as="li">
                    <NavDropdown title="My Account" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout} >Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav.Item>
            )
        } else {
            return (
                <Nav.Item as="li">
                    <Nav.Link onClick={props.handleLoginModalOpen} >Login/Register</Nav.Link>
                </Nav.Item>
            )
        }
    }

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">THE FUNDING NETWORK</Navbar.Brand>
                    <Nav className="justify-content-end" as="ul">
                        <Nav.Item as="li">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link href="/donate">Donate</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link href="/shop">Shop</Nav.Link>
                        </Nav.Item>
                        {renderNavContent()}
                    </Nav>
                </Container>
            </Navbar>
            <Login
                handleLoginModalOpen={props.handleLoginModalOpen}
                handleLoginModalClose={handleLoginModalClose}
                handleOpenRegister={handleOpenRegister}
                handleBackToLogin={handleBackToLogin}
                handleLoginChange={handleLoginChange}
                handleVerifyChange={handleVerifyChange}
                openRegister={openRegister}
                errors={errors}
                loginValues={loginValues}
                openSuccess={openSuccess}
                verifyValues={verifyValues}
                handleRegisterChange={handleRegisterChange}
                registerValues={registerValues}
                handleRegistration={handleRegistration}
                handleLogin={handleLogin}
                loginModalOpen={props.loginModalOpen}
                handleVerify={handleVerify}
                openVerify={openVerify}
            />
        </>
    )
}

export default Navigation;