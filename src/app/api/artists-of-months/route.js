import { databaseConnection, isAdmin } from "../utils";
import { executeQuery } from "../utils";

// GET all artists
export async function GET() {
    let connection = false;
    try {
        connection = await databaseConnection();
        const query = `SELECT * FROM artists_of_the_month ORDER BY id DESC LIMIT 20`;
        const artistsOfMonthData = await executeQuery(connection, query);
        return new Response(JSON.stringify({is_admin: isAdmin(), success: true, data: artistsOfMonthData }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        if (connection) connection.end();
    }
}

// POST new artist
export async function POST(request) {
    let connection = false;
    try {
        const body = await request.json();
        const { username, title, image_url } = body;

        if (!username || !title) {
            return new Response(JSON.stringify({ success: false, message: "Username and title are required" }), { status: 400 });
        }

        connection = await databaseConnection();
        const query = `INSERT INTO artists_of_the_month (username, title, image_url) VALUES ('${username}', '${title}', '${image_url || null}')`;
        const result = await executeQuery(connection, query);

        return new Response(JSON.stringify({ success: true, data: { id: result.insertId, username, title, image_url } }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        if (connection) connection.end();
    }
}

// PUT / update artist by id
export async function PUT(request) {
    let connection = false;
    try {
        const body = await request.json();
        const { id, username, title, image_url } = body;

        if (!id) {
            return new Response(JSON.stringify({ success: false, message: "ID is required" }), { status: 400 });
        }

        connection = await databaseConnection();
        const query = `UPDATE artists_of_the_month SET 
                        username = '${username || ''}', 
                        title = '${title || ''}', 
                       WHERE id = ${id}`;
        await executeQuery(connection, query);

        return new Response(JSON.stringify({ success: true, message: "Artist updated successfully" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        if (connection) connection.end();
    }
}

// DELETE artist by id
export async function DELETE(request) {
    let connection = false;
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return new Response(JSON.stringify({ success: false, message: "ID is required" }), { status: 400 });
        }

        connection = await databaseConnection();
        const query = `DELETE FROM artists_of_the_month WHERE id = ${id}`;
        await executeQuery(connection, query);

        return new Response(JSON.stringify({ success: true, message: "Artist deleted successfully" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        if (connection) connection.end();
    }
}
