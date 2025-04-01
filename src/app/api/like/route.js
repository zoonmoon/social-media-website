import { databaseConnection, executeQuery, getLoggedInUsername } from "../utils";

import Notification from "../notifications/utils";

export async function POST(request){
    let connection = false
    try{

        connection = await databaseConnection()

        const data = await request.formData()

        const post_id = data.get('post_id')

        const {token_exists, username} = getLoggedInUsername()

        if(token_exists !== true) throw new Error("Please log in to like")
        
        let query = `INSERT INTO post_likes ( post_id, username) VALUES('${post_id}', '${username}')`;

        await executeQuery(connection, query) 


        let query2 = `SELECT username from posts where id = '${post_id}' ;`

        let results = await executeQuery(connection, query2) 

        let postOwner =  results[0].username 

        if(postOwner != username){

            const noti = new Notification(connection) 
    
            await noti.save(postOwner, username, 'post_like', post_id)
    
        }

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

export async function DELETE(request){
    
    let connection = false

    try{

        connection = await databaseConnection()

        const data = await request.formData()

        const post_id = data.get('post_id')

        const {token_exists, username} = getLoggedInUsername()

        if(token_exists !== true) throw new Error("Please log in to like")
        
        let query = `DELETE FROM post_likes WHERE post_id = '${post_id}' AND username='${username}' `;

        await executeQuery(connection, query) 

        return new Response(JSON.stringify({ success: true}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    }catch(error){

        return new Response(JSON.stringify({ success: false, msg: error.message}), {
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