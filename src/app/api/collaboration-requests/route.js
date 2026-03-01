import { databaseConnection, executeQuery, getLoggedInUsername } from '@/app/api/utils'
import { sendEmail } from '../utils/email'
import Notification from '../notifications/utils'
import { getCollaborationAcceptedEmail } from './utils'
import { getCollaborationIgnoredEmail } from './utils'
export async function POST(request) {
    let connection

    try {
        const body = await request.json()
        const { post_id, action } = body

        if (!post_id || !['accept', 'ignore'].includes(action)) {
            return new Response(JSON.stringify({
                success: false,
                msg: "post_id and valid action (accept/ignore) required"
            }), { status: 400 })
        }

        const { username: loggedInUsername } = getLoggedInUsername()

        if (!loggedInUsername) {
            return new Response(JSON.stringify({
                success: false,
                msg: "Unauthorized"
            }), { status: 401 })
        }

        connection = await databaseConnection()
        await executeQuery(connection, "START TRANSACTION")

        // Check if invitation exists
        const checkQuery = `
            SELECT *
            FROM post_collaborators
            WHERE post_id = '${post_id}'
            AND username = '${loggedInUsername}'
            LIMIT 1
        `

        const result = await executeQuery(connection, checkQuery)

        if (result.length === 0) {
            await executeQuery(connection, "ROLLBACK")
            return new Response(JSON.stringify({
                success: false,
                msg: "Invitation not found"
            }), { status: 404 })
        }

        if (action === 'accept') {
            await executeQuery(connection, `
                UPDATE post_collaborators
                SET accepted_invite = 1
                WHERE post_id = '${post_id}'
                AND username = '${loggedInUsername}'
            `)
        }

        if (action === 'ignore') {
            await executeQuery(connection, `
                UPDATE post_collaborators
                SET accepted_invite = 2
                WHERE post_id = '${post_id}'
                AND username = '${loggedInUsername}'
            `)
        }

            let noti = new Notification(connection) 
const postResult = await executeQuery(connection, `
    SELECT 
        posts.username,
        users.email,
        user_more_info.name
    FROM posts
    JOIN users
        ON users.username = posts.username
    JOIN user_more_info 
        ON user_more_info.username = posts.username
    WHERE posts.id = '${post_id}'
    LIMIT 1
`);
const post_creator = postResult[0].username;
const post_creator_name = postResult[0].name;
const post_creator_email = postResult[0].email;

        if(action == 'accept'){

            await noti.save(post_creator, loggedInUsername, 'collaboration_request_accepted', post_id) 
            if(post_creator_email && post_creator_email?.trim()?.length > 0)
await sendEmail(
    {
    to: post_creator_email,
    subject: 'Collaboration Request accepted by @' + loggedInUsername,
    html:  getCollaborationAcceptedEmail({
            name: post_creator_name,
            collaboratorName: '@' + loggedInUsername,
            postId: post_id
        })
    }
 
);
                
        }else{

            await noti.save(post_creator, loggedInUsername, 'collaboration_request_ignored', post_id) 
await sendEmail(
    {
        to: post_creator_email,
        subject: 'Collaboration Request declined by @' + loggedInUsername,
        html: getCollaborationIgnoredEmail({
            name: post_creator_name,
            collaboratorName: '@' + loggedInUsername,
            postId: post_id
        })
    }
);
        }

        await executeQuery(connection, "COMMIT")

        return new Response(JSON.stringify({
            success: true,
            msg: action === 'accept'
                ? "Collaboration accepted"
                : "Collaboration ignored"
        }), { status: 200 })

    } catch (error) {

        if (connection) {
            await executeQuery(connection, "ROLLBACK")
        }

        return new Response(JSON.stringify({
            success: false,
            msg: error.message
        }), { status: 500 })

    } finally {
        if (connection) {
            try {
                await connection.end()
            } catch (err) {
                console.error("Error closing DB:", err)
            }
        }
    }
}