import './App.css';
import React, { useState } from "react";
import Client from './User/Client';
import Admin from './Admin/Admin';
import Artist from './Artist/Artist';
import Login from './Login/Login';
import ArtistLogin from './Login/ArtistLogin';
import "../assets/css/font.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {

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

  return (
    <>
      <Router>
        <Switch>
          <Route path="/client" exact>
            <Client
              handleLogin={handleLogin}
            />
          </Route>
          <Route path="/admin" exact>
            <Admin />
          </Route>
          <Route path="/artist" >
            <Artist />
          </Route>
          <Route path="/auth-artist" >
            <ArtistLogin />
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
