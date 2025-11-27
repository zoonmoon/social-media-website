import paypal from '@paypal/checkout-server-sdk';

import { databaseConnection, getLoggedInUsername, executeQuery } from '@/app/api/utils';
import { generateMissingPayPalEmail } from '@/app/api/utils/email';

const environment = new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);

const client = new paypal.core.PayPalHttpClient(environment);



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

        const query = `SELECT * from user_more_info WHERE username="${artistId}"
        `;

        const results = await executeQuery(connection, query);

        if(results.length == 0){
        

      

            throw new Error("This artist cannot receive support at the moment. We've notified them about the issue. Thank you for supporting our artists.");
        
        }
        
            console.log(results)

        const paypalBillingEmailOfReceiver = results[0].paypal_billing_email

        if(paypalBillingEmailOfReceiver == null || paypalBillingEmailOfReceiver == ""){


    const query3 = `SELECT * from users WHERE username="${artistId}"
            `;
            
            const results3 = await executeQuery(connection, query3);

            if(results3.length > 0) {
                let usremail = results3[0].email
                if(usremail){
                    if(usremail.trim().length > 0){
                        await generateMissingPayPalEmail(results[0].name || 'User', usremail)
                                                          console.log("payement email insert alret success inner if")
                            console.log("sending emial to", usremail)
                    }else{
                                                          console.log("payement email insert if if if alret failed inner if")

                    }

                }else{
                                  console.log("payement email insert alret failed inner if")
  
                }
            }else{
                console.log("payement email insert alret failed")
            }

              throw new Error("This artist cannot receive support at the moment. We've notified them about the issue. Thank you for supporting our artists.");

        }

        

        if(!token_exists) throw new Error("Please login to support artists")

        const order = await client.execute(request);

        return new Response(JSON.stringify({ id: order.result.id ,success: true }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    } catch (err) {

        console.log(err)

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