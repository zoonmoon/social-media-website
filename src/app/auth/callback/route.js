import jwt from 'jsonwebtoken'

export async function POST(request) {


    const rawBody = await request.text(); // Read the request body as a text string

    const params = new URLSearchParams(rawBody);

    const id_token = params.get('id_token');

    const decodedJWT = jwt.decode(id_token);

    console.log(decodedJWT)

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/login"
        }
    });
    
}