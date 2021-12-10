import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Table } from "react-bootstrap";

const MyTransactions = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [fiatTransactions, setFiatTransactions] = useState([]);
	const [nftTransactions, setNftTransactions] = useState([]);
	const [toggleState, setToggleState] = useState(1);

	useEffect(() => {
		const getTransactions = async () => {
			console.log(window.localStorage.getItem("email"));
			await axios
				.post(
					`${process.env.REACT_APP_BACKEND_API}/transactions/getTransactions`,
					{
						role: "artist",
						walletAddress: window.localStorage.getItem("walletaddress"),
					}
				)
				.then((res) => {
					console.log(res.data.data);
					const allTransactions = res.data.data.slice(0).reverse();
					setNftTransactions(
						allTransactions.filter((transaction) => {
							if (transaction.type === "Donation") {
								if (transaction.NFTPrice === 0) {
									return false;
								}
							}
							return true;
						})
					);
					setFiatTransactions(
						allTransactions.filter((transaction) => {
							if (transaction.type === "Donation") {
								if (transaction.NFTPrice === 0) {
									return false;
								}
							}
							return true;
						})
					);
				})
				.catch((error) => {
					console.log(error.response.data);
				});

			setIsLoading(false);
		};

		getTransactions();
	}, []);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	// Change page

	const renderTransactions = () => {
		if (isLoading === true) {
			return (
				<div className="container text-center">
					<Spinner
						style={{
							marginTop: "250px",
							marginBottom: "10px",
							color: "orange",
						}}
						animation="border"
					/>
					<div>
						<p>Loading your transactions...</p>
					</div>
				</div>
			);
		} else {
			return (
				<>
					<div
						style={{ marginTop: "7%", marginLeft: "7%" }}
						className="container"
					>
						<div className="bloc-tabs">
							<button
								className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
								onClick={() => toggleTab(1)}
							>
								FIAT TRANSACTIONS
							</button>
							<button
								className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
								onClick={() => toggleTab(2)}
							>
								NFT TRANSACTIONS
							</button>
						</div>

						<div className="content-tabs">
							<div
								className={
									toggleState === 1 ? "content  active-content" : "content"
								}
							>
								{fiatTransactions.length === 0 ? (
									<div
										style={{
											color: "gray",
											fontSize: "18px",
											marginTop: "30%",
										}}
										className="text-center"
									>
										You do not have any fiat transactions.
									</div>
								) : (
									<div
										style={{ width: "935px", marginLeft: "-20px" }}
										className="table table-responsive"
									>
										<Table striped bordered hover responsive>
											<thead>
												<tr>
													<th>To/From</th>
													<th>Amount</th>
													<th>Timestamp</th>
												</tr>
											</thead>
											<tbody>
												{fiatTransactions.map((transaction) => {
													let to, amount;
													if (transaction.type === "Decoupling") {
														to = "GrantéStudio";
														amount = "$5";
													} else {
														to = transaction.walletAddressUser;
														amount = "$" + transaction.NFTPrice.toString();
													}
													var now = new Date(transaction.timestamp);
													now.setSeconds(0, 0);
													var stamp = now.toLocaleString([], {
														year: "numeric",
														month: "numeric",
														day: "numeric",
													});
													return (
														<tr key={transaction._id}>
															<td>{to}</td>
															<td>{amount}</td>
															<td>{stamp}</td>
														</tr>
													);
												})}
											</tbody>
										</Table>
									</div>
								)}
							</div>

							<div
								className={
									toggleState === 2 ? "content  active-content" : "content"
								}
							>
								{nftTransactions.length === 0 ? (
									<div
										style={{
											color: "gray",
											fontSize: "18px",
											marginTop: "30%",
										}}
										className="text-center"
									>
										You have no NFT transactions.
									</div>
								) : (
									<div
										style={{ width: "935px", marginLeft: "-20px" }}
										className="table table-responsive"
									>
										<Table striped bordered hover responsive>
											<thead>
												<tr>
													<th>To</th>
													<th>Type</th>
													<th>Amount</th>
													<th>Timestamp</th>
												</tr>
											</thead>
											<tbody>
												{nftTransactions.map((transaction) => {
													let to, type, price;
													if (transaction.type === "Donation") {
														to = transaction.walletAddressUser;
														type = "DON";
														price = "$" + transaction.NFTPrice.toString();
													} else {
														to = transaction.walletAddressExternal;
														type = "DCP";
														price = "$5";
													}
													var now = new Date(transaction.timestamp);
													now.setSeconds(0, 0);
													var stamp = now.toLocaleString([], {
														year: "numeric",
														month: "numeric",
														day: "numeric",
													});
													return (
														<tr key={transaction._id}>
															<td>{to}</td>
															<td>{type}</td>
															<td>{price}</td>
															<td>{stamp}</td>
														</tr>
													);
												})}
											</tbody>
										</Table>
									</div>
								)}
							</div>
						</div>
					</div>
				</>
			);
		}
	};

	return <>{renderTransactions()}</>;
};

export default MyTransactions;
