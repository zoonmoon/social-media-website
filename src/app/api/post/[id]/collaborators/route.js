import { databaseConnection, executeQuery, getLoggedInUsername } from '@/app/api/utils'

import Notification from '@/app/api/notifications/utils'
import { sendEmail } from '@/app/api/utils/email'
import { getNewCollaborationRequestEmail } from '@/app/api/collaboration-requests/utils'

export async function POST(request) {

    let connection

    try {
        const body = await request.json()
        const { post_id, collaborators } = body

        if (!post_id || !Array.isArray(collaborators)) {
            return new Response(JSON.stringify({
                success: false,
                msg: "post_id and collaborators array are required"
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

        // Begin transaction
        await executeQuery(connection, "START TRANSACTION")

        // 1️⃣ Check ownership
        const postQuery = `
            SELECT username
            FROM posts
            WHERE id = '${post_id}'
            LIMIT 1
        `

        const postResult = await executeQuery(connection, postQuery)

        if (postResult.length === 0 || postResult[0].username !== loggedInUsername) {
            await executeQuery(connection, "ROLLBACK")
            return new Response(JSON.stringify({
                success: false,
                msg: "Not authorized"
            }), { status: 403 })
        }




        // 2️⃣ Fetch existing collaborators
const existingQuery = `
    SELECT username 
    FROM post_collaborators 
    WHERE post_id = '${post_id}'
`

const existingRows = await executeQuery(connection, existingQuery)
const existingUsers = existingRows.map(row => row.username)

console.log("existingUsers", existingUsers) 

// 3️⃣ Find differences
const newUniqueUsers = collaborators.filter(
    user => !existingUsers.includes(user)
)

const removedUsers = existingUsers.filter(
    user => !collaborators.includes(user)
)



        // 2️⃣ Delete collaborators not in new list
        if (collaborators.length > 0) {
            const deleteQuery = `
                DELETE FROM post_collaborators
                WHERE post_id = '${post_id}'
                AND username NOT IN (${collaborators.map(u => `'${u}'`).join(',')})
            `
            await executeQuery(connection, deleteQuery)
        } else {
            // If empty array → remove all collaborators
            await executeQuery(connection, `
                DELETE FROM post_collaborators
                WHERE post_id = '${post_id}'
            `)
        }






        // 3️⃣ Insert new collaborators
        if (collaborators.length > 0) {
            const values = collaborators
                .map(user => `('${post_id}', '${user}', 0)`)
                .join(',')

            const insertQuery = `
                INSERT INTO post_collaborators (post_id, username, accepted_invite)
                VALUES ${values}
                ON DUPLICATE KEY UPDATE username = username
            `

            await executeQuery(connection, insertQuery)
        }
        
        for (const user of newUniqueUsers){
            var noti = new Notification(connection)
            await noti.save(user, loggedInUsername, 'added_as_collaborator', post_id)
        }

        console.log("new userns", newUniqueUsers)

        await executeQuery(connection, "COMMIT")

if(newUniqueUsers.length > 0){

const query = `
    SELECT 
        users.username,
        users.email,
        user_more_info.name
    FROM users
    JOIN user_more_info
        ON user_more_info.username = users.username
    WHERE users.username IN (${newUniqueUsers.map(u => `'${u.replace(/'/g, "\\'")}'`).join(',')})
    AND users.email IS NOT NULL
`;
let newUsersToBeEmailNotified = await executeQuery(connection, query) 
newUsersToBeEmailNotified = newUsersToBeEmailNotified.filter(e => e!= null )

console.log("newUsersToBeEmailNotified", newUsersToBeEmailNotified)
        for(const user of newUsersToBeEmailNotified){
console.log("user loop", user)

console.log("sendEmail:", sendEmail);
console.log("sendEmail type:", typeof sendEmail);
console.log("sendEmail source:", sendEmail?.toString());
await sendEmail({
    to: user.email,
    subject:  'New collaboration request received',
    html: getNewCollaborationRequestEmail({
        name: user.name,
        requestSentBy: `@${loggedInUsername}`,
        postId: post_id
    })
}
);
        }
    }



        return new Response(JSON.stringify({
            success: true,
            msg: "Collaborators synced successfully"
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


export async function GET(request, {params}) {

    let connection

    try {
        const { searchParams } = new URL(request.url)
        let post_id = params.id

        if (!post_id) {
            return new Response(JSON.stringify({
                success: false,
                msg: "post_id is required"
            }), { status: 400 })
        }

        connection = await databaseConnection()

        const query = `
            SELECT 
                pc.username,
                u.name,
                u.profile_pic_src,
                pc.accepted_invite
            FROM post_collaborators pc
            INNER JOIN user_more_info u
                ON pc.username = u.username
            WHERE pc.post_id = '${post_id}'
        `

        const collaborators = await executeQuery(connection, query)

        return new Response(JSON.stringify({
            success: true,
            collaborators
        }), { status: 200 })

    } catch (error) {

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