export async function POST(request) {

    console.log("from callback")
    console.log(request)
    return new Response(null, {
        status: 302,
        headers: {
            Location: "/login"
        }
    });
    
}