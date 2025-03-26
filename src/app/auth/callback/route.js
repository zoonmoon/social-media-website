import jwt from 'jsonwebtoken'

/* sign in with apple */

import { handleLogin } from '@/app/api/auth/login/utils';

export async function POST(request) {

    const rawBody = await request.text(); // Read the request body as a text string

    const params = new URLSearchParams(rawBody);

    const id_token = params.get('id_token');

    const decodedJWT = jwt.decode(id_token);

    const picture = ''
    let name = ''
    let sub = decodedJWT.sub 

    if(typeof(decodedJWT.name) != "undefined"){
        name = decodedJWT.name 
    }else{
        name = decodedJWT.email.split('@')[0]
    }

    const loggedIn = await handleLogin(sub, 'apple', name, picture)

    if(loggedIn === true){

        // throw new Error('An error occured. Please try again.')
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/feed"
            }
        });

    }else{
        // throw new Error('An error occured. Please try again.')
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/login"
            }
        });
    }



    
}