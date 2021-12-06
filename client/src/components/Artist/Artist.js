import React, { useEffect } from "react";
import ArtistProfile from "./ArtistProfile/ArtistProfile";
import NFTMinting from "./NFTMinting/NFTMinting";
import NFTCollection from "./NFTCollection/NFTCollection";
import Transactions from "./Transactions/Transactions";
import Sidebar from "./Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useRouteMatch,
} from "react-router-dom";

const Artist = () => {
	let { path, url } = useRouteMatch();

	useEffect(() => {
		if (!window.localStorage.getItem("email") || window.localStorage.getItem("role") === "user") {
			window.location.href = "/error-404";
		}
	}, []);

	const handleLogout = () => {
		window.localStorage.removeItem("email");
		window.localStorage.removeItem("username");
		window.localStorage.removeItem("role");
		window.localStorage.removeItem("walletaddress")
		window.location.href = "/client";
	};

	return (
		<>
			<Router>
				<Container style={{ margin: "0", padding: "0" }}>
					<Row>
						<Col sm={12} md={3} lg={3}>
							<Sidebar url={url} handleLogout={handleLogout} />
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
									<NFTCollection />
								</Route>
								<Route exact path={`${path}/transactions`}>
									<Transactions />
								</Route>
							</Switch>
						</Col>
					</Row>
				</Container>
			</Router>
		</>
	);
};

export default Artist;
