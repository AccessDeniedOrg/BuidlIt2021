import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import CountUp from "react-countup";
import * as FaIcons from "react-icons/fa";

import banner from "../../../assets/images/banner.gif";
import coins from "../../../assets/images/coins.png";
import "./Home.css";

const Home = () => {
	const [collected, setCollected] = useState(0);
	const [email, setEmail] = useState("");
	const [query, setQuery] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACKEND_API}/donation/getTotalFundRaised`)
			.then((res) => setCollected(res.data.total));
	}, [collected]);

	const handleEmail = (e) => {
		e.preventDefault();
		const regexEmail =
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/;

		let err = "";
		if (!regexEmail.test(email) && email.length < 12) {
			err = "Email is invalid";
			setError(err);
		} else if (query.length < 50) {
			err = "Your message must be more than 50 characters";
			setError(err);
		} else {
			axios
				.post(`${process.env.REACT_APP_BACKEND_API}/auth/queries`, {
					email: email,
					queryBody: query,
				})
				.then((res) => {
					setError("Your Email has been sent!");
					console.log(res.data);
				});
		}
	};

	return (
		<>
			{/* Banner */}
			<div className="banner">
				<Container>
					<Row>
						<Col xs={12} md={6} lg={6} className="banner-text">
							<h1>
								<strong>GrantéStudios</strong>
							</h1>
							<br />
							<p>
								It is a long established fact that a reader will be distracted
								by the readable content of a h5age when looking at its layout.
								The point of using Lorem Ipsum is that it has a more-or-less
								normal distribution of letters
							</p>
							<br />
							<br />
							<p className="text-center">Sign in for upliftment!</p>
							<Row className="text-center">
								<Col xs={12} md={6} lg={6}>
									<button className="banner-btn me-btn " type="submit">
										Charity-doer
									</button>
								</Col>
								<Col xs={12} md={6} lg={6}>
									<button className="banner-btn me-btn " type="submit">
										Artist
									</button>
								</Col>
							</Row>
						</Col>
						<Col xs={12} md={6} lg={6}>

							<img
								src={banner}
								alt="banner"
								style={{ height: "auto", width: "100%", paddingTop: "5%" }}
							/>
						</Col>
					</Row>
				</Container>
			</div>

			{/* Features */}
			<div>
				<h1 className="text-center " style={{ marginTop: "80px" }}>
					<strong>• Our Features •</strong>
				</h1>
				<Container style={{ marginTop: "20px", marginBottom: "80px" }}>
					<Row>
						<Col xs={12} md={4} lg={4}>
							<Card
								style={{ width: "100%", height: "400px", paddingTop: "40px" }}
							>
								<Card.Body>
									<div className="text-center">
										<FaIcons.FaSearchDollar className="icon" />
									</div>
									<br />
									<Card.Title className="text-center ">
										Instant Refund
									</Card.Title>
									<br />
									<Card.Text className="text-center">
										Tired of calling customer care? No delivery? Heartbreak? We
										comfort you with instant refunds, no questions asked.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} md={4} lg={4}>
							<Card
								style={{ width: "100%", height: "400px", paddingTop: "40px" }}
								className="card"
							>
								<Card.Body>
									<div className="text-center">
										<FaIcons.FaDollarSign className="icon" />
									</div>
									<br />
									<Card.Title className="text-center card-title">
										Trace Transactions
									</Card.Title>
									<br />
									<Card.Text className="text-center">
										Want to know where your money goes? We've got you covered.
										Transactions made on the CryptoKart are available to the
										user anytime, anywhere.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} md={4} lg={4}>
							<Card
								style={{ width: "100%", height: "400px", paddingTop: "40px" }}
								className="card"
							>
								<Card.Body>
									<div className="text-center">
										<FaIcons.FaLayerGroup className="icon" />
									</div>
									<br />
									<Card.Title className="text-center card-title">
										Abstraction
									</Card.Title>
									<br />
									<Card.Text className="text-center">
										Want to jump on the Blockchain bandwagon, but finding it
										difficult? The feel of our unique web-wallet architecture
										makes shopping with crypto as easy as swiping your credit
										card.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>

			{/* Funds Raised */}
			<div className="fund-raised">
				<Container>
					<Row>
						<Col className="text-center" xs={12} md={7} lg={7}>
							<div style={{ paddingTop: "15%" }}>
								<h2>
									<strong>• Funds Raised •</strong>
								</h2>
								<br />
								<br />
								<CountUp
									start={0}
									end={collected}
									prefix="₹"
									duration={5}
									className="count-up"
								/>
							</div>
						</Col>
						<Col xs={12} md={5} lg={5}>
							<img src={coins} style={{ height: "auto", width: "80%" }} alt="coins" />
						</Col>
					</Row>
				</Container>
			</div>

			{/* Reach Out */}
			<div className="reach-out">
				<h1 className="text-center " style={{ marginTop: "80px" }}>
					<strong>• Reach Out •</strong>
				</h1>
				<br />
				<Container>
					<Form>
						<Form.Group className="mb-3">
							<Form.Control
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter Email"
							/>
						</Form.Group>
						<br />
						<Form.Group className="mb-3">
							<Form.Control
								type="text"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="Reach out to us"
							/>
						</Form.Group>
						<div className="text-center">
							{error.length > 0 ? <p>{error}</p> : <p></p>}
							<button
								className="me-btn inner-text"
								type="submit"
								onClick={handleEmail}
							>
								Send Email
							</button>
						</div>
					</Form>
				</Container>
			</div>
		</>
	);
};

export default Home;
