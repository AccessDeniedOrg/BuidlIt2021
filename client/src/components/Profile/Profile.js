import React from 'react';
import UserInfo from './UserInfo'
import MyTransactions from './MyTransactions';


const Profile = () => {
    return (
        <>
            <div style={{ marginTop: "70px" }} className="me-my-account me-padder-top me-padder-bottom">
                <div className="container">
                    <div className="row">
                        <UserInfo />
                        <MyTransactions />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;