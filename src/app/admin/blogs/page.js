'use client'

import { useEffect, useState } from "react";
import LoadingPost from "@/app/_components/_loading-post";
import toast from "react-hot-toast";
import BlogCreateOrEdit from "./_utils/_index";
import { Container, Grid, Paper, Typography } from "@mui/material";
import Header from "@/app/_components/_header";
import Link from "next/link";
import { Button } from "@mui/joy";
import BlogPost from "@/app/_components/_blog_post";

export default function Blogs(){

    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true) 
    
    const [hasAccess, setHasAccess] = useState(false) 

    const fetchBlogs = async () => {

        try{

            setIsLoading(true)

            const blogsResponse  = await fetch('/api/admin/blogs')

            const blogsResponseJSON = await blogsResponse.json() 

            setHasAccess(blogsResponseJSON.hasAdminAccess)

            if(blogsResponseJSON.success !== true) throw new Error('Error fetching blogs')

            setBlogs(blogsResponseJSON.blogs)

            setIsLoading(false)

        }catch(error){
            toast(error.message)
        }finally{
            setIsLoading(false)
        }

    }

    useEffect(() => {
        fetchBlogs()
    }, [])



    return(
        <>
            <Header />

            <Container maxWidth={'lg'} sx={{marginTop:'20px', marginBottom:'100px'}}>
               <div style={{position:'fixed', zIndex:-1, top:0, left:0 , width:'100%', height: '100%', backgroundSize:'cover', backgroundImage: 'url("/site-assets/feed-bg.jpg")', backgroundRepeat:'repeat'}}>
                </div>
                <Paper style={{display:'flex', padding:'10px 20px', justifyContent:'space-between'}}>
                    <Typography variant="h5">Blogs</Typography>
                    {
                        hasAccess && (
                            <Link href={'/admin/blogs/create'}>
                                <Button>Create New Blog</Button>
                            </Link>
                        )
                    }
                </Paper>

                <Grid container spacing={2} sx={{marginTop:'10px'}}>
                    { isLoading && (<>
                        <Grid item xs={12} md={4}> <LoadingPost /> </Grid>
                        <Grid item xs={12} md={4}> <LoadingPost /> </Grid>
                        <Grid item xs={12} md={4}> <LoadingPost /> </Grid>
                    </>) }
                    {   
                        blogs.map((blog, index) => ( 
                            <Grid key={index} item xs={12} md={4}>
                                <BlogPost key={index} blogPost={blog} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </>
    )
}