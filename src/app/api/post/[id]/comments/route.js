import { databaseConnection, executeQuery } from "@/app/api/utils";
import { getLoggedInUsername } from "@/app/api/utils";
import Notification from "@/app/api/notifications/utils";
import mysql from 'mysql2'
import { sendEmail } from "@/app/api/utils/email";
export async function POST(request, {params}){
    let connection = false
    try{
console.log("helllllllllllllllllll")

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



let query3 = `
SELECT 
    p.username,
    u.email,
    umi.has_unsubscribed,
    umi.name
FROM posts p
JOIN users u 
    ON p.username = u.username
JOIN user_more_info umi 
    ON u.username = umi.username
WHERE p.id = '${post_id}';
`;

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


        try{
console.log("helllllllllllllllllll")

            if(postOwner != username){

                // send email to postowner if postonwer has subscribed 

                var has_unsubscribed  = parseInt (results[0].has_unsubscribed)
                var emailOfOwner = results[0].email
                var nameOfOwner = results[0].name 

console.log("helllllllllllllllllll")

                if(!has_unsubscribed && emailOfOwner && (emailOfOwner?.trim()?.length > 0 )){

                    sendEmail({
                        to: emailOfOwner, 
                        subject: 'New comment by @' + username + ' on your post' , 

html: `
<div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
    
    <p>Hi ${nameOfOwner},</p>

    <p>You’ve received a new comment on your post on <strong>YourArtOn</strong>.</p>

    <p>
        Click the link below to view the post:
    </p>

    <p>
        <a href="https://www.yourarton.com/posts/${post_id}" 
           style="background:#4CAF50;color:#fff;padding:10px 16px;text-decoration:none;border-radius:4px;">
           View Post
        </a>
    </p>

    <hr style="margin:20px 0;">

    <p style="font-size:13px;color:#777;">
        If you no longer wish to receive comment notifications, you can update your preferences here:
    </p>

    <p style="font-size:13px;">
        <a href="https://www.yourarton.com/settings/notifications">
            Manage Notification Settings
        </a>
    </p>

    <p style="font-size:13px;color:#777;">
        Thanks,<br>
        The YourArtOn Team
    </p>

</div>
`

                    })

                }

            }


        }catch(error){
            console.log(error)
        }

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
