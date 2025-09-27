'use client'
import { useEffect, useState } from "react";
import Header from "../_components/_header";
import { Container, Grid, Paper, Skeleton, Typography } from "@mui/material";
import Link from "next/link";
import ArticleIcon from '@mui/icons-material/Article';
import PaidIcon from '@mui/icons-material/Paid';
import  VerifiedUserTwoTone from "@mui/icons-material/VerifiedUserTwoTone";
import Person4Icon from '@mui/icons-material/Person4';

const adminBlocks = [
    {
        link: '/admin/transactions',
        title: 'Transactions',
        icon: <PaidIcon fontSize={'large'} />
    },
    {
        link: '/blogs',
        title: "Blogs",
        icon: <ArticleIcon  fontSize={'large'} />
    },
    {
        link: '/artists-of-months',
        title: "Artists of Months",
        icon: <Person4Icon  fontSize={'large'} />
    },

]

export default function Admin(){

    const [hasAdminAccess, setHasAdminAccess] = useState(false)
    const [isLoading, setIsLoading] = useState(true) 

    const fetchAdminInfo  = async () => {

        const resp = await fetch('/api/admin/auth/verify-is-admin')
        const respjson =await resp.json() 
        if(respjson.is_admin == true) setHasAdminAccess(true) 
        setIsLoading(false)

    }

    useEffect(()=>{
        fetchAdminInfo()
    }, [])

    return(
        <>
            <Header />
            <Container sx={{marginTop:'30px'}} maxWidth={'lg'}>
                {
                    isLoading ? (
                        <Grid container spacing={2}>
                            {
                                [1,2,3].map((v, index) => {
                                    return(
                                        <Grid key={index} item xs={12} md={3}>
                                            <Paper sx={{height:'150px', justifyContent:'center', display:'flex', alignItems:'center'}}>
                                                <div style={{display:'flex', gap:'10px', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                                    <Skeleton  sx={{alignSelf:'center'}} variant="circular" width={60} height={60} />
                                                    <Skeleton  variant={'rectangular'} width={100} height={30} />
                                                </div>
                                            </Paper>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    ) : (
                        <>
                            {
                                hasAdminAccess ? (
                                    <Grid container spacing={2}>
                                        {
                                            adminBlocks.map((block, index) => {
                                                return(
                                                    <Grid key={index} item xs={12} md={3}>
                                                        <Link style={{textDecoration:'none', color:'unset'}} href={block.link}>
                                                            <Paper sx={{height:'150px', justifyContent:'center', display:'flex', alignItems:'center'}}>
                                                                <div style={{display:'flex', gap:'10px', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                                                    {block.icon}
                                                                    <Typography variant="h5" gutterBottom>
                                                                        {block.title}
                                                                    </Typography>
                                                                </div>
                                                            </Paper>
                                                        </Link>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>              
                                ) : (
                                    <Paper sx={{padding:'5px'}}>
                                        <h1>Not Authorized</h1>
                                    </Paper>
                                )
                            }
                        </>
                    )
                }
            </Container>
        </>
    )
}