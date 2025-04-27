import paypal from '@paypal/checkout-server-sdk';

import { databaseConnection, getLoggedInUsername, executeQuery } from '@/app/api/utils';


const environment = new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);

const client = new paypal.core.PayPalHttpClient(environment);


import logger from '@/app/api/utils/logger';

export  async function POST(req) {

    let connection = false 

    let { amount, artistId } = await req.json(); // Get artistId from request body

    amount = parseInt(amount)

    const request = new paypal.orders.OrdersCreateRequest();
    
    request.prefer("return=representation");

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: amount,
            },
            custom_id: artistId, // Store artist ID as custom metadata in the order
        }],
    });
    
    try {
        
        const {token_exists, username} = getLoggedInUsername()

        connection = await databaseConnection() 

        const query = `SELECT paypal_billing_email from user_more_info WHERE username="${artistId}"
        `;

        const results = await executeQuery(connection, query);

        if(results.length == 0) throw new Error("Artist not eligible, artistid: "+artistId)

        const paypalBillingEmailOfReceiver = results[0].paypal_billing_email

        if(paypalBillingEmailOfReceiver == null || paypalBillingEmailOfReceiver == ""){

            throw new Error("Artist not eligible: artistid: "+artistId)
        }

        if(!token_exists) throw new Error("Login to support: to artist: " + artistId)

        const order = await client.execute(request);

        return new Response(JSON.stringify({ id: order.result.id ,success: true }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    } catch (err) {

        logger.info(err.message)

        return new Response(JSON.stringify({ success: false, msg: err.message  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 500
        });
    
    } finally{
        if(connection){
            connection.end()
        }
    }


} 