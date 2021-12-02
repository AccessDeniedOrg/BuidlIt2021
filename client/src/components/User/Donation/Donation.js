import React, { useState } from 'react';
import DonationPage from './DonationPage';
import CheckoutPage from './CheckoutPage';

const Donation = (props) => {

    const [openCheckout, setOpenCheckout] = useState(false)
    const [charity, setCharity] = useState({})

    const handleOpenCheckout = (selectedCharity) => {
        setOpenCheckout(true)
        setCharity(selectedCharity)
    }

    const handleBackToDonationPage = () => {
        setOpenCheckout(false)
    }

    const renderDonationPage = () => {
        if (openCheckout) {
            return <CheckoutPage
                charity={charity}
                handleBackToDonationPage={handleBackToDonationPage}
            />
        } else {
            return (
                <DonationPage
                    handleLoginModalOpen={props.handleLoginModalOpen}
                    handleOpenCheckout={handleOpenCheckout}
                />
            )
        }
    }

    return (
        <>
            {renderDonationPage()}
        </>
    );
}

export default Donation;