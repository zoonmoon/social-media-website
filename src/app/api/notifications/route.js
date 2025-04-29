import { databaseConnection, getLoggedInUsername } from "../utils";
import Notification from "./utils";
export const dynamic = "force-dynamic";


function timeAgoShort(seconds) {


    if(seconds < 60){
        return 'just now'
    }

    const timeUnits = [
        { unit: 'yr', seconds: 31536000 }, // 60 * 60 * 24 * 365
        { unit: 'mo', seconds: 2592000 },  // 60 * 60 * 24 * 30
        { unit: 'd', seconds: 86400 },     // 60 * 60 * 24
        { unit: 'h', seconds: 3600 },      // 60 * 60
        { unit: 'm', seconds: 60 },        // 60
        { unit: 's', seconds: 1 }
    ];

    for (const { unit, seconds: unitSeconds } of timeUnits) {
        const count = Math.floor(seconds / unitSeconds);
        if (count >= 1) {
            return `${count}${unit}`;
        }
    }


//   const seconds = 60;
//   const minutes = seconds * 60;
//   const hours = minutes * 60;
//   const days = hours * 24;
//   const months = days * 30; // Approximate
//   const years = days * 365;

//   if (diffInSeconds < seconds) return '1s';
//   if (diffInSeconds < minutes) return `${Math.floor(diffInSeconds / seconds)}s`;
//   if (diffInSeconds < hours) return `${Math.floor(diffInSeconds / minutes)}m`;
//   if (diffInSeconds < days) return `${Math.floor(diffInSeconds / hours)}h`;
//   if (diffInSeconds < months) return `${Math.floor(diffInSeconds / days)}d`;
//   if (diffInSeconds < years) return `${Math.floor(diffInSeconds / months)}mo`;
  
//   return `${Math.floor(diffInSeconds / years)}y`;
}


export async function GET(){
    let connection = false
    try{

        connection = await databaseConnection()

        const {token_exists, username} = getLoggedInUsername()

        if(token_exists !== true) throw new Error("Please log in to view notifications")
        
        let notifications = await Notification.getAllNotifications(connection, username) 

        notifications = notifications.map(n => ({...n, created_at: timeAgoShort(n.created_ago_in_seconds)}))


        return new Response(JSON.stringify({ success: true, notifications}), {
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

