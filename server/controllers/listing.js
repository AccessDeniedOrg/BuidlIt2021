const Listing = require("../models/listing");
const Charities = require("../models/charities");
const Transactions = require("../models/transactions");

const createListing = async (req, res) => {
	Charities.find((err, charitiesData) => {
		if (err) {
			res.send({ msg: "fail" });
		} else {
			if (!charitiesData) {
				res.send({ msg: "fail" });
			} else {
				// Check last date
				console.log("In 1");
				Listing.find(async (err, data) => {
					if (err) {
						res.send({ msg: "fail" });
					} else {
						console.log(data.length);
						let date = Math.floor(Date.now() / 1000);
						if (data.length === 0) {
							console.log("In 3");
							let list = [];

							charitiesData.forEach(function (item) {
								let difference = item.target - item.target_collected;

								if (
									date > item.end_date &&
									Math.floor(date - item.end_date) < 2592000 &&
									difference > 0
								) {
									list.push(item);
								}
							});
							let newList = new Listing({
								date: Math.floor(Date.now() / 1000),
								listing: list,
							});

							newList.save(function (err, NFT) {
								if (err) res.send(err);
								else res.send({ msg: "success" });
							});
						} else {
							console.log("In 4");
							const latestList = data[data.length - 1];
							console.log(latestList);
							if (Math.floor(latestList.date - date) > 30) {
								let list = [];

								charitiesData.forEach(function (item) {
									let difference = item.target - item.target_collected;

									if (
										date > item.end_date &&
										Math.floor(date - item.end_date) < 2592000 &&
										difference > 0
									) {
										list.push(item);
									}
								});
								let newList = new Listing({
									date: Math.floor(Date.now() / 1000),
									listing: list,
								});

								newList.save(function (err, NFT) {
									if (err) res.send(err);
									else res.send({ msg: "success" });
								});
							} else {
								console.log("In 5");
								res.send({ msg: "fail" });
							}
						}
					}
				});
			}
		}
	});
};

const getLatestList = async (req, res) => {
	Listing.find(async (err, data) => {
		if (err) {
			res.send("No list");
		} else {
			console.log(data.length);
			const latestList = data[data.length - 1];
			res.send(latestList);
		}
	});
};

const getTotalReserves = async (req, res) => {
	Transactions.find(async (err, data) => {
		if (err) {
			res.send({ msg: "failure" });
		} else {
			let totalReserves = 0;
			data.forEach(function (item) {
				let date = Date.now();
				if (date - item.timestamp < 2592000000) {
					totalReserves =
						totalReserves +
						Math.floor(item.totalAmt - item.NFTPrice - item.charityAmt);
				}
			});
			res.send({ totalReserves: Math.floor(totalReserves * 0.95) });
		}
	});
};

module.exports = {
	createListing,
	getLatestList,
	getTotalReserves,
};
