export async function POST() {
    console.log("from callback")
    return new Response(null, {
        status: 302,
        headers: {
            Location: "/login"
        }
    });
}