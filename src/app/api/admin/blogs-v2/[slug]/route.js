import { databaseConnection, generateRandomString, getLoggedInUsername } from "@/app/api/utils"
import { isAdmin } from "@/app/api/utils"
import { executeQuery } from "@/app/api/utils"
export const dynamic = "force-dynamic";

export async function GET(request, {params}){
    
    let slug = params.slug

    let connection = false 

    try{

        let query = `
            SELECT * FROM blogs WHERE slug = '${slug}'
        `

        connection = await databaseConnection()

        let results = await executeQuery(connection, query) 

        return new Response(JSON.stringify({success:true, blog: results.map(r => ({...r, editable: isAdmin()})) }))

    }catch(error){  
        
        return new Response(JSON.stringify({success:false, message: error.message}))

    }finally{
        
        if(connection){
            connection.end()
        }
    
    }

}



export async function DELETE(request, { params }) {
    
    let slug = params.slug;

    let connection = false;


    try {

        if(!isAdmin()) throw new Error("Unauthorized")

        let query = `
            DELETE FROM blogs WHERE slug = '${slug}'
        `;

        connection = await databaseConnection();

        let result = await executeQuery(connection, query);

        if (result.affectedRows > 0) {
            return new Response(JSON.stringify({ success: true, message: 'Blog deleted successfully' }));
        } else {
            return new Response(JSON.stringify({ success: false, message: 'No blog found with that slug' }));
        }

    } catch (error) {

        return new Response(JSON.stringify({ success: false, message: error.message }));

    } finally {

        if (connection) {
            connection.end();
        }

    }
}