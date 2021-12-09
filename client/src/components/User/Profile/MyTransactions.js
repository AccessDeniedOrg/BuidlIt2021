import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import "./css/MyTransactions.css";
import { Spinner } from "react-bootstrap";

const MyTransactions = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fiatTransactions, setFiatTransactions] = useState([])
    const [nftTransactions, setNftTransactions] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const [toggleState, setToggleState] = useState(1);


    useEffect(() => {

        const getTransactions = async () => {
            console.log(window.localStorage.getItem("email"))
            await axios.post(`${process.env.REACT_APP_BACKEND_API}/transactions/getTransactions`, {
                role: "user",
                walletAddress: window.localStorage.getItem("walletaddress")
            }
            )
                .then((res) => {
                    console.log(res.data.data)
                    const allTransactions = res.data.data.slice(0).reverse()
                    setNftTransactions(
                        allTransactions.filter((transaction) => {
                            if (transaction.type === "Donation") {
                                if (transaction.NFTPrice === 0) {
                                    return false
                                }
                            }
                            return true
                        }))
                    setFiatTransactions(
                        allTransactions.filter((transaction) => {
                            if (transaction.type === "Decoupling") {
                                return false
                            }
                            return true
                        })
                    )

                })
                .catch((error) => {
                    console.log(error.response.data);
                });

            setIsLoading(false)
        }

        getTransactions()

    }, []);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentFiatTransactions = fiatTransactions.slice(indexOfFirstPost, indexOfLastPost)
    const currentNftTransactions = nftTransactions.slice(indexOfFirstPost, indexOfLastPost)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderTransactions = () => {
        if (isLoading === true) {
            return (
                <div className="container text-center">
                    <Spinner
                        style={{ marginTop: "250px", marginBottom: "10px", color: "orange" }}
                        animation="border"
                    />
                    <div>
                        <p>Loading your transactions...</p>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <div style={{ marginTop: "10px" }} className="container">
                        <div className="bloc-tabs">
                            <button
                                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                onClick={() => toggleTab(1)}
                            >
                                DONATIONS
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
                                className={toggleState === 1 ? "content  active-content" : "content"}
                            >
                                {
                                    fiatTransactions.length === 0
                                        ? (
                                            <div style={{ color: "gray", fontSize: "18px", marginTop: "50%" }} className="text-center">
                                                You have not made any donations.
                                            </div>
                                        )
                                        : (
                                            <div className="table table-responsive">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>To</th>
                                                            <th>Amount</th>
                                                            <th>Timestamp</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentFiatTransactions.map((transaction) => {
                                                            var now = new Date(transaction.timestamp);
                                                            now.setSeconds(0, 0);
                                                            var stamp = now.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric' });
                                                            return (
                                                                <tr key={transaction._id}>
                                                                    <td>
                                                                        {transaction.charityName}
                                                                    </td>
                                                                    <td>${transaction.charityAmt}</td>
                                                                    <td>{stamp}</td>
                                                                </tr>
                                                            )
                                                        }
                                                        )}

                                                    </tbody>
                                                </table>
                                            </div>
                                        )
                                }

                                <div style={{ marginLeft: "45%" }}>
                                    <Pagination
                                        postsPerPage={postsPerPage}
                                        totalPosts={fiatTransactions.length}
                                        paginate={paginate}
                                    />
                                </div>
                            </div>

                            <div
                                className={toggleState === 2 ? "content  active-content" : "content"}
                            >
                                {
                                    nftTransactions.length === 0
                                        ? (
                                            <div style={{ color: "gray", fontSize: "18px", marginTop: "50%" }} className="text-center">
                                                You have no NFT transactions.
                                            </div>
                                        )
                                        : (
                                            <div className="table table-responsive">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>To/From</th>
                                                            <th>Type</th>
                                                            <th>Amount</th>
                                                            <th>Timestamp</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentNftTransactions.map((transaction) => {
                                                            let truncatedAddress, type, price
                                                            if (transaction.type === "Donation") {
                                                                const artistAddress = transaction.walletAddressArtist;
                                                                truncatedAddress = artistAddress.substring(0, 9) + "..." + artistAddress.substring(31, 41);
                                                                type = "DON"
                                                                price = "$" + (transaction.NFTPrice).toString()
                                                            } else {
                                                                const externalAddress = transaction.walletAddressExternal;
                                                                truncatedAddress = externalAddress.substring(0, 9) + "..." + externalAddress.substring(31, 41);
                                                                type = "DCP"
                                                                price = "---"
                                                            }
                                                            var now = new Date(transaction.timestamp);
                                                            now.setSeconds(0, 0);
                                                            var stamp = now.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric' });
                                                            return (
                                                                <tr key={transaction._id}>
                                                                    <td>{truncatedAddress}</td>
                                                                    <td>{type}</td>
                                                                    <td>{price}</td>
                                                                    <td>{stamp}</td>
                                                                </tr>
                                                            )
                                                        }
                                                        )}

                                                    </tbody>
                                                </table>
                                            </div>
                                        )
                                }
                                <div style={{ marginLeft: "45%" }}>
                                    <Pagination
                                        postsPerPage={postsPerPage}
                                        totalPosts={nftTransactions.length}
                                        paginate={paginate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )

        }
    }

    return (
        <>
            <div className="col-lg-6">
                <div className="me-transaction">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="me-transaction-box">

                                    {renderTransactions()}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default MyTransactions;