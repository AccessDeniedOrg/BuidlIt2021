import React from 'react';
import onboardingErrorImg from '../../assets/images/OnboardingError.gif'


const CheckoutError = () => {

    const handleBackToProfile = (e) => {
        e.preventDefault()
        window.location.href = "/client/profile"
    }

    return (
        <>
            <div className="text-center" style={{ margin: "40px" }}>
                <img src={onboardingErrorImg} alt="forbidden" />
                <p style={{ fontSize: "20px", marginTop: "-50px" }} className="text-center"><strong>There was an issue with your donation payment. Please try again later.</strong></p>
                <button style={{ width: "150px", marginTop: "50px" }} onClick={handleBackToProfile} className="me-btn">Back to Profile</button>
            </div>
        </>
    );
}

export default CheckoutError;