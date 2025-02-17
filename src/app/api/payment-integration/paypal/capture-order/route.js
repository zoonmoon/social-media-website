import paypal from '@paypal/checkout-server-sdk';
import { databaseConnection, executeQuery, getLoggedInUsername } from '@/app/api/utils';

import { sendMoney } from '../send-fund';

const environment = new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);

const client = new paypal.core.PayPalHttpClient(environment);


export  async function POST(req) {

    let connection = false 

    const { orderId, artistId } = await req.json(); // Get artistId from request body

    console.log("orderid", orderId)

    const getRequest = new paypal.orders.OrdersGetRequest(orderId);

    try {

        const orderDetails = await client.execute(getRequest); // Fetch order details
        
        const amount = orderDetails.result.purchase_units[0].amount.value; // Extract amount

        console.log("Order amount:", amount);

        const request = new paypal.orders.OrdersCaptureRequest(orderId);

        request.requestBody({});

        const capture = await client.execute(request);

        connection = await databaseConnection() 

        let commission = 0.15 * amount;
        
        console.log("commission", commission)

        let amountBusinessReceived = amount - ( (3.49 / 100) * amount + 0.49 );

        console.log("amountBusinessReceived", amountBusinessReceived)

        let amountToBeSent = amountBusinessReceived - commission - 0.25 // 0.25 to compensate for payout fee
        
        console.log("amountToBeSent", amountToBeSent)

        let finalAmount = Math.max(0, amountToBeSent).toFixed(2);

        console.log("finalAmount", finalAmount)

        const query2 = `SELECT paypal_billing_email from user_more_info WHERE username="${artistId}"
        `;
        
        const results2 = await executeQuery(connection, query2);

        if(results2.length == 0) throw new Error("Artist not eligible")

        const paypalBillingEmailOfReceiver = results2[0].paypal_billing_email

        if(paypalBillingEmailOfReceiver == null || paypalBillingEmailOfReceiver == ""){
            throw new Error("Artist not eligible")
        }

        await sendMoney(paypalBillingEmailOfReceiver, finalAmount)

        const {token_exists, username} = getLoggedInUsername()

        const query = `INSERT INTO supports (
                supported_by,
                supported_to,
                amount
            ) VALUES (
                '${username}',
                '${artistId}',
                ${finalAmount}
            )
        `;

        const results = await executeQuery(connection, query);

        return new Response(JSON.stringify({ query:query, results: results, status: "COMPLETED", capture, supported_to: artistId }), {
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