import './Client.css';
import React from "react";
import "../../assets/css/font.css"
import Navigation from './Navigation';
import Shop from './Shop/Shop';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Donation from './Donation/Donation';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";

const Client = (props) => {

    let { path } = useRouteMatch();

    return (
        <>
            <div className="App">
                <Navigation
                    handleLogin={props.handleLogin}
                />
            </div>
            <Router>
                <Switch>
                    <Route exact path={path}>
                        <Home />
                    </Route>
                    <Route exact path={`${path}/shop`}>
                        <Shop />
                    </Route>
                    <Route exact path={`${path}/donate`}>
                        <Donation
                            handleLoginModalOpen={props.handleLoginModalOpen}
                        />
                    </Route>
                    <Route exact path={`${path}/profile`}>
                        <Profile />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default Client;