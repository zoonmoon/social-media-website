'use client'

import Container from '@mui/material/Container';

import Paper from '@mui/material/Paper';

import ThirdPartySignIns from './_third-party-sign-ins';

import { Divider } from '@mui/material';
import Header from '../_components/_header';

import { useEffect, useState } from 'react';

export default function LandingPage(){


    useEffect(() => {
        if (typeof window !== 'undefined') { // Check if window (client-side) is available
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='));
        
            if (token) {
                window.location.href='/'
            }
        }
    }, []);



    return (
        <div>
            <Header />
            <Container maxWidth="xs" sx={{marginTop: {xs: '30px', lg: '100px'}}} >
                <Paper sx={{padding: '30px'}}>
                    <ThirdPartySignIns />
                </Paper>
            </Container>
        </div>
    );
}