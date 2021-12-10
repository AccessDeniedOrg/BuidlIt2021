import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import "./Navigation.css"
import logo from "../../assets/images/logo_nobg_peach.png"


const Navigation = (props) => {

    const [artistLoggedIn, setArtistLoggedIn] = useState(false)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        if (window.localStorage.getItem("email")) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }

        if (authenticated) {
            if (window.localStorage.getItem("role") === "user") {
                setUserLoggedIn(true)
            } else {
                setArtistLoggedIn(true)
            }
        } else {
            setArtistLoggedIn(false)
            setUserLoggedIn(false)
        }
    }, [authenticated]);


    const handleLogout = () => {
        window.localStorage.removeItem("email")
        window.localStorage.removeItem("username")
        window.localStorage.removeItem("role")
        window.localStorage.removeItem("walletaddress")
        window.location.href = '/client';
        setArtistLoggedIn(false)
        setUserLoggedIn(false)
    }

    const handleUserLogin = () => {
        props.handleLogin("user")
    }

    const handleArtistLogin = () => {
        props.handleLogin("artist")
    }

    //Change Login/Register to My Account
    const renderNavContent = () => {
        if (userLoggedIn) {
            return (
                <NavDropdown
                    title={<span className="nav-item-color">My Account</span>}
                    id="basic-nav-dropdown"
                    className="nav-item-color"
                    style={{ color: "white" }}
                >
                    <NavDropdown.Item
                        href={`${props.url}/profile`}
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
        }
        else if (artistLoggedIn) {
            return (<Nav.Link
                href="/artist"
                className="nav-item-color artist-studio-btn"
            >
                Go To Studio
            </Nav.Link>)
        }
        else {
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
                        className="nav-item-color artist-login-btn"
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
                    <Navbar.Brand href={props.url}>
                        <img src={logo} alt="logo" width="50%" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: "white" }} />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className="justify-content-end"
                    >
                        <Nav className="justify-content-end">
                            <Nav.Link href={props.url} className="nav-item-color">
                                Home
                            </Nav.Link>
                            <Nav.Link href={`${props.url}/donate`} className="nav-item-color">
                                Donate
                            </Nav.Link>
                            <Nav.Link href="/listing" className="nav-item-color">
                                List Campaign
                            </Nav.Link>
                            <Nav.Link href="/viewlist" className="nav-item-color">
                                GrantéList
                            </Nav.Link>
                            {renderNavContent()}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation;