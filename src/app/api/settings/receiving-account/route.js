import { databaseConnection, executeQuery, getLoggedInUsername } from "../../utils";

function isValidEmail(email) {
    // Regular expression to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export async function POST(request){
    let connection = false
    try{

        connection = await databaseConnection()

        const data = await request.formData()

        const billing_email = data.get('paypal_billing_email')

        if(!isValidEmail(billing_email)) throw new Error("Invalid Email")

        const {token_exists, username} = getLoggedInUsername()

        if(token_exists !== true) throw new Error("Please log in")
        
        let query = `UPDATE  user_more_info 
            SET paypal_billing_email = '${billing_email}'
            WHERE username = '${username}'
        `;

        await executeQuery(connection, query) 

        return new Response(JSON.stringify({ success: true}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    }catch(error){

        return new Response(JSON.stringify({ success: error.message.includes('Duplicate') ?  true: false, msg:error.message}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    }finally{
        if(connection){
            connection.end()
        }
    }
}

export async function GET(){
    let connection = false
    try{

        connection = await databaseConnection()

        const {token_exists, username} = getLoggedInUsername()
        
        if(token_exists !== true) throw new Error("Please log in")
        
        let query = `SELECT * from user_more_info  WHERE username =  '${username}' `;

        const results = await executeQuery(connection, query) 

        let paypal_billing_email = ''

        if(results.length > 0){
            paypal_billing_email = results[0].paypal_billing_email
        }

        return new Response(JSON.stringify({ success: true, paypal_billing_email }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });
        
    }catch(error){

        return new Response(JSON.stringify({ success: error.message.includes('Duplicate') ?  true: false, msg:error.message}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    }finally{
        if(connection){
            connection.end()
        }
    }
}