import { databaseConnection, executeQuery, isAdmin } from "../../utils";

export const dynamic = "force-dynamic";

export async function GET(request){
    
    let connection = false 
    
    try{
        
        let query = `
            SELECT id, title, slug, author, created_at, status, thumbnail FROM blogs ORDER BY created_at DESC LIMIT 20
        `

        connection = await databaseConnection()

        let blogs = await executeQuery(connection, query)

        return new Response(JSON.stringify({success:true, hasAdminAccess: isAdmin(), blogs: blogs.map(r => ({...r, content: '', editable: isAdmin()})) }))

    }catch(error){  

        return new Response(JSON.stringify({success:false, message:error.message}))

    }finally{
        if(connection) connection.end()
    }
}