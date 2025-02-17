'use client'
import { useEffect, useState } from "react";
import AdminPanel from "./_admin-panel";
import toast from "react-hot-toast";
import LoginFormForAdmin from "./login_form_for_admin";



export default function Admin(){

    const [isLoggedInAsAdmin, setIsLoggedInAsAdmin] = useState(false)
    
    const [isLoading, setIsLoading] = useState(true)

    const onLoggedIn = () => {
        setIsLoggedInAsAdmin(true)
    }

    useEffect(() => {
        const fetchAdminStatus = async () => {
            try {
                setIsLoading(true);
                setIsLoggedInAsAdmin(true);
            } catch (error) {
                toast(error);
            } finally {
                console.log("setting false to isLoading")
                setIsLoading(false)
            }
        };

        fetchAdminStatus();
        
    }, []); // Empty dependency array means this runs once on mount.

    if(isLoading){
        
        return(
            <>
                <h1>Loading</h1>
            </>
        )
        
    }

    return(
        <>
            {
                isLoggedInAsAdmin ? <AdminPanel /> : <LoginFormForAdmin onLoggedIn={onLoggedIn} />
            }
        </>
    );    
}

