import "./App.css";
import React, { useEffect, useState } from "react";
import Error404 from "./Extras/Error404";
import CheckoutError from "./Extras/CheckoutError";
import Success from "./Extras/Success";
import SuccessDecouple from "./Decoupling/SuccessDecouple";
import OnboardingError from "./Extras/OnboardingError";
import Expired from "./Extras/Expired";
import Client from "./User/Client";
import Admin from "./Admin/Admin";
import Artist from "./Artist/Artist";
import Listing from "./Charity/Listing"
import GranteList from "./Charity/GranteList"
import Login from "./Login/Login";
import ArtistLogin from "./Login/ArtistLogin";
import "../assets/css/font.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import nothingHere from "../assets/images/nothingHere.gif";

const App = () => {
	const [desktopView, setDesktopView] = useState(false);
	const [loginModalOpen, setLoginModalOpen] = useState(false);
	useEffect(() => {
		console.log("Inner Width", window.innerWidth);
		if (window.innerWidth <= 1000) {
			setDesktopView(false);
		} else {
			setDesktopView(true);
		}
	}, []);

	const handleLoginModalOpen = () => {
		setLoginModalOpen(true);
	};

	const handleLoginModalClose = () => {
		setLoginModalOpen(false);
	};

	const handleLogin = (role) => {
		console.log("in");
		if (role === "user") {
			handleLoginModalOpen();
		} else {
			window.location.href = "/auth-artist";
		}
	};

	return (
		<>
			{desktopView === true ? (
				<>
					<Router>
						<Switch>
							<Route path="/client">
								<Client
									handleLoginModalOpen={handleLoginModalOpen}
									handleLogin={handleLogin}
								/>
							</Route>
							<Route path="/admin">
								<Admin />
							</Route>
							<Route path="/artist">
								<Artist />
							</Route>
							<Route path="/auth-artist">
								<ArtistLogin />
							</Route>
							<Route path="/onboardingerror">
								<OnboardingError />
							</Route>
							<Route path="/error-404">
								<Error404 />
							</Route>
							<Route path="/checkout-error">
								<CheckoutError />
							</Route>
							<Route path="/success/:transactionId">
								<Success />
							</Route>
							<Route path="/expired">
								<Expired />
							</Route>
							<Route path="/successDecouple/:transactionId">
								<SuccessDecouple />
							</Route>
							<Route path="/listing">
								<Listing />
							</Route>
							<Route path="/viewlist">
								<GranteList />
							</Route>
						</Switch>
					</Router>
					<Login
						loginModalOpen={loginModalOpen}
						handleLoginModalOpen={handleLoginModalOpen}
						handleLoginModalClose={handleLoginModalClose}
					/>
				</>
			) : (
				<div className="text-center">
					<img src={nothingHere} alt={nothingHere} />
					<div style={{ marginLeft: "150px" }}>
						<h2>Oh Snap!</h2>
						<p>
							This website is only available on desktop computers. Turn on
							desktop mode on your device or switch to a desktop .
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default App;
