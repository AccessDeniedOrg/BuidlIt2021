import React, { useEffect } from 'react';
import ArtistProfile from './ArtistProfile';
import NFTMinting from './NFTMinting'
import Sidebar from './Sidebar';
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";

const Artist = () => {


    let { path, url } = useRouteMatch();

    useEffect(() => {
        if (!window.localStorage.getItem("email")) {
            window.location.href = "/error-404"
        }
    }, [])

    const handleLogout = () => {
        window.localStorage.removeItem("email")
        window.localStorage.removeItem("username")
        window.localStorage.removeItem("role")
        window.location.href = '/client';
    }

    return (
        <>
            <Router>
                <Container style={{ margin: "0", padding: "0" }}>
                    <Row>
                        <Col sm={12} md={3} lg={3}>
                            <Sidebar
                                url={url}
                                handleLogout={handleLogout}
                            />
                        </Col>
                        <Col sm={12} md={9} lg={9}>
                            <Switch>
                                <Route exact path={path}>
                                    <ArtistProfile />
                                </Route>
                                <Route exact path={`${path}/minting`}>
                                    <NFTMinting />
                                </Route>
                                <Route exact path={`${path}/nftcollection`}>
                                    <ArtistProfile />
                                </Route>
                                <Route exact path={`${path}/transactions`}>
                                    <ArtistProfile />
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </Router>
        </>
    );
}

export default Artist;