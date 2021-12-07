import React, { useState } from 'react';
import UserInfo from './UserInfo'
import MyTransactions from './MyTransactions';
import NFTCollection from './NFTCollection';


const Profile = () => {

    const [openCollections, setOpenCollections] = useState(false)

    const handleGoToCollection = () => {
        setOpenCollections(true)
    }

    const handleBackToProfile = () => {
        setOpenCollections(false)
    }

    return (
        <>
            <div style={{ marginTop: "70px" }} className="me-my-account me-padder-top me-padder-bottom">
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