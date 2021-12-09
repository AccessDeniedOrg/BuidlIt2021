import React, { useState, useEffect } from "react";
import noNFTCollection from "../../../assets/images/noNFTCollection.gif";
import DecoupleModelConfirmation from "../../Decoupling/DecoupleModelConfirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import EditNFTModal from "./EditNFTModal";
import { Card, Spinner } from "react-bootstrap"
import axios from "axios";

const NFTCollection = () => {
	const [nfts, setNfts] = useState([]);
	const [isLoading, setIsLoading] = useState(true)
	const [openEditConfirmation, setOpenEditConfirmation] = useState(false)
	const [openDecoupleConfirmation, setOpenDecoupleConfirmation] = useState(false)
	const [selectedNft, setSelectedNft] = useState({})

	useEffect(() => {

		const getNFTs = async () => {
			axios.post(`${process.env.REACT_APP_BACKEND_API}/artist/getNfts`, {
				role: "artist",
				email: window.localStorage.getItem("email")
			}).then((res) => {
				setNfts(res.data.data);
				setIsLoading(false)
			}).catch((err) => {
				console.log(err)
			})
		}

		getNFTs()
	}, [nfts]);

	const handleToOpenSea = (tokenId) => {
		window.open(`https://testnets.opensea.io/assets/mumbai/${process.env.REACT_APP_CONTRACT_ADDRESS}/${tokenId}`, '_blank')
	}

	const handleNFTDecouple = (index) => {
		setSelectedNft(nfts[index])
		setOpenDecoupleConfirmation(true)
	}

	const handleCloseDecoupleConfirmation = () => {
		setOpenDecoupleConfirmation(false)
	}

	const handleNFTEdit = async (index) => {
		setSelectedNft(nfts[index])
		setOpenEditConfirmation(true)
	}

	const handleCloseEditConfirmation = () => {
		setOpenEditConfirmation(false)
	}

	const displayArtistNFTS = () => {
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
						<p>Loading Your NFTs...</p>
					</div>
				</div>
			)
		} else {
			if (nfts.length !== 0) {
				return (
					<div className="row" style={{ width: "120%" }}>
						{nfts.map((nft, index) => {
							return (
								<div
									className="col-sm-12 col-md-6 col-lg-3"
									key={index}
									style={{ margin: "30px 35px" }}
								>
									<Card style={{ width: "20rem", border: "solid 1px rgba(227, 226, 225, 0.4)" }} key={index}>
										<Card.Img
											style={{ height: "340px", objectFit: "contain" }}
											variant="top"
											src={`https://gateway.pinata.cloud/ipfs/${nft.IPFShash}`}
										/>
										<Card.Body>
											<div className="row">
												<div className="col-7">
													<Card.Title style={{ float: "left" }}>
														{nft.artName}
														<span style={{ fontSize: "15px", marginLeft: "10px", color: "orange", cursor: "pointer" }}>
															<FontAwesomeIcon
																onClick={() => { handleToOpenSea(nft.tokenId) }}
																className="redirect-to-opensea"
																icon={faLink}
															/>
														</span>
													</Card.Title>
												</div>
												<div className="col-5">
													<Card.Title style={{ float: "right" }}>
														<strong>${nft.price}</strong>
													</Card.Title>
												</div>
											</div>
										</Card.Body>
										<Card.Body className="text-center">
											<div className="row">
												<button
													onClick={() => handleNFTDecouple(index)}
													className="me-btn"
													style={{
														width: "50%",
														height: "50px",
														fontSize: "15px",
														marginLeft: "5px",
														backgroundColor: "orange"
													}}
												>
													Decouple
												</button>
												<button
													onClick={() => handleNFTEdit(index)}
													className="me-btn"
													style={{
														width: "40%",
														height: "50px",
														fontSize: "15px",
														marginLeft: "15px",
														backgroundColor: "#facf69"
													}}
												>
													Edit
												</button>
											</div>
										</Card.Body>
									</Card>
								</div>
							);
						})}
					</div>
				)
			} else {
				return (
					<>
						<div
							style={{ marginLeft: "8%", marginTop: "10%" }}
							className="container text-center"
						>
							<div className="row">
								<div className="col-12">
									<img width="50%" src={noNFTCollection} alt="noNFTCollection" />
								</div>
							</div>
							<div style={{ marginTop: "10px" }} className="row">
								<div className="col-12">
									<p>
										<b>
											Oh No! Looks like you have not minted you Art NFTs yet.
											<br />
											<button
												style={{ marginTop: "35px" }}
												onClick={() => {
													window.location.href = `http://localhost:3000/artist/minting`;
												}}
												className="me-btn"
											>
												Mint Your First NFT
											</button>
											<br />
										</b>
									</p>
								</div>
							</div>
						</div>
					</>
				);
			}
		}

	};

	return (
		<>
			{displayArtistNFTS()}
			<EditNFTModal
				handleCloseEditConfirmation={handleCloseEditConfirmation}
				openEditConfirmation={openEditConfirmation}
				selectedNft={selectedNft}
			/>
			<DecoupleModelConfirmation
				role="artist"
				selectedNft={selectedNft}
				openDecoupleConfirmation={openDecoupleConfirmation}
				handleCloseDecoupleConfirmation={handleCloseDecoupleConfirmation}
			/>
		</>
	);
};

export default NFTCollection;
