import jwt from 'jsonwebtoken'

/* sign in with apple */

export async function POST(request) {

    const rawBody = await request.text(); // Read the request body as a text string

    const params = new URLSearchParams(rawBody);

    const id_token = params.get('id_token');

    // throw new Error('An error occured. Please try again.')
    return new Response(null, {
        status: 302,
        headers: {
            Location: "/login?apple_id_token="+id_token
        }
    });

}