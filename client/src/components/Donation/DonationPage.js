import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ProgressBar, Spinner } from "react-bootstrap";

const DonationPage = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [charities, setCharities] = useState([]);
    const [hasLoggedIn, setHasLoggedIn] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (window.localStorage.getItem("email")) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }

        if (authenticated) {
            setHasLoggedIn(true);
        } else {
            setHasLoggedIn(false);
        }

        const getCharities = async () => {
            await axios
                .get(`${process.env.REACT_APP_BACKEND_API}/donation/all-charities`)
                .then((res) => {
                    console.log(res.data.data.slice(0).reverse())
                    setCharities(res.data.data.slice(0).reverse());
                });
        };

        const getInfo = async () => {
            await getCharities();
            setIsLoading(false);
        };

        getInfo();
    }, [authenticated]);

    const handleDonation = (index) => {
        if (!hasLoggedIn) {
            props.handleLoginModalOpen()
        } else {
            props.handleOpenCheckout(charities[index])
        }
    }

    const renderCharities = () => {
        if (isLoading) {
            return (
                <div className="container text-center">
                    <Spinner
                        style={{
                            marginTop: "340px",
                            marginBottom: "10px",
                            color: "blue",
                        }}
                        animation="border"
                    />
                    <div style={{ marginBottom: "700px" }}>
                        <p>Loading charities...</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    {charities.map((ele, index) => {
                        let days_left
                        let percentCompleted = ((parseFloat(ele.target_collected) / parseFloat(ele.target)) * 100).toFixed(2)
                        var ts = Math.round((new Date()).getTime() / 1000);
                        if (ts >= ele.end_date) {
                            return <div key={index}></div>
                        } else {
                            days_left = (ele.end_date - ts) / 86400
                        }
                        return (
                            <div key={index} className="card" style={{
                                width: "90%",
                                boxShadow: "5px 5px 5px rgba(232, 236, 241, 0.5)",
                                margin: "50px",
                                marginLeft: "80px",
                                borderRadius: "20px"
                            }}>
                                <div className="row">
                                    <div className="col-4">
                                        <img src={ele.logo} style={{ width: "100%", margin: "20px", marginTop: "70px", borderRadius: "15px" }} key={index} alt={`${ele.name} logo`}></img>
                                    </div>
                                    <div className="col-8">
                                        <h4 style={{ margin: "30px" }}><strong>{ele.title}</strong></h4>
                                        <div style={{ margin: "20px" }} className="row">
                                            <div className="col-6">
                                                <p><b>Charity Name:</b> {ele.name}</p>
                                            </div>
                                            <div className="col-3">
                                                <p><b>Ends in:</b> {Math.floor(days_left)} days</p>
                                            </div>
                                            <div className="col-3">
                                                <p><b>Number of Donors:</b> {ele.num_of_donors}</p>
                                            </div>
                                        </div>
                                        <div style={{ margin: "20px" }} className="row">
                                            <div className="col-12">
                                                <p><b>Campaign Description:</b> {ele.description}</p>
                                            </div>
                                        </div>
                                        <div style={{ margin: "20px", height: "150px" }} className="row">
                                            <p style={{ fontSize: "20px", color: "green" }}><b>GOAL: ₹{ele.target}</b></p>
                                            <h5><b>CAMPAIGN PROGRESS: </b></h5>
                                            <div className="col-6">
                                                <strong style={{ color: "green" }}>₹{ele.target_collected}/₹{ele.target}</strong>
                                                <ProgressBar animated variant="success" now={percentCompleted} />
                                            </div>
                                            <div className="col-6 text-center">
                                                <button className="me-btn" onClick={() => { handleDonation(index) }}>Donate Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    return (
        <>
            {renderCharities()}
        </>
    );
}

export default DonationPage;