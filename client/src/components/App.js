import './App.css';
import React, { useState } from "react";
import "../assets/css/font.css"
import Navigation from './Navigation';
import Shop from './Shop/Shop';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Donation from './Donation/Donation';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {

  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true)
  }

  const handleLoginModalClose = () => {
    setLoginModalOpen(false)
  }

  return (
    <>
      <div className="App">
        <Navigation
          loginModalOpen={loginModalOpen}
          handleLoginModalOpen={handleLoginModalOpen}
          handleLoginModalClose={handleLoginModalClose}
        />
      </div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route exact path="/donate">
            <Donation
              handleLoginModalOpen={handleLoginModalOpen}
            />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
