import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import "./css/MyTransactions.css";
import { Spinner } from "react-bootstrap";

const MyTransactions = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [donations, setDonations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const [toggleState, setToggleState] = useState(1);


    useEffect(() => {

        const getTransactions = async () => {
            console.log(window.localStorage.getItem("email"))
            await axios.post(`${process.env.REACT_APP_BACKEND_API}/transactions/get-donations`, {
                email: window.localStorage.getItem("email")
            }
            )
                .then((res) => {
                    console.log(res.data)
                    setDonations(res.data.data);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });

            setIsLoading(false)
        }

        getTransactions()

    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentTranscations = donations.slice(indexOfFirstPost, indexOfLastPost);

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

                    {currentTranscations.length === 0 ? (
                        <div style={{ backgroundColor: "#ffded1", paddingTop: "25px", paddingBottom: "20px", borderRadius: "15px 15px 0 0" }} className="text-center">
                            <h3><strong>Your Transactions</strong></h3>
                            {/* <hr /> */}
                            <h3
                                style={{
                                    position: "absolute",
                                    left: "20%",
                                    top: "50%",
                                    color: "gray",
                                    fontSize: "22px"
                                }}
                            >
                                You do not have any transactions
                            </h3>
                        </div>
                    ) : (
                        <div className="table table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>To/From</th>
                                        <th>Amount</th>
                                        <th>Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTranscations.map((transaction) => {
                                        var now = new Date(transaction.timestamp);
                                        now.setSeconds(0, 0);
                                        var stamp = now.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                                        return (
                                            <tr key={transaction.id}>
                                                <td>
                                                    {transaction.recepient}
                                                </td>
                                                <td>{transaction.amount}</td>
                                                <td>{stamp}</td>
                                            </tr>
                                        )
                                    }
                                    )}

                                </tbody>
                            </table>
                        </div>
                    )}

                    <div style={{ marginLeft: "45%" }}>
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={donations.length}
                            paginate={paginate}
                        />
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