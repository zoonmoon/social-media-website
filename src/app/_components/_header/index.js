'use client';
import { Button } from "@mui/joy";
import { Skeleton, Stack } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import LoggedInHeader from "./for-logged-in";
import LoggedOutHeader from "./for-not-logged-in";

export default function Header() {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') { // Check if window (client-side) is available
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='));
        
            if (token) {
                setIsLoggedIn(true);
            }
            setIsLoading(false);
        }
    }, []);


    return (
        <div className="header" style={{ backgroundColor: 'white', display: 'flex', minHeight: '70px', justifyContent: 'center', alignItems: 'center' }}>
            {
                isLoading
                    ? (
                        <Skeleton width={250} height={40}></Skeleton>
                    ) : (
                        isLoggedIn
                            ? <LoggedInHeader />
                            : <LoggedOutHeader />
                    )
            }
        </div>
    );
}
