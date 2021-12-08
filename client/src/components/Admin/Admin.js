import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import SelectRoute from "./SelectRoute";
import { Container, Row, Col } from "react-bootstrap";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useRouteMatch,
} from "react-router-dom";

import Auth from "./Auth";

const Admin = () => {
	let { path, url } = useRouteMatch();

	const handleLogout = () => {
		window.localStorage.removeItem("sellerAuth");
		window.location.href = "/admin";
	};

	useEffect(() => {
		if (
			!window.localStorage.getItem("adminAuth") ===
			process.env.REACT_APP_ADMIN_AUTH
		) {
			window.location.href = "/error-404";
		}
	}, []);

	return (
		<>
			<Router>
				<Switch>
					<Route exact path={path}>
						<Auth />
					</Route>
					<Route path={`${path}/:selectedRoute`}>
						<Container style={{ margin: "0", padding: "0" }}>
							<Row>
								<Col sm={12} md={3} lg={3}>
									<Sidebar url={url} handleLogout={handleLogout} />{" "}
								</Col>
								<Col sm={12} md={9} lg={9}>
									<SelectRoute url={url} />
								</Col>
							</Row>
						</Container>
					</Route>
				</Switch>
			</Router>
		</>
	);
};

export default Admin;
