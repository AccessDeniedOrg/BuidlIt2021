import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import profileImg from "../../../assets/images/admin_profile.png";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "./css/Profile.css";

const Profile = () => {
	const [collected, setCollected] = useState(0);
	const [ongoing, setOngoing] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACKEND_API}/donation/getTotalFundRaised`)
			.then((res) => {
				setCollected(res.data.total);
				axios
					.get(`${process.env.REACT_APP_BACKEND_API}/donation/all-charities`)
					.then((response) => {
						const arr = response.data.data;
						// console.log(arr.length);
						setOngoing(arr.length);
					});
			});
		setIsLoading(false);
	}, [collected]);

	// Handle Generate List
	const handleGenerateList = async () => {
		setError("");
		axios
			.get(`${process.env.REACT_APP_BACKEND_API}/listing/createListing`)
			.then((res) => {
				console.log(res.data.status);
				if (res.data.msg === "fail") {
					setError(`The List cannot be generated. `);
				} else {
					window.location.href = "/viewList";
				}
			});
	};

	const renderProfile = () => {
		if (isLoading) {
			return (
				<div style={{ marginLeft: "100px" }} className="container text-center">
					<Spinner
						style={{
							marginTop: "280px",
							marginBottom: "10px",
							color: "#ffded1",
						}}
						animation="border"
					/>
					<div style={{ marginBottom: "700px" }}>
						<p>Loading your profile...</p>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<Container
						className="text-center"
						style={{ marginLeft: "13%", marginTop: "50px" }}
					>
						<Row>
							<h2 className="studio-title">Welcome To The Admin Dashboard !</h2>
						</Row>
					</Container>
					<Container style={{ marginTop: "70px" }}>
						<Row>
							<Col sm={12} lg={7} md={7} xl={7}>
								<div
									style={{ marginBottom: "0", height: "270px" }}
									className="me-my-account-profile"
								>
									<div className="me-my-profile-head">
										<div className="me-profile-name">
											<h4>
												<strong>Account Details</strong>
											</h4>
										</div>
									</div>
									<div
										style={{ marginTop: "-50px" }}
										className="me-my-profile-body"
									>
										<ul>
											<li>
												<div className="me-profile-data">
													<p>
														<b>Username:</b>
													</p>
												</div>
												<div
													style={{ marginRight: "95px" }}
													className="me-profile-data-right"
												>
													<p> Admin</p>
												</div>
											</li>
											<li>
												<div className="me-profile-data">
													<p>
														<b>Email:</b>
													</p>
												</div>
												<div
													style={{ marginRight: "95px" }}
													className="me-profile-data-right"
												>
													<p>accessdeniedbuidl@gmail.com</p>
												</div>
											</li>
											<li>
												<div className="me-profile-data">
													<p>
														<b>Donation:</b>
													</p>
												</div>
												<div
													style={{ marginRight: "95px" }}
													className="me-profile-data-right"
												>
													<p>${collected}</p>
												</div>
											</li>
											<li>
												<div className="me-profile-data">
													<p>
														<b>Ongoing Campaigns:</b>
													</p>
												</div>
												<div
													style={{ marginRight: "0" }}
													className="me-profile-data-right"
												>
													<p
														className="me-profile-data-right"
														style={{ marginRight: "105px" }}
													>
														{ongoing}
													</p>
												</div>
											</li>
										</ul>
									</div>
								</div>
								<div
									style={{ height: "270px" }}
									className="me-my-wallet-profile"
								>
									<div className="me-my-wallet-head">
										<div className="me-profile-name">
											<h4 style={{ fontWeight: "600" }}>
												Generate Charity List
											</h4>
										</div>
									</div>
									<div
										style={{ marginTop: "-55px" }}
										className="me-my-wallet-body"
									>
										<p>
											Click on the "Generate" button to generate the list of
											charaties ele-gible for Reserve Funds
										</p>
										<div className="text-center">
											<button
												className="me-btn inner-text"
												type="submit"
												onClick={() => {
													handleGenerateList();
												}}
											>
												Generate
											</button>
											{error === "" ? (
												<></>
											) : (
												<div>
													<br />
													<p>
														{error} Click <a href="/viewList">here</a> to view
														the recently gener-ated list
													</p>
												</div>
											)}
										</div>
									</div>
								</div>
							</Col>
							<Col sm={12} lg={5} md={5} xl={5}>
								<img
									style={{ width: "155%", margin: "0" }}
									src={profileImg}
									alt="profile"
								/>
							</Col>
						</Row>
					</Container>
				</div>
			);
		}
	};

	return <>{renderProfile()}</>;
};

export default Profile;
