import React, { useState, useEffect } from 'react';

const GranteList = () => {

    const [granteList, setGranteList] = useState(false)

    useEffect(() => {
        //Get all charities
    }, []);


    return (
        <>
            <div style={{ marginTop: "70px", marginBottom: "70px" }} className="me-my-account">
                <div className="container">
                    <div className="row">
                    </div>
                </div>
            </div>
        </>
    );
}

export default GranteList;