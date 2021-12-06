import './App.css';
import React, { useState } from "react";
import Error404 from './Extras/Error404';
import CheckoutError from './Extras/CheckoutError';
import Success from './Extras/Success';
import OnboardingError from './Extras/OnboardingError';
import Client from './User/Client';
import Admin from './Admin/Admin';
import Artist from './Artist/Artist';
import Login from './Login/Login';
import ArtistLogin from './Login/ArtistLogin';
import "../assets/css/font.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {

  console.log(window.screen.height)
  console.log(window.screen.width)
  // const myString = '0xee100d22d5b35250adf7e6d8320dc4978688cc11';
  // let myTruncatedString = myString.substring(0, 9) + "..." + myString.substring(31, 41);
  // console.log(myTruncatedString)
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true)
  }

  const handleLoginModalClose = () => {
    setLoginModalOpen(false)
  }

  const handleLogin = (role) => {
    console.log("in")
    if (role === "user") {
      handleLoginModalOpen()
    } else {
      window.location.href = "/auth-artist"
    }
  }

  // const renderWebsite = () => {
  //   if(window.screen.height)
  // }

  return (
    <>
      <Router>
        <Switch>
          <Route path="/client">
            <Client
              handleLogin={handleLogin}
            />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/artist" >
            <Artist />
          </Route>
          <Route path="/auth-artist" >
            <ArtistLogin />
          </Route>
          <Route path="/onboardingerror" >
            <OnboardingError />
          </Route>
          <Route path="/error-404" >
            <Error404 />
          </Route>
          <Route path="/checkout-error" >
            <CheckoutError />
          </Route>
          <Route path="/success/:transactionId" >
            <Success />
          </Route>
        </Switch>
      </Router>
      <Login
        loginModalOpen={loginModalOpen}
        handleLoginModalOpen={handleLoginModalOpen}
        handleLoginModalClose={handleLoginModalClose}
      />
    </>
  );
}

export default App;
