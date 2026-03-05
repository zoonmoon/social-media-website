'use client'

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import ThirdPartySignIns from './_third-party-sign-ins';
import { Alert } from '@mui/material';
import Header from '../_components/_header';
import { useEffect, useState } from 'react';

export default function LandingPage(){

    const [showNotificationAlert, setShowNotificationAlert] = useState(false);

    useEffect(() => {

        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='));

        if (token) {
            window.location.href = '/'
        }

        if (window.location.href.includes('notifications')) {
            setShowNotificationAlert(true);
        }

    }, []);

    return (
        <div>
            <Header />

            <Container maxWidth="xs" sx={{marginTop: {xs: '30px', lg: '100px'}}}>

                {showNotificationAlert && (
                    <Paper sx={{padding: '20px', marginBottom: '20px'}}>
                        <Alert severity={'error'}>
                            Please log in to manage your email notification preferences.
                        </Alert>
                    </Paper>
                )}

                <Paper sx={{padding: '30px'}}>
                    <ThirdPartySignIns />
                </Paper>

            </Container>
        </div>
    );
}