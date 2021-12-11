import React, { useState, useEffect } from "react";
import { Spinner, Container, Row, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import SimpleDateTime from "react-simple-timestamp-to-date";
import axios from "axios";

const GranteList = () => {
	const [granteList, setGranteList] = useState([]);
	const [generatedDate, setGeneratedDate] = useState("");
	const [reserves, setReserves] = useState(0);
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACKEND_API}/listing/getLatestList`)
			.then((res) => {
				console.log(res.data.date)
				setGeneratedDate(res.data.date);
				setGranteList(res.data.listing);
				axios
					.get(`${process.env.REACT_APP_BACKEND_API}/listing/getTotalReserves`)
					.then((resp) => {
						setReserves(resp.data.totalReserves);
						setIsLoading(false)
					}).catch((err) => {
						console.log(err)
					})
			});
	}, []);

	const handleBackToClient = () => {
		window.location.href = "/client";
	};

	const renderGranteList = () => {
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
			)
		} else {
			if (!granteList || granteList.length === 0) {
				return (
					<div className="text-center">
						<FontAwesomeIcon
							style={{ fontSize: "35px", marginTop: "10px", marginBottom: "10px" }}
							icon={faExclamationCircle}
						/>
						<h5 style={{ fontWeight: "900" }}>Granté List is empty.</h5><br />
						This can be due to 2 reasons:
						<ul>
							<li>
								• The Admin has not generated the list for the month yet.
							</li>
							<li>
								• All Charities for the month have completed their targets.
							</li>
						</ul>
					</div>
				)
			} else {
				return (
					<>
						<Table
							bordered
							style={{
								boxShadow: "10px 10px 10px rgba(180, 180, 178, 0.1)",
							}}
						>
							<thead style={{ backgroundColor: "rgba(255, 222, 209, 0.5)" }}>
								<tr style={{ fontSize: "22px" }} className="text-center">
									<th>Logo</th>
									<th>Charity Name</th>
									<th>Campaign</th>
								</tr>
							</thead>
							<tbody style={{ fontSize: "16px" }}>
								{granteList.map((item) => {
									return (
										<tr key={item._id}>
											<td className="text-center">
												<img
													src={item.logo}
													alt="logo"
													style={{
														width: "120px",
														height: "120px",
														objectFit: "contain",
														padding: "10px",
													}}
												/>
											</td>
											<td>{item.name}</td>
											<td>{item.title}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</>
				)
			}
		}
	}

	return (
		<>
			<Container style={{ margin: "50px 140px" }}>
				<div
					className="text-center"
					style={{ fontWeight: 600, fontSize: "30px" }}
				>
					<div
						className="back-div"
						style={{ marginBottom: "20px", display: "inline", float: "left" }}
					>
						<FontAwesomeIcon
							onClick={handleBackToClient}
							className="back-to-main-icon"
							icon={faArrowCircleLeft}
						/>
						<span onClick={handleBackToClient} className="back-to-main-text">
							Back To Homepage
						</span>
					</div>
					<p style={{ display: "inline", marginLeft: "-140px" }}>
						• <u>Monthly Granté List</u> •
					</p>
				</div>

				<br />
				<br />
				<br />
				<br />
				<Row style={{ fontSize: "25px" }}>
					<Col sm={6} lg={6}>
						<p>
							<b>Reserves: </b>${reserves}
						</p>
					</Col>
					<Col sm={6} lg={6}>
						<p style={{ float: "right" }}>
							<b>Generated On: </b>
							{
								generatedDate && granteList.length !== 0
									? (
										<SimpleDateTime dateSeparator="/" timeSeparator=":" format="DMY">
											{generatedDate}
										</SimpleDateTime>
									)
									: "---"
							}
						</p>
					</Col>
				</Row>
				<br />
				{renderGranteList()}
			</Container>
		</>
	);
};

export default GranteList;
