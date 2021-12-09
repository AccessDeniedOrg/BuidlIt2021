import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./css/Dashboard.css";

import auth from "../../assets/images/adminImg.png";

const Auth = (props) => {
	const [passCode, setPassCode] = useState("");
	const [err, setErr] = useState(false);

	useEffect(() => {
		if (window.localStorage.getItem("sellerAuth")) {
			window.location.href = "/admin/profile";
		}
	}, []);

	const handlePassCode = (e) => {
		setPassCode(e.target.value);
	};

	const verifyPassCodeHandler = (e) => {
		e.preventDefault();
		if (passCode === process.env.REACT_APP_ADMIN_AUTH) {
			setErr(false);
			window.localStorage.setItem("sellerAuth", passCode);
			window.location.href = `/admin/profile`;
		} else {
			setErr(true);
		}
	};

	return (
		<div className="home">
			<Container fluid="md" style={{ marginRight: 100 }}>
				<Row>
					{/* Password */}
					<Col
						sm={6}
						lg={6}
						className="text-center p-4"
						style={{ marginTop: "250px" }}
					>
						<h2>Admin Login 🔐</h2>
						<Form className="text-center">
							<Form.Group className="mb-3" controlId="formBasicPostal">
								<Form.Control
									value={passCode}
									onChange={handlePassCode}
									placeholder="Enter Pass Code"
									type="password"
								/>
							</Form.Group>
							{err ? (
								<div className="error-msg add-error-style mb-3">
									"Invalid Passcode"
								</div>
							) : (
								<></>
							)}
							<button
								className="me-btn inner-text"
								type="submit"
								onClick={verifyPassCodeHandler}
							>
								Login
							</button>
						</Form>
					</Col>

					{/* Image */}
					<Col sm={6} lg={6}>
						<img
							src={auth}
							alt="Logo"
							className="authImage"
							style={{ width: "600px", paddingTop: "50px", float: "right" }}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Auth;
