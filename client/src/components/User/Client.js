import './Client.css';
import React from "react";
import "../../assets/css/font.css"
import Navigation from './Navigation';
import Home from './Home/Home';
import Footer from './Footer';
import Profile from './Profile/Profile';
import Donation from './Donation/Donation';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";

const Client = (props) => {

    let { path, url } = useRouteMatch();

    console.log(url)

    return (
        <>
            <Router>
                <Navigation
                    url={url}
                    handleLogin={props.handleLogin}
                />
                <Switch>
                    <Route exact path={path}>
                        <Home
                            handleLoginModalOpen={props.handleLoginModalOpen}
                        />
                    </Route>
                    <Route path={`${path}/donate`} exact>
                        <Donation
                            handleLoginModalOpen={props.handleLoginModalOpen}
                        />
                    </Route>
                    <Route path={`${path}/profile`} exact>
                        <Profile />
                    </Route>
                </Switch>

                <hr style={{ marginTop: "0px" }} />
                <Footer />
            </Router>
        </>
    );
}

export default Client;