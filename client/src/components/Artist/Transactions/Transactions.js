import React from "react";
import transactions from "../../../assets/images/transactions.gif";
//import axios from "axios";

const Transactions = () => {
	//const [nfts, setNfts] = useState({});

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
					<div style={{ marginLeft: "8%" }} className="container text-center">
						<div className="row">
							<div className="col-12">
								<img width="70%" src={transactions} alt="transactions" />
							</div>
						</div>
						<div style={{ marginTop: "-100px" }} className="row">
							<div className="col-12">
								<p>
									<b>Snap, you dont have transactions yet</b>
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

export default Transactions;
