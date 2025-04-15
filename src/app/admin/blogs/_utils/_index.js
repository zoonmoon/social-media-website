'use client'
import { Alert, Divider, Grid, Paper, Skeleton, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { pOSTRequest } from "@/app/_components/file_upload";
import { Button } from "@mui/joy";
import UploadMediaWidget from "@/app/_components/_media-upload";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function BlogCreateOrEdit(
    {
        slug = null, 
        defaultTitle = '', 
        defaultthumbNail = '', 
        defaultBlogContent = '', 
        submissionCallback = () => {}
    }
){

    // if id != null, it is edit
    // eles it is create new
    // the actionsEndpoint

    const [actionEndPoint, actionMethod, buttonText, successText] = slug !== null 
        ? [`/api/admin/blogs/${slug}`, 'POST', 'Edit Blog', 'Changes saved']
        : [`/api/admin/blogs/new`, 'POST', 'Create new Blog', 'Blog created']

    const [title, setTitle] = useState(defaultTitle)
    const [thumbNail, setThumbNail] = useState(defaultthumbNail)
    const [blogContent, setBlogContent] = useState(defaultBlogContent)
    const [isSaving, setIsSaving] = useState(false) 

    const thumbNailUploadSuccess = (img_url_after_upload) => setThumbNail(img_url_after_upload)
    
    const submitData = async () => {

        try{
            
            if(title == null || title.trim().length == 0){
                throw new Error('Invalid title')
            }

            const formData = new FormData();

            setIsSaving(true)
            
            formData.append('title', title)
            formData.append('thumbnail', thumbNail)
            formData.append('content', blogContent)

            const response = await fetch(actionEndPoint, {method: 'POST', body: formData})

            const responseJSON  = await response.json()

            if(responseJSON.success == false){
                throw new Error(responseJSON.message)
            }   

            toast(responseJSON.message) 

            if(slug == null ){
                window.location.href = '/admin/blogs'
            }
            
        }catch(error){
            toast(error.message)
        }finally{
            setIsSaving(false)
        }
    }

    return(

        <div sx={{padding: '15px', marginTop: '20px'}}>

            <Typography variant="h5" sx={{marginBottom:'20px'}}>{buttonText}</Typography>

            <Divider></Divider>

            <Stack spacing={2} sx={{marginBottom:'20px', marginTop:'20px'}}>
                <div>
                    <Typography variant="h6">Title</Typography>
                    <TextField
                        label=""
                        variant="outlined"
                        fullWidth
                        sx={{marginTop:'5px'}}
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <Grid container sx={{alignItems:'center'}}>
                    <Grid item xs={6}>
                        <Typography variant="h6">Thumbnail</Typography>
                        <UploadMediaWidget  onSuccess={thumbNailUploadSuccess} />
                    </Grid>
                    {
                        thumbNail != ''
                        ?   <Grid sx={{display:'flex', justifyContent:'end'}} item xs={6}>
                                <img src={thumbNail} style={{width: '200px', height:'200px', objectFit:'cover'}} />
                            </Grid>
                        : <></>
                    }
                </Grid>
                    
                <div>
                    <Typography variant="h6">Content</Typography>
                    <ReactQuill
                        theme="snow"
                        value={blogContent}
                        className="resizable-editor"
                        onChange={(val) => setBlogContent(val)}
                    />
                </div>


            </Stack>
                
            <Divider></Divider>

            <Button
                variant="solid"
                sx={{marginTop: '20px'}}
                onClick={submitData}
                loading={isSaving}
            >
                {buttonText}
            </Button>

        </div>
    )
}