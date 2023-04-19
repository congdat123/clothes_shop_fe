import React, { useState, useEffect } from 'react';
import DropIn from 'braintree-web-drop-in';

function Payment(props) {
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState(null);

    useEffect(() => {
        // Make an API call to get a client token from your server
        fetch('/api/get_token')
            .then((response) => response.json())
            .then((data) => {
                setClientToken(data.clientToken);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handlePayment = () => {
        // Send a nonce to your server for processing
        instance
            .requestPaymentMethod()
            .then((data) => {
                fetch('/api/process_payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentMethodNonce: data.nonce,
                        amount: 10,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const initializeDropIn = (instance) => {
        setInstance(instance);
    };

    return (
        <div>
            <div id="dropin-container"></div>
            <button onClick={handlePayment}>Pay Now</button>
            <DropIn options={{ authorization: clientToken }} onInstance={initializeDropIn} />
        </div>
    );
}

export default Payment;
