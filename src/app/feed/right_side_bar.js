'use client'

import { useEffect, useState } from "react";
import LoadingPost from "@/app/_components/_loading-post";
import toast from "react-hot-toast";
import { Container, Grid, Paper, Typography } from "@mui/material";
import Header from "@/app/_components/_header";
import Link from "next/link";
import { Button } from "@mui/joy";
import BlogPost from "@/app/_components/_blog_post";

export default function RightSidebar(){

    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true) 
    

    const fetchBlogs = async () => {

        try{

            setIsLoading(true)

            const blogsResponse  = await fetch('/api/admin/blogs')

            const blogsResponseJSON = await blogsResponse.json() 

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
        <div className="right-side-bar">
          <Grid container spacing={2} >
              { isLoading && (<>
                  <Grid item xs={12}> <LoadingPost /> </Grid>
                  <Grid item xs={12}> <LoadingPost /> </Grid>
                  <Grid item xs={12}> <LoadingPost /> </Grid>
              </>) }
              {
                  blogs.map((blog, index) => ( 
                      <Grid item xs={12}>
                          <BlogPost key={index} blogPost={blog} />
                      </Grid>
                  ))
              }
          </Grid>
        </div>
    )
}