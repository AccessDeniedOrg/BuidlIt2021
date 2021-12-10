import axios from "axios";
import React, { useEffect, useState } from "react";
import freeMinting from "../../../assets/images/freeMinting.png"
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import CountUp from "react-countup";
import * as FaIcons from "react-icons/fa";

import banner from "../../../assets/images/banner.gif";
import coins from "../../../assets/images/coins.png";
import "./Home.css";

const Home = (props) => {
	const [collected, setCollected] = useState(0);
	const [charities, setCharities] = useState(0);
	const [email, setEmail] = useState("");
	const [query, setQuery] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACKEND_API}/donation/getTotalFundRaised`)
			.then(async (res) => {
				setCollected(res.data.total);
				await axios
					.get(`${process.env.REACT_APP_BACKEND_API}/donation/all-charities`)
					.then((res) => {
						const charity_list = res.data.data;
						setCharities(charity_list.length);
					});
			});
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
					setQuery("");
					setEmail("");
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
								<strong>
									Be kind, <br /> its Christmas!
								</strong>
							</h1>
							<br />
							<p style={{ fontSize: "22px", lineHeight: "32px" }}>
								Indulge in the Art of Giving, <br />
								be it through your paint brush or your pocket
							</p>
							<br />
							<h4 style={{ fontSize: "22px" }}>
								<b>Join Us Today!</b>
							</h4>

							<Row
								style={{
									float: "left",
									marginLeft: "-20px",
									marginTop: "10px",
								}}
							>
								<Col xs={12} md={6} lg={6}>
									<button className="banner-btn me-btn " type="submit" onClick={() => { props.handleLoginModalOpen() }}>
										Donate Now
									</button>
								</Col>
								<Col xs={12} md={6} lg={6}>
									<button
										className="banner-btn me-btn "
										type="submit"
										onClick={() => {
											window.location.href = "/auth-artist";
										}}
									>
										Add your Art
									</button>
								</Col>
							</Row>
						</Col>
						<Col xs={12} md={6} lg={6}>
							<img
								src={banner}
								alt="banner"
								style={{ height: "auto", width: "110%" }}
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
										<FaIcons.FaHandHoldingHeart className="icon" />
									</div>
									<br />
									<Card.Title className="text-center ">
										Incentivized Donations
									</Card.Title>
									<br />
									<Card.Text className="text-center card-content">
										Tired of counting your good deeds through the same old
										boring certificates? At GrantéStudio, we fill your good will
										ledger with aesthetically pleasing NFT art works created by
										artists from all over the world.
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
									<Card.Text className="text-center card-content">
										Want to know where your money goes? We've got you covered.
										Transactions made on GrantéStudio are available to the user
										anytime, anywhere.
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
									<Card.Text className="text-center card-content">
										Want to jump on the Blockchain bandwagon, but finding it
										difficult? The feel of our unique user-friendly donation
										system and inbuilt web-wallets make recieving NFTs for each
										donation as easy as swiping your credit card.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>

					<br />
					<br />
					<br />
					<Row>
						<Col xs={12} md={4} lg={4}>
							<Card
								style={{ width: "100%", height: "400px", paddingTop: "40px" }}
							>
								<Card.Body>
									<div className="text-center">
										<img style={{ width: "12%" }} src={freeMinting} alt="freeminting" />
									</div>
									<br />
									<Card.Title className="text-center ">
										Free NFT Minting for Artists
									</Card.Title>
									<br />
									<Card.Text className="text-center card-content">
										High Transaction fees burning a hole in your wallet? The
										Polygon Blockchain serves as the backbone for all your NFT
										minting needs as an artist at GrantéStudio. At such
										affordable rates we are happy to cover your cost of minting!
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
										<FaIcons.FaPuzzlePiece className="icon" />
									</div>
									<br />
									<Card.Title className="text-center card-title">
										Decouple NFTs
									</Card.Title>
									<br />
									<Card.Text className="text-center card-content">
										Feeling restricted on GrantéStudio? We give you the freedom
										to go back into the metaverse with full control on your
										assets through our NFT Decoupling feature.
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
										<FaIcons.FaRegListAlt className="icon" />
									</div>
									<br />
									<Card.Title className="text-center card-title">
										Granté List
									</Card.Title>
									<br />
									<Card.Text className="text-center card-content">
										Is your campaign struggling to meet the target? Our Monthly
										Granté List will come to your rescue. We will assist you
										with our reserves if your campaign is eligible for the
										month.
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
						<Col className="text-center" xs={12} md={4} lg={4}>
							<div style={{ paddingTop: "15%" }}>
								<h2>
									<strong>• Funds Raised •</strong>
								</h2>
								<br />
								<br />
								<CountUp
									start={0}
									end={collected}
									prefix="$"
									duration={5}
									className="count-up"
								/>
							</div>
						</Col>
						<Col xs={12} md={4} lg={4}>
							<img
								src={coins}
								style={{ height: "auto", width: "80%", float: "right" }}
								alt="coins"
							/>
						</Col>
						<Col className="text-center" xs={12} md={4} lg={4}>
							<div style={{ paddingTop: "15%" }}>
								<h2>
									<strong>• Charities Funded •</strong>
								</h2>
								<br />
								<br />
								<CountUp
									start={0}
									end={charities}
									duration={1}
									className="count-up"
								/>
							</div>
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
							{error.length > 0 ? (
								<p style={{ color: "#f07849" }}>{error}</p>
							) : (
								<p></p>
							)}
							<button
								className="me-btn inner-text"
								style={{ backgroundColor: "#ffc3ab" }}
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
