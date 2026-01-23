import { databaseConnection, executeQuery, getLoggedInUsername } from "../utils";

/**
 * GET
 * Read email notification setting
 */
export async function GET() {
    let connection = false;

    try {
        const { token_exists, username } = getLoggedInUsername();
        if (!token_exists) throw new Error("Please log in");

        connection = await databaseConnection();

        const query = `
            SELECT has_unsubscribed
            FROM user_more_info
            WHERE username = '${username}'
            LIMIT 1
        `;

        const result = await executeQuery(connection, query);

        return new Response(JSON.stringify({
            success: true,
            result: {
                enabled: result.length === 0 ? true : result[0].has_unsubscribed === 0
            }
        }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            msg: error.message
        }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } finally {
        if (connection) connection.end();
    }
}

/**
 * POST
 * Save email notification setting
 */
export async function POST(request) {
    let connection = false;

    try {
        const { token_exists, username } = getLoggedInUsername();
        if (!token_exists) throw new Error("Please log in");

        const body = await request.json();
        if (typeof body.enabled !== "boolean") {
            throw new Error("Invalid data");
        }

        const has_unsubscribed = body.enabled ? 0 : 1;

        connection = await databaseConnection();

        const query = `
            UPDATE user_more_info
            SET has_unsubscribed = ${has_unsubscribed}
            WHERE username = '${username}'
        `;

        await executeQuery(connection, query);

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            msg: error.message
        }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } finally {
        if (connection) connection.end();
    }
}
