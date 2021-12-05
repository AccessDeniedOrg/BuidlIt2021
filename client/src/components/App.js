import './App.css';
import React, { useState } from "react";
import Error404 from './Error/Error404';
import OnboardingError from './Error/OnboardingError';
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
