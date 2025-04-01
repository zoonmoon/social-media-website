import { databaseConnection, getLoggedInUsername } from "../utils";

import Notification from "./utils";


function timeAgoShort(dateStr) {
    console.log("datestr", dateStr)
  const now = new Date();
  const date = new Date(dateStr); // Convert string to Date object
  
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  const seconds = 60;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const months = days * 30; // Approximate
  const years = days * 365;

  if (diffInSeconds < seconds) return '1s';
  if (diffInSeconds < minutes) return `${Math.floor(diffInSeconds / seconds)}s`;
  if (diffInSeconds < hours) return `${Math.floor(diffInSeconds / minutes)}m`;
  if (diffInSeconds < days) return `${Math.floor(diffInSeconds / hours)}h`;
  if (diffInSeconds < months) return `${Math.floor(diffInSeconds / days)}d`;
  if (diffInSeconds < years) return `${Math.floor(diffInSeconds / months)}mo`;
  
  return `${Math.floor(diffInSeconds / years)}y`;
}


export async function GET(){
    let connection = false
    try{

        connection = await databaseConnection()

        const {token_exists, username} = getLoggedInUsername()

        if(token_exists !== true) throw new Error("Please log in to like")
        
        let notifications = await Notification.getAllNotifications(connection, username) 

        notifications = notifications.map(n => ({...n, created_at: timeAgoShort(n.created_at)}))


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

