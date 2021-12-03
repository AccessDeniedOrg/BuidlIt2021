import React from 'react';
import error404 from '../../assets/images/404Error.gif'

const Error404 = () => {
    const handleBackToStudio = (e) => {
        e.preventDefault()
        window.location.href = "/client"
    }

    return (
        <>
            <div className="text-center" style={{ margin: "40px" }}>
                <img src={error404} alt="forbidden" />
                <p style={{ fontSize: "20px" }} className="text-center"><strong>404 Error. Page not found.</strong></p>
                <button style={{ width: "150px", marginTop: "50px" }} onClick={handleBackToStudio} className="me-btn">Back to Homepage</button>
            </div>
        </>
    );
}

export default Error404;