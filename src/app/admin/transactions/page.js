'use client'
import { useEffect, useState } from "react";
import { Chip, Container, Grid, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Link from "next/link";
import ArticleIcon from '@mui/icons-material/Article';
import PaidIcon from '@mui/icons-material/Paid';
import Header from "@/app/_components/_header";

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

]

function truncateToTwo(num) {
    return Math.trunc(num * 100) / 100;
}

function calculateOriginalAmount(finalAmount) {

    let originalAmount = ((finalAmount + 0.74) / 0.8151);

    // Return the original amount, commission, and total taxes deducted
    return {
        originalAmount: truncateToTwo(originalAmount),
        commission: truncateToTwo((originalAmount * 0.15)),
        totalTaxesDeducted: truncateToTwo(originalAmount - originalAmount * 0.15 - finalAmount )
    };
}


export default function Admin(){

    const [transactions, setTransactions] = useState([])
    const [isLoading, setIsLoading] = useState(true) 

    const fetchTransactions  = async () => {

        const resp = await fetch('/api/admin/transactions')
        const respjson = await resp.json() 
        if(respjson.success == true) setTransactions(respjson.supportHistory) 
        setIsLoading(false)

    }

    useEffect(()=>{
        fetchTransactions()
    }, [])

    return(
        <>
            <Header />
           
            <Container sx={{marginTop:'30px'}} maxWidth={'lg'}>

                <Paper style={{display:'flex', marginBottom:'20px', justifyContent:'center', padding:'10px 20px', }}>
                    <Typography variant="h5">Transactions</Typography>
                </Paper>

                {
                    isLoading ? (
                        <Paper sx={{padding:'20px'}}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                            <TableCell><Skeleton animation="wave" /></TableCell>
                                            <TableCell><Skeleton animation="wave" /></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            [1,2,3,4,5].map((v, index) => {
                                                return(
                                                    <TableRow key={index}>
                                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                                        <TableCell><Skeleton animation="wave" /></TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                        </Paper>
                    ) : (
                        <Paper sx={{padding:'20px'}}>
                            {
                                transactions.length > 0 ? (
                                    <TableContainer>
                                        <Table>
                                        <TableHead>
                                            <TableRow>
                                            <TableCell>SN</TableCell>
                                            <TableCell>Supported By</TableCell>
                                            <TableCell>Supported To</TableCell>
                                            <TableCell>Received (USD)</TableCell>
                                            <TableCell>Commission (USD)</TableCell>
                                            <TableCell>Taxes (USD)</TableCell>
                                            <TableCell>Payout (USD)</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Comment</TableCell>
                                            <TableCell>Date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {transactions.map((s, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell> {/* Serial number */}
                                                <TableCell>
                                                    <Link href={'#'}>
                                                        @{s.supported_by}
                                                    </Link>                    
                                                </TableCell> {/* Supported By */}

                                                <TableCell>
                                                    <Link href={'#'}>
                                                        @{s.supported_to}
                                                    </Link>                    
                                                </TableCell> {/* Supported By */}
                                                <TableCell>{calculateOriginalAmount(s.amount).originalAmount}</TableCell>
                                                <TableCell>{calculateOriginalAmount(s.amount).commission}</TableCell>
                                                <TableCell>{calculateOriginalAmount(s.amount).totalTaxesDeducted}</TableCell>
                                                <TableCell>{s.amount.toFixed(2)}</TableCell> {/* Amount */}
                                                <TableCell>
                                                    {
                                                        s.is_payout_success == 1 
                                                            ? <Chip label={'success'} variant={'filled'} color={'success'} />
                                                            : <Chip label={'failed'} variant={'filled'}  color={'error'} />
                                                    }
                                                </TableCell>
                                                <TableCell>-</TableCell>
                                                <TableCell>{new Date(s.created_at).toLocaleDateString()}</TableCell> {/* Date */}
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <Paper>
                                        <h1>No Transactions found</h1>
                                    </Paper>
                                )
                            }
                        </Paper>
                    )
                }
            </Container>
        </>
    )
}