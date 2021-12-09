import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo'
import MyTransactions from './MyTransactions';
import NFTCollection from './NFTCollection';


const Profile = () => {

    const [openCollections, setOpenCollections] = useState(false)

    useEffect(() => {
        if (!window.localStorage.getItem("email") || window.localStorage.getItem("role") === "artist") {
            window.location.href = "/error-404";
        }
    }, []);

    const handleGoToCollection = () => {
        setOpenCollections(true)
    }

    const handleBackToProfile = () => {
        setOpenCollections(false)
    }

    return (
        <>
            <div style={{ marginTop: "70px", marginBottom: "70px" }} className="me-my-account">
                <div className="container">
                    <div className="row">
                        {
                            openCollections
                                ? <NFTCollection
                                    handleBackToProfile={handleBackToProfile}
                                />
                                : (
                                    <>
                                        <UserInfo
                                            handleGoToCollection={handleGoToCollection}
                                        />
                                        <MyTransactions />
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;