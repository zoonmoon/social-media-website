import { databaseConnection, getLoggedInUsername } from "../../utils";

import Notification from "./../utils";
export const dynamic = "force-dynamic";

export async function GET(request){
    let connection = false
    try{

        connection = await databaseConnection()

        const {token_exists, username} = getLoggedInUsername()

        if(token_exists !== true) throw new Error("Please log in to like")
        
        const notifications = await Notification.markAllAsRead(connection, username)

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

