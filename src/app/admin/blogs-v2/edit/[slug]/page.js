
'use client'
import { Container, Paper } from "@mui/material";
import Header from "@/app/_components/_header";
import { useState } from "react";
import LoadingPost from "@/app/_components/_loading-post";
import toast from "react-hot-toast";
import BlogCreateOrEdit from "../../_utils/_index";

export default function CreateBlog({params}){

    const [blog, setBlog] = useState({})
    const [isLoading, setIsLoading] = useState(true) 

    const fetchBlog = async () =>{
        try{
            
            const response = await fetch('/api/admin/blogs/'+params.slug)
            const responseJSON = await response.json()
            if(responseJSON.success !== true) throw new Error() 
            if(responseJSON.blog.length == 0) throw new Error()
            setBlog(responseJSON.blog[0]) 

        }catch(error){
            toast(error.message)
        }finally{
            setIsLoading(false )
        }

    }

    useState(() => {
        fetchBlog()
    }, [])

    return(
        <>
            <Header />
            <Container maxWidth={'lg'} sx={{marginTop:'20px', marginBottom:'100px'}}>
                {
                    isLoading ? (<LoadingPost />)
                    :   <Paper sx={{padding:'20px'}}>
                            <BlogCreateOrEdit 
                                slug={blog.slug}
                                defaultTitle={blog.title}
                                defaultBlogContent={blog.content}
                                defaultthumbNail={blog.thumbnail}
                            />
                        </Paper>
                }

            </Container>
        </>
    )
}