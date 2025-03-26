export async function POST(request) {

    console.log("from callback")
    console.log(request)

    const rawBody = await request.text(); // Read the request body as a text string
    console.log("Raw Body:", rawBody);


    return new Response(null, {
        status: 302,
        headers: {
            Location: "/login"
        }
    });
    
}