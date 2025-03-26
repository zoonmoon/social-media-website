import jwt from 'jsonwebtoken'

/* sign in with apple */

import verifyAppleToken from "verify-apple-id-token";


import { handleLogin } from '@/app/api/auth/login/utils';

export async function POST(request) {

    const data = await request.formData()

    const id_token = data.get('id_token');

    try{


        const decodedJWT = await verifyAppleToken({
            idToken: id_token,
            clientId: "art.artxpress.app", // or ["app1ClientId", "app2ClientId"]
            nonce: "nonce", // optional
        });
    
        console.log(decodedJWT) 
    
        return 
        
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
    
            return new Response(JSON.stringify({ success: true}), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 200
            });
    
    
        }

        throw new Error('Login Failed')

    }catch(error){
        return new Response(JSON.stringify({ success: false}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });
    }

}