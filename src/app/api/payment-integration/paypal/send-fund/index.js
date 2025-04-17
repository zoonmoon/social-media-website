import paypal from '@paypal/payouts-sdk';
import { executeQuery } from '@/app/api/utils';

// Configure PayPal Environment
const environment = new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,  // Replace with your PayPal Client ID
    process.env.PAYPAL_CLIENT_SECRET // Replace with your PayPal Client Secret
);

const client = new paypal.core.PayPalHttpClient(environment);

// Create a Payout
export async function sendMoney(recipientEmail, amount, connection, currency = 'USD') {
    const request = new paypal.payouts.PayoutsPostRequest();

    // Define the payout batch
    request.requestBody({
        sender_batch_header: {
            sender_batch_id: `batch-${Date.now()}`, // Unique batch ID
            email_subject: 'You have a payout!',
            email_message: 'You have received a payout. Thank you for using our service!'
        },
        
        items: [
            {
                recipient_type: 'EMAIL',
                receiver: recipientEmail, // Recipient PayPal email
                amount: {
                    value: amount,
                    currency: currency
                },
                note: 'Thanks for your hard work!',
                sender_item_id: `item-${Date.now()}`
            }
        ]
    });

    try {
        // Execute the API request
        const response = await client.execute(request);
        console.log('Payout Created Successfully:', response.result);

        return response.result;
    } catch (error) {

            const query_payout_error = `INSERT INTO supports (
                supported_by,
                supported_to,
                amount, 
                is_payout_success,
                comment
            ) VALUES (
                '${username}',
                '${artistId}',
                ${finalAmount},
                0,
                'PAYPAL_PAYOUT_ERR - ${error.message.replace(/'/g, '')}' 
            )
        `;
        
        const results_query_payout_error = await executeQuery(connection, query_payout_error);

        
        console.error('Error Creating Payout:', error.message, error);
        throw error;
    }
}
