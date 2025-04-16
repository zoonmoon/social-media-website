export const dynamic = "force-dynamic";
import { databaseConnection, executeQuery, isAdmin } from "../../utils";

export async function GET(){
    let connection = false
    try{

        connection = await databaseConnection()

        if(!isAdmin()) throw new Error("Not authorized")
        
        let query = `SELECT * from supports ORDER BY created_at DESC `;

        let results = await executeQuery(connection, query) 
        
        return new Response(JSON.stringify({ success: true, supportHistory: results}), {
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
