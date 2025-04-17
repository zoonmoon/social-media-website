import { databaseConnection, generateRandomString, getLoggedInUsername } from "@/app/api/utils"
import { isAdmin } from "@/app/api/utils"
import { executeQuery } from "@/app/api/utils"

export async function POST(request, {params}){
    
    let slug = params.slug

    let connection = false 

    try{
        
        if(!isAdmin()) throw new Error('Unauthorized access')

        const {token_exists, username} =  getLoggedInUsername()

        const data = await request.formData()

        const title = data.get('title')

        if(title.trim().length === 0 || title == null ){
            throw new Error('Error')
        }

        const content = data.get('content')
        
        const thumbnail = data.get('thumbnail')
        
        if(slug == 'new' || slug == '' || slug == 'null' || !slug){

            slug = title.toLowerCase().replace(/ /g, '-') + '-'+generateRandomString(5)

        }

        let query = `
            INSERT INTO blogs (slug, title, content, author, status, thumbnail)
            VALUES ('${slug}', '${title}', '${content}', '${username}', 'published', '${thumbnail}')
            ON DUPLICATE KEY UPDATE
                title = VALUES(title),
                content = VALUES(content),
                author = VALUES(author),
                status = VALUES(status),
                thumbnail = VALUES(thumbnail),
                updated_at = CURRENT_TIMESTAMP;
        `

        connection = await databaseConnection()

        // let results = await executeQuery(connection, query) 



        const results = await connection.execute(`
            INSERT INTO blogs (slug, title, content, author, status, thumbnail)
            VALUES (?, ?, ?, ?, 'published', ?)
            ON DUPLICATE KEY UPDATE
                title = VALUES(title),
                content = VALUES(content),
                author = VALUES(author),
                status = VALUES(status),
                thumbnail = VALUES(thumbnail),
                updated_at = CURRENT_TIMESTAMP;
        `, [slug, title, content, username, thumbnail]);
            
        let message= 'Blog created'
        return new Response(JSON.stringify({success:true, message}))
        
    }catch(error){  
        
        return new Response(JSON.stringify({success:false, message: error.message}))

    }finally{
        
        if(connection){
            connection.end()
        }
    
    }

}

export async function GET(request, {params}){
    
    let slug = params.slug

    let connection = false 

    console.log(request)

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

    console.log(request);

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
