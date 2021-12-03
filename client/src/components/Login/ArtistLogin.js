import React, { useState } from "react";
import sideArt from "../../assets/images/artistAuthArt.gif"
import FormContent from "./FormContent";
import './css/Login.css'

const ArtistLogin = () => {

    const [title, setTitle] = useState("Login To Your Granté Studio")

    const handleTitleChange = (title) => {
        setTitle(title)
    }

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
                        <div style={{ marginTop: "18%" }}>
                            <div className="artist-login-title">
                                <h3><strong>{title}</strong></h3>
                            </div>
                            <FormContent
                                role="artist"
                                handleTitleChange={handleTitleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ArtistLogin;