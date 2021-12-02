import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import "./Navigation.css"
import logo from "../../assets/images/logo_nobg_peach.png"


const Navigation = (props) => {

    const [hasLoggedIn, setHasLoggedIn] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)

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


    const handleLogout = () => {
        window.localStorage.removeItem("email")
        window.localStorage.removeItem("username")
        window.location.href = '/';
        setHasLoggedIn(false)
    }

    const handleUserLogin = () => {
        props.handleLogin("user")
    }

    const handleArtistLogin = () => {
        props.handleLogin("artist")
    }

    //Change Login/Register to My Account
    const renderNavContent = () => {
        if (hasLoggedIn) {
            return (
                <NavDropdown
                    title={<span className="nav-item-color">My Account</span>}
                    id="basic-nav-dropdown"
                    className="nav-item-color"
                    style={{ color: "white" }}
                >
                    <NavDropdown.Item
                        href="/profile"
                        className="nav-dropdown-item"
                    >
                        Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        onClick={handleLogout}
                        className="nav-dropdown-item"
                    >
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
            )
        } else {
            return (
                <>
                    <Nav.Link
                        onClick={handleUserLogin}
                        className="nav-item-color"
                    >
                        Login
                    </Nav.Link>
                    <Nav.Link
                        onClick={handleArtistLogin}
                        className="nav-item-color"
                    >
                        Add Your Art
                    </Nav.Link>
                </>
            )
        }
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#000000" }} className="navbar-sticky">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} alt="logo" width="50%" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: "white" }} />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className="justify-content-end"
                    >
                        <Nav className="justify-content-end">
                            <Nav.Link href="/" className="nav-item-color">
                                Home
                            </Nav.Link>
                            <Nav.Link href="/donate" className="nav-item-color">
                                Donate
                            </Nav.Link>
                            {renderNavContent()}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <Login
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
            /> */}
        </>
    )
}

export default Navigation;