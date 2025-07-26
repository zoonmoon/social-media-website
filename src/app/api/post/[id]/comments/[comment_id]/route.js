import { databaseConnection, executeQuery } from "@/app/api/utils";
import { getLoggedInUsername } from "@/app/api/utils";
import mysql from 'mysql2'
export async function PUT(request, {params}){
    let connection = false
    try{

        connection = await databaseConnection()

        const data = await request.formData()

        const comment = data.get('comment') 
        const commentID = params.comment_id 

        const {token_exists, username} = getLoggedInUsername()

        if(token_exists !== true) throw new Error("Please log in to comment")
        
        const escapedComment = mysql.escape(comment);
        
        let query = ` UPDATE post_comments SET  cmt =  ${escapedComment}
            WHERE username = '${username}' AND id = ${commentID} 
        `;

        const result = await executeQuery(connection, query) 
        
        return new Response(JSON.stringify({ success: true, cmt: {...result }}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    }catch(error){

        return new Response(JSON.stringify({ success: false, msg:error.message}), {
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

export async function DELETE(request, { params }) {
    let connection = false;
    try {
        connection = await databaseConnection();

        const commentID = params.comment_id;

        const { token_exists, username } = getLoggedInUsername();
        if (token_exists !== true) throw new Error("Please log in to delete your comment");

        const query = `
            DELETE FROM post_comments 
            WHERE id = ${commentID} AND username = '${username}'
        `;

        const result = await executeQuery(connection, query);

        return new Response(JSON.stringify({ success: true, deleted: result }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } catch (error) {
        return new Response(JSON.stringify({ success: false, msg: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } finally {
        if (connection) {
            connection.end();
        }
    }
}