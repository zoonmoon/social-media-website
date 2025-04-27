import paypal from '@paypal/checkout-server-sdk';

import {  getLoggedInUsername } from '@/app/api/utils';


const environment = new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);

const client = new paypal.core.PayPalHttpClient(environment);

export  async function POST(req) {

    let connection = false 

    let { amount } = await req.json(); // Get artistId from request body

    amount = parseInt(amount)

    const request = new paypal.orders.OrdersCreateRequest();
    
    request.prefer("return=representation");

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: amount,
            }
        }],
    });

    try {
        
        const {token_exists} = getLoggedInUsername()

        if(!token_exists) throw new Error("Login to support")

        const order = await client.execute(request);

        return new Response(JSON.stringify({ id: order.result.id, success: true }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    } catch (err) {

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