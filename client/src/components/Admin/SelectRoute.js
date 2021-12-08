import React, { useState, useEffect } from "react";
import forbidden from "../../assets/images/nothingHere.gif";
import { useParams } from "react-router-dom";
import Test from "./Test";
import Sidebar from "./Sidebar";
import Profile from "./Profile/Profile";

const SelectRoute = (props) => {
	let { selectedRoute } = useParams();

	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		if (window.localStorage.getItem("sellerAuth")) {
			setAuthenticated(true);
		} else {
			setAuthenticated(false);
		}
	}, []);

	const renderPage = () => {
		let page;
		if (authenticated) {
			switch (selectedRoute) {
				case "addCharity": {
					page = <Test />;
					break;
				}
				case "editCharity": {
					page = <Test />;
					break;
				}
				case "profile": {
					page = <Profile />;
					break;
				}
				default: {
					return <div>Error 404 : Page Not Found</div>;
				}
			}
		} else {
			return (
				<>
					<div className="text-center" style={{ marginTop: "100px" }}>
						<img src={forbidden} alt="forbidden" />
						<h5>
							<strong>You are not authorized to view this page.</strong>
						</h5>
					</div>
				</>
			);
		}

		return (
			<>
				{/* <Sidebar url={props.url} /> */}
				{page}
			</>
		);
	};

	return <>{renderPage()}</>;
};

export default SelectRoute;
