import { databaseConnection, executeQuery, getLoggedInUsername } from "../../utils";

function isValidEmail(email) {
    // Regular expression to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export async function POST(request){
    let connection = false
    try{
        
        const {token_exists, username} = getLoggedInUsername()

        if(token_exists !== true) throw new Error("Please log in")
        
        connection = await databaseConnection()

        const data = await request.formData()

        const name = data.get('name')
        const profile_pic = data.get('profile_pic')
        const cover_pic = data.get('cover_pic')

        if(name == null || name.trim().length == 0 ){
            throw new Error("Invalid data")
        }

        let query = `UPDATE user_more_info 
            SET name = '${name}',
            profile_pic_src = '${profile_pic}',
            cover_pic_src = '${cover_pic}'
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

        return new Response(JSON.stringify({ success: true, result: results[0] }), {
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