import FacebookSignIn from "./_facebook-sign-in";

import GoogleSignInButton from "./_google-sign-in";

import { Stack, Divider } from "@mui/material";

import Alert from '@mui/material/Alert';

import MyAppleSigninButton from "./_apple-sign-in";

import { useEffect, useState } from "react";
import { Button } from "@mui/joy";

import toast from "react-hot-toast";
import { setLazyProp } from "next/dist/server/api-utils";

export default function ThirdPartySignIns(){

    const [isLoggingToApple, setIsLoggingToApple] = useState(false) 

    useEffect(  () => {

        const params = new URLSearchParams(window.location.search);

        const appleIdToken = params.get("apple_id_token");

        if (appleIdToken) {
            
            setIsLoggingToApple(true) 

            loginToApple(appleIdToken)

        }

    }, [])

    const loginToApple = async (appleIdToken) => {

        const formData = new FormData() 
        
        formData.append('id_token', appleIdToken)
        
        try{

            const response = await fetch('/api/auth/login/apple', { // Replace with your actual endpoint
                method: 'POST',
                body: formData
            });
    
            const result = await response.json();
    
            if (result.success === true ) {
                toast("Login successful");
                window.location.href ="/feed"
            } else {
                throw new Error('Login Failed')
            }

        }catch(error){
            toast("Login failed");
            setIsLoggingToApple(false) 
        }


    }

    if(isLoggingToApple){
        return(
            <Button fullWidth loading={true} />
        )
    }

    return(
        <Stack spacing={3}>
            
            <Alert severity="info">
                Please choose one of following social logins to get started.
            </Alert>
            <div style={{display:'flex', justifyContent:'center'}}>
                <GoogleSignInButton   />
            </div>
            <Divider>or</Divider>

            <div style={{display:'flex', marginTop:'10px', justifyContent:'center'}}>
                {
                    isLoggingToApple
                        ? <Button loading={true} />
                        : <MyAppleSigninButton />
                }
            </div>

        </Stack>
    )
}