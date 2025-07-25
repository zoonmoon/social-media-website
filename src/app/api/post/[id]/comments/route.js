import { databaseConnection, executeQuery } from "@/app/api/utils";
import { getLoggedInUsername } from "@/app/api/utils";
import Notification from "@/app/api/notifications/utils";
import mysql from 'mysql2'
export async function POST(request, {params}){
    let connection = false
    try{

        connection = await databaseConnection()

        const data = await request.formData()

        const post_id = params.id 
        const comment = data.get('comment') 
        const parent_id = data.get('parent_id')

        const {token_exists, username} = getLoggedInUsername()

        if(token_exists !== true) throw new Error("Please log in to comment")
        
        const escapedComment = mysql.escape(comment);
        
        let query = `INSERT INTO post_comments ( post_id, username, cmt, parent_id) 
            VALUES('${post_id}', '${username}', ${escapedComment}, ${parent_id} )
        `;

        const result = await executeQuery(connection, query) 



        let query3 = `SELECT username from posts where id = '${post_id}' ;`

        let results = await executeQuery(connection, query3) 

        let postOwner =  results[0].username 

        if(postOwner != username){

            const noti = new Notification(connection) 

            await noti.save(postOwner, username, 'post_comment', post_id)
    
        }


        let query2 = `SELECT cmt, pc.username, parent_id, pc.id , profile_pic_src, name  FROM post_comments pc
            INNER JOIN user_more_info umi ON pc.username = umi.username
            WHERE pc.id=${result.insertId}
        `
        let query2Resp = await executeQuery(connection, query2) 

        query2Resp = query2Resp[0]
        return new Response(JSON.stringify({ success: true, cmt: {...query2Resp , is_editable: true}}), {
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

export async function GET(request, {params}){

    let connection = false 

    try{

        let post_id = params.id

        connection = await databaseConnection()

        let query = `
            SELECT cmt, profile_pic_src, pc.username, parent_id, pc.id , name FROM post_comments pc
            INNER JOIN  posts ON posts.id = '${post_id}' AND pc.post_id = posts.id 
            INNER JOIN user_more_info umi ON umi.username = pc.username
            WHERE posts.id = '${post_id}'
            ORDER BY pc.id DESC
        `

        let likesResponse = await executeQuery(connection, query) 

        let isLoggedIn = false 

        const {token_exists, username} = getLoggedInUsername()

        if(token_exists === true ) isLoggedIn = true 
        

        return new Response(
            JSON.stringify(
                {  
                    success: true, 
                    moreDataExists:false, 
                    comments: likesResponse.map(c => ({...c, is_editable: ( isLoggedIn && username === c.username )  ? true  : false}))
                }
            ), 
            {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 200
            }
        );

    }catch(error){
        return new Response(JSON.stringify({ success: false, msg: error.message  }), {
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
