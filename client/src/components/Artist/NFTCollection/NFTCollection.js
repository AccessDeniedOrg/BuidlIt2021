import React, { useState, useEffect } from "react";
import noNFTCollection from "../../../assets/images/noNFTCollection.gif";
import axios from "axios";

const NFTCollection = () => {
	const [nfts, setNfts] = useState({});

	// useEffect(() => {
	// 	axios.post();
	// 	setNfts(0);
	// }, [nfts]);

	const displayArtistNFTS = () => {
		if (0 >= 1) {
			console.log("Render All NFTs");
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
	};

	return <>{displayArtistNFTS()}</>;
};

export default NFTCollection;
