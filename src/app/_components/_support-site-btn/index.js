// components/SupportSitePaypalButton.js
import { Button } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SupportSitePaypalButton = ({ amount, handleSuccess, handleFailure }) => {
  
  const [isScriptLoading, setIsScriptLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AQq59uAVQONYgTzsN6bdg4-wVMAaS77Isg495KpvBCiAOFPRGIBber4vYtdCjDDI2-3V06_VWNAi8hY7&currency=USD`;
    script.async = true;
    script.onload = () => {
      setIsScriptLoading(false)
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          // Send amount and artist ID to the backend to create the PayPal order
          return fetch('/api/support-site/paypal/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }), // Include amount in the request
          })
            .then((res) => res.json())
            .then((orderData) => {
              if(orderData.success == false){
                toast(orderData.msg)
              }
              return orderData.id; // Return the PayPal order ID
            });
        },
        onApprove: (data, actions) => {
          // Capture the payment after user approval
          return fetch('/api/support-site/paypal/capture-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId: data.orderID }), // Include orderid in capture request
          })
            .then((res) => res.json())
            .then((captureData) => {
              handleSuccess()
              // Optionally, process further actions on success
            });
        },
        onError: (err) => {
          handleFailure(err)
        },
      }).render('#paypal-button-container');
    };
    document.body.appendChild(script);
  }, [amount]);

  return( 
    <>
      {
        isScriptLoading ? (
          <Button loading fullWidth ></Button>
        ): ''
      }
      <div id="paypal-button-container"></div>
    </>
  );
};

export default SupportSitePaypalButton;