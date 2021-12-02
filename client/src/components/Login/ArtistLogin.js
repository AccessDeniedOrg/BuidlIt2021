import React from "react";
import sideArt from "../../assets/images/artistAuthArt.gif"
import FormContent from "./FormContent";
import './css/Login.css'

const ArtistLogin = (props) => {

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <div style={{ marginTop: "18%" }}>
                            <img src={sideArt} alt="sideart" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div style={{ marginTop: "25%" }}>
                            <FormContent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ArtistLogin;