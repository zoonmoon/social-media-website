'use client'
import { Box, Divider, Paper, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import Link from "next/link";
import { pOSTRequest } from "@/app/_components/file_upload";
import { Button } from "@mui/joy";

export default function User({params}){

    const [paypal_billing_email, setPaypalBillingEmail] = useState('')
    const [isLoading, setIsLoading] = useState(true) 
    const [isSuccess, setIsSuccess] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(()=> {
        async function fetchData(){
            try{
                
                setIsLoading(true)
                const response = await fetch('/api/settings/receiving-account')
                const paypal_billing_email_json = await response.json()
                setPaypalBillingEmail(paypal_billing_email_json.paypal_billing_email)
                if(paypal_billing_email_json?.msg == "Please log in"){
                    setIsSuccess(false)
                    window.location.href ="/login?on_login_redirect_to=/settings/receiving-account"
                }
            }catch(error){
                
            }finally{
                setIsLoading(false)
            }
        }

        fetchData()

    }, [])

    if(isLoading || !isSuccess){
        return <h1>Please Wait</h1>
    }

    const submitData = async () => {
        try{
            const formData = new FormData();
            setIsSaving(true)
            formData.append('paypal_billing_email', paypal_billing_email)
            const response = await pOSTRequest(formData, '/api/settings/receiving-account')
            
            if(response.success == false){
                throw new Error(response.msg)
            }

            toast('Email saved')
        }catch(error){
            toast(error.message)
        }finally{
            setIsSaving(false)
        }
    }

    return(
        <Paper sx={{padding: '15px', marginTop: '20px'}}>
            <Box>
              <Typography variant="h6">Enter Paypal email address</Typography>
              <small>This account will be designated to receive funds sent by your supporters</small>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={paypal_billing_email}
                onChange={(e) => setPaypalBillingEmail(e.target.value)}
              />
              <Button
                variant="solid"
                sx={{marginTop: '10px'}}
                onClick={submitData}
                loading={isSaving}
                fullWidth
              >
                Save
              </Button>
            </Box>

            <Divider sx={{margin:'20px 0'}}/>
                    <Link href={'/blogs-v2/earn-money-online-here-creatives'}>
      <Button variant={'plain'}>How to Earn Income</Button>
    </Link>

        </Paper>
    )
}