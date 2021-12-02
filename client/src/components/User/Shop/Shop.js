import axios from 'axios'
import React, { useState } from 'react';

const Shop = () => {

    const [file, setFile] = useState("")
    const [seeImage, setSeeImage] = useState(false)
    const [ipfsHash, setIpfsHash] = useState("")

    const handleFileUpload = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }


    const handlesubmission = async (e) => {
        e.preventDefault()
        const form_data = new FormData()
        form_data.append('file', file)
        //Pin to IPFS
        const request = {
            method: 'post',
            url: process.env.REACT_APP_PINATA_END_POINT,
            maxContentLength: 'Infinity',
            headers: {
                pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
                'Content-Type': `multipart/form-data; boundary=${form_data._boundary}`,
            },
            data: form_data,
        };
        await axios(request).then((res) => {
            console.log(res.data)
            setIpfsHash(res.data.IpfsHash)
            setSeeImage(true)
        }).catch((err) => {
            console.log(err.response.data)
        })

    }

    return (
        <>
            <input type="file" onChange={handleFileUpload} />
            <button onClick={handlesubmission}>Submit</button>
            {seeImage ? <img src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} alt="nft" /> : <></>}
        </>
    );
}

export default Shop;