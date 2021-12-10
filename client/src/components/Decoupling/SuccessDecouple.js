import React, { useState, useEffect } from "react";
import success from "../../assets/images/success.png";
import Confetti from "react-confetti";
import { Spinner } from "react-bootstrap";
import axios from "axios";
var CryptoJS = require("crypto-js");

const SuccessDecouple = () => {
	const [stage, setStage] = useState("pending");
	const [msg, setMsg] = useState("");
	const [tokenId, setTokenId] = useState(0);

	useEffect(() => {
		const getTransactionDetails = async () => {
			setMsg("Confirming Transactions...");
			const ciphertext = decodeURIComponent(window.location.pathname.slice(17));
			const bytes = CryptoJS.AES.decrypt(
				ciphertext,
				process.env.REACT_APP_DECRYPT_SECRET
			);
			const plainText = JSON.parse(
				bytes.toString(CryptoJS.enc.Utf8)
			).transactionID;
			await axios
				.post(
					`${process.env.REACT_APP_BACKEND_API}/stripe-payment/getTransaction`,
					{
						transactionId: plainText,
					}
				)
				.then(async (res) => {
					console.log(res);
					if (res.data.completed === "true") {
						window.location.href = "/expired";
					} else {
						setStage("decoupling");
						setMsg("Decoupling NFTs...");
						console.log(res.data);
						await axios
							.post(
								`${process.env.REACT_APP_BACKEND_API}/transfer-externally/decoupleArtistNFT`,
								{
									transactionID: plainText,
									IPFShash: res.data.IPFShash,
									walletAddressExternal: res.data.walletAddressExternal,
									address: res.data.walletAddressArtist,
								}
							)
							.then(async (decoupleResp) => {
								if (decoupleResp.data.msg === "Success") {
									setTokenId(decoupleResp.data.tokenId);
									setStage("completed");
								} else {
									setStage("failed");
								}
							})
							.catch((err) => {
								console.log(err);
								setStage("failed");
							});
					}
				})
				.catch((err) => {
					console.log(err);
					setStage("failed");
				});
		};

		getTransactionDetails();
	}, []);

	const handleBackToStudio = (e) => {
		e.preventDefault();
		window.location.href = "/artist";
	};

	const handleGoToOpensea = (e) => {
		e.preventDefault();
		window.location.open(
			`https://testnets.opensea.io/assets/mumbai/${process.env.REACT_APP_CONTRACT_ADDRESS}/${tokenId}`,
			"_blank"
		);
	};

	const renderStageContent = () => {
		switch (stage) {
			case "failed": {
				<>
					<p style={{ fontSize: "20px", color: "red" }} className="text-center">
						<strong>Sorry! There was some error!</strong>
					</p>
					<button onClick={handleBackToStudio} className="me-btn">
						Go To Studio
					</button>
				</>;
				break;
			}
			case "completed": {
				return (
					<>
						<p style={{ fontSize: "20px" }} className="text-center">
							<strong>Hurray! NFT has successfully decoupled!</strong>
						</p>
						<button onClick={handleBackToStudio} className="me-btn">
							Go To Studio
						</button>
						<button
							style={{ marginLeft: "20px" }}
							onClick={handleGoToOpensea}
							className="me-btn"
						>
							View Your Decoupled NFT on OpenSea
						</button>
					</>
				);
			}
			default: {
				return (
					<>
						<Spinner
							style={{ margin: "20px 0", color: "#eb6e3b" }}
							animation="border"
						/>
						<div>
							<p>{msg}</p>
						</div>
						<div>
							<p>
								<em>
									**Do <b>NOT</b> click Back or refresh the page as it may lead
									to loosing your NFT.
								</em>
							</p>
						</div>
					</>
				);
			}
		}
	};

	return (
		<>
			{stage === "completed" ? (
				<Confetti width="1500px" height="720px" />
			) : (
				<></>
			)}
			<div className="text-center" style={{ margin: "40px" }}>
				<img width="30%" src={success} alt="success" />
				<div className="container text-center">{renderStageContent()}</div>
			</div>
		</>
	);
};

export default SuccessDecouple;
