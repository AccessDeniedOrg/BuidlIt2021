import axios from "axios";
import React, { useState, useEffect } from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import "../AddCharity/css/AddCharity.css";
import noPendingCharities from "../../../assets/images/noPendingCharities.gif";

const AddCharity = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [charities, setCharities] = useState([]);

	useEffect(() => {
		const getCharities = async () => {
			await axios
				.get(
					`${process.env.REACT_APP_BACKEND_API}/donation/getPendingCharities`
				)
				.then((res) => {
					console.log(res.data.data.slice(0).reverse());
					setCharities(res.data.data.slice(0).reverse());
				});
		};

		const getInfo = async () => {
			await getCharities();
			setIsLoading(false);
		};

		getInfo();
	}, []);

	const handleAcceptCharity = async (index) => {
		setIsLoading(true);
		console.log(charities[index]);
		await axios
			.post(
				`${process.env.REACT_APP_BACKEND_API}/donation/addPendingCharity`,
				charities[index]
			)
			.then((res) => {
				setIsLoading(false);
				console.log(res.data);
				window.location.href = `/admin/addCharity`;
			});
	};

	const handleDeclineCharity = async (index) => {
		setIsLoading(true);
		console.log(charities[index]);
		await axios
			.post(
				`${process.env.REACT_APP_BACKEND_API}/donation/declinePendingCharity`,
				charities[index]
			)
			.then((res) => {
				setIsLoading(false);
				console.log(res.data);
				window.location.href = `/admin/addCharity`;
			});
	};

	const renderCharities = () => {
		if (isLoading) {
			return (
				<div className="container text-center">
					<Spinner
						style={{
							marginTop: "340px",
							marginBottom: "10px",
							color: "#ffded1",
						}}
						animation="border"
					/>
					<div style={{ marginBottom: "700px" }}>
						<p>Loading charities...</p>
					</div>
				</div>
			);
		} else {
			if (Object.keys(charities).length === 0) {
				return (
					<div
						className="container text-center"
						style={{
							marginBottom: "20px",
							marginLeft: "140px",
							marginTop: "50px",
						}}
					>
						<div className="row">
							<div className="col-12 text-center">
								<img
									width="60%"
									src={noPendingCharities}
									alt="noPendingCharities"
								/>
							</div>
						</div>
						<div style={{ marginTop: "10px" }} className="row">
							<div className="col-12">
								<p>
									<b>
										Oh No! Looks like you are done at the moment, there are no
										pending charities to access.
									</b>
								</p>
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div style={{ marginTop: "60px", marginBottom: "100px" }}>
						{charities.map((ele, index) => {
							var ts = Math.floor(Date.now() / 1000);
							let days_left = Math.floor((ele.end_date - ts) / 86400);
							return (
								<div
									key={index}
									className="card"
									style={{
										width: "100%",
										padding: "10px",
										marginBottom: "20px",
										boxShadow: "5px 5px 5px rgba(232, 236, 241, 0.5)",
										marginLeft: "140px",
										borderRadius: "20px",
									}}
								>
									<Container>
										<Row>
											<Col sm={4} md={4}>
												<img
													width="90%"
													height="90%"
													src={ele.logo}
													style={{
														borderRadius: "15px",
														objectFit: "contain",
														padding: "10px",
													}}
													key={index}
													alt={`${ele.name} logo`}
												/>
											</Col>
											<Col sm={8} md={8} style={{ padding: "20px" }}>
												<h4>
													<b>Title:</b> {ele.title}
												</h4>
												<p>
													<b>Charity Name:</b> {ele.name}
												</p>
												<p>
													<b>Charity Email:</b> {ele.email}
												</p>
												<p>
													<b>Charity Description:</b> {ele.description}
												</p>

												<Row>
													<Col sm={6} lg={6}>
														<p>
															<b>Target: </b>
															{ele.target}
														</p>
													</Col>
													<Col sm={6} lg={6}>
														<p>
															<b> Ends in: </b>
															{days_left}
														</p>
													</Col>
												</Row>
												<p>
													<b>Proof:</b>{" "}
													<a href={ele.proofLink}>{ele.proofLink}</a>
												</p>
												<Row style={{ marginTop: "30px" }}>
													<Col sm={6} md={6}>
														<button
															style={{
																width: "170px",
																backgroundColor: "red",
																color: "white",
															}}
															className="me-btn"
															onClick={() => {
																handleDeclineCharity(index);
															}}
														>
															<strong>Decline</strong>
														</button>
													</Col>
													<Col sm={6} md={6}>
														<div className="col-3">
															<button
																style={{
																	width: "170px",
																	backgroundColor: "green",
																	color: "white",
																}}
																className="me-btn"
																onClick={() => {
																	handleAcceptCharity(index);
																}}
															>
																<strong>Accept</strong>
															</button>
														</div>
													</Col>
												</Row>
											</Col>
										</Row>
									</Container>
								</div>
							);
						})}
					</div>
				);
			}
		}
	};

	return <>{renderCharities()}</>;
};

export default AddCharity;
