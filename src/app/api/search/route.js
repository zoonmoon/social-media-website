import { databaseConnection, executeQuery, getLoggedInUsername } from '@/app/api/utils'

export async function GET(request) {

    const { searchParams } = new URL(request.url)
    const sq = searchParams.get('query') || ''

    const { username: loggedInUsername } = getLoggedInUsername()

    let connection

    try {
        connection = await databaseConnection()

        const query = `
            SELECT DISTINCT
                u.username,
                m.name,
                m.profile_pic_src
            FROM users u
            INNER JOIN user_more_info m 
                ON u.username = m.username
            WHERE 
                u.username != '${loggedInUsername}'
                AND (
                    u.username LIKE '%${sq}%'
                    OR m.name LIKE '%${sq}%'
                )
            LIMIT 50
        `

        const suggestions = await executeQuery(connection, query)

        return new Response(JSON.stringify({ success: true, suggestions }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        })

    } catch (error) {

        return new Response(JSON.stringify({ success: false, msg: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        })

    } finally {
        if (connection) {
            try {
                await connection.end()
            } catch (err) {
                console.error("Error closing DB connection:", err)
            }
        }
    }
}