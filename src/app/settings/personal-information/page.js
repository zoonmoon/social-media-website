'use client'
import { Alert, Box, Divider, Grid, Paper, Skeleton, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import Link from "next/link";
import { pOSTRequest } from "@/app/_components/file_upload";
import { Button } from "@mui/joy";
import UploadMediaWidget from "@/app/_components/_media-upload";

export default function User({params}){

    const [name, setName] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [coverPic, setCoverPic] = useState('')
    const [bio, setBio] = useState('')

    const [isLoading, setIsLoading] = useState(true) 

    const [isSaving, setIsSaving] = useState(false)

    useEffect(()=> {
        async function fetchData(){
            try{
                
                setIsLoading(true)

                const response = await fetch('/api/settings/personal-info')
                const responseJSON = (await response.json()).result 

                setName(responseJSON.name || '') 
                setProfilePic(responseJSON.profile_pic_src || '')
                setCoverPic(responseJSON.cover_pic_src || '')
                setBio(responseJSON.bio || '')

            }catch(error){
                
            }finally{
                setIsLoading(false)
            }
        }

        fetchData()

    }, [])

    if(isLoading){
        return (
            <Paper sx={{padding: '15px', marginTop: '20px'}}>
                <Stack spacing={3}>
                    <Skeleton variant="rectangular" width={'100%'} height={50} />
                    <Skeleton variant="rectangular" width={'100%'} height={50} />
                    <Skeleton variant="rectangular" width={'100%'} height={50} />
                    <Skeleton variant="rectangular" width={'100%'} height={50} />
                </Stack>
            </Paper>
        )
    }


    const coverPicSuccess = (img_url_after_upload) => setCoverPic(img_url_after_upload)
    const profilePicSuccess = (img_url_after_upload) => setProfilePic(img_url_after_upload)
    
    const submitData = async () => {
        try{
            
            if(name == null || name.trim().length == 0){
                throw new Error('Invalid name')
            }

            const formData = new FormData();
            
            setIsSaving(true)
            
            formData.append('name', name)
            formData.append('profile_pic', profilePic)
            formData.append('cover_pic', coverPic)
            formData.append('bio', bio)
                
            const response = await pOSTRequest(formData, '/api/settings/personal-info')

            if(response.success == false){
                throw new Error(response.msg)
            }
            
            toast("Changes saved")

        }catch(error){
            toast(error.message)
        }finally{
            setIsSaving(false)
        }
    }

    return(
        <Paper sx={{padding: '15px', marginTop: '20px'}}>

            <Alert severity={'info'}>
                Click on &quot;Save&quot; button at bottom of the page after making changes. Username will remain same even if name is changed.
            </Alert>

            <Stack spacing={2} sx={{marginBottom:'20px', marginTop:'10px'}}>
                <div>
                    <Typography variant="h6">Name</Typography>
                    <TextField
                        label=""
                        variant="outlined"
                        fullWidth
                        sx={{marginTop:'5px'}}
                        margin="normal"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <Grid container sx={{alignItems:'center'}}>
                    <Grid item xs={6}>
                        <Typography variant="h6">Profile Picture</Typography>
                        <UploadMediaWidget onSuccess={profilePicSuccess} />
                    </Grid>
                    {
                        profilePic != ''
                        ?   <Grid sx={{display:'flex', justifyContent:'end'}} item xs={6}>
                                <img src={profilePic} style={{width: '100px', borderRadius:'50%', height:'100px', objectFit:'cover'}} />
                            </Grid>
                        : <></>
                    }
                </Grid>

                <div>
                    <Typography variant="h6">Bio <small><small>(250 characters max)</small></small></Typography>
                    <TextField
                        label=""
                        variant="outlined"
                        fullWidth
                        sx={{marginTop:'5px'}}
                        margin="normal"
                        defaultValue={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>

                <Grid container sx={{alignItems:'center'}}>
                    <Grid item xs={6}>
                        <Typography variant="h6">Cover Picture</Typography>
                        <UploadMediaWidget onSuccess={coverPicSuccess} />
                    </Grid>
                    {
                        coverPic != ''
                        ?   <Grid sx={{display:'flex', justifyContent:'end'}} item xs={6}>
                                <img src={coverPic} style={{width: '100px', height:'100px', objectFit:'cover'}}  />
                            </Grid>
                        : <></>
                    }
                </Grid>

            </Stack>

            <Divider></Divider>

            <Button
                variant="solid"
                sx={{marginTop: '20px'}}
                onClick={submitData}
                loading={isSaving}
                fullWidth
            >
                Save
            </Button>

        </Paper>
    )
}