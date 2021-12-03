import React from 'react';
import onboardingErrorImg from '../../assets/images/OnboardingError.gif'


const OnboardingError = () => {

    const handleBackToStudio = (e) => {
        e.preventDefault()
        window.location.href = "/artist"
    }

    return (
        <>
            <div className="text-center" style={{ margin: "40px" }}>
                <img src={onboardingErrorImg} alt="forbidden" />
                <p style={{ fontSize: "20px", marginTop: "-50px" }} className="text-center"><strong>There was an issue with your onboarding. Please try again later.</strong></p>
                <button style={{ width: "150px", marginTop: "50px" }} onClick={handleBackToStudio} className="me-btn">Back to Studio</button>
            </div>
        </>
    );
}

export default OnboardingError;