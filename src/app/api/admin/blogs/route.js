import { databaseConnection, executeQuery, isAdmin } from "../../utils";


export async function GET(request){
    
    console.log(request)

    let connection = false 
    
    try{
        
        let query = `
            SELECT * FROM blogs ORDER BY created_at DESC LIMIT 20
        `

        let connection = await databaseConnection()

        let blogs = await executeQuery(connection, query)

        return new Response(JSON.stringify({success:true, hasAdminAccess: isAdmin(), blogs: blogs.map(r => ({...r, editable: isAdmin()})) }))

    }catch(error){  

        return new Response(JSON.stringify({success:false, message:error.message}))

    }finally{
        if(connection) connection.end()
    }
}