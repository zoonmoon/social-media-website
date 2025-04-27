import paypal from '@paypal/checkout-server-sdk';

const environment = new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);

const client = new paypal.core.PayPalHttpClient(environment);

export  async function POST(req) {

    let connection = false 

    const { orderId } = await req.json(); // Get artistId from request body

    
    const getRequest = new paypal.orders.OrdersGetRequest(orderId);

    try {

        const orderDetails = await client.execute(getRequest); // Fetch order details
        
        const amount = orderDetails.result.purchase_units[0].amount.value; // Extract amount


        const request = new paypal.orders.OrdersCaptureRequest(orderId);

        request.requestBody({});

        const capture = await client.execute(request);


        return new Response(JSON.stringify({  status: "COMPLETED", capture }), {
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