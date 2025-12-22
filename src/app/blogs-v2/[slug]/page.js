'use client'
import  { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  Stack
} from '@mui/material';
import Header from '@/app/_components/_header';
import LoadingPost from '@/app/_components/_loading-post';
import toast from 'react-hot-toast';

import Link from 'next/link';

// Function to safely render HTML
const renderHTML = (html) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

const BlogDetail = ({ blog }) => {
  const {
    title,
    thumbnail,
    content,
    author,
    created_at,
  } = blog;

  return (
      <Paper  elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        {/* {
            (thumbnail !== '' && thumbnail !== null ) && (
                <Box
                component="img"
                src={thumbnail}
                alt={title}
                sx={{
                  width: '100%',
                  height: { xs: 200, md: 450 },
                  objectFit: 'cover',
                }}
              />
            )
        } */}

        <Box p={4}>
          <Typography variant="h3" fontWeight={600} gutterBottom>
            {title}
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <Box>
              {/* <Link style={{color:'unset'}} href={'/users/'+author}><Typography variant="subtitle2">@{author}</Typography></Link> */}
              <Typography variant="caption" color="text.secondary">
                {new Date(created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box className="blog-content-zoon" sx={{ typography: 'body1', lineHeight: 1.8 }}>
            {renderHTML(content)}
          </Box>
          <Divider sx={{ my: 3 }} />
          <Stack
            spacing={1}
            direction={'row'}
            divider={<Divider />}
          >
            <p>
              {'<-'}<Link style={{color:'unset', paddingLeft:'2px'}} href={'/blogs'}>Back to Blogs</Link>
            </p>
            <p>|</p>

<p>
  <Link
    href="/blogs"
    style={{ color: 'unset' }}
    onClick={(e) => {
      e.preventDefault();
      const url = window.location.href;
      navigator.clipboard.writeText(url)
        .then(() => {toast('Blog Link Copied')})
        .catch(() => {}); // navigate even if copy fails
    }}
  >
    Share Blog
  </Link>
</p>


          </Stack>

        </Box>
      </Paper>
  );
};



const BlogPage = ({params}) => {
       const [blog, setBlog] = useState({})
       const [isLoading, setIsLoading] = useState(true) 
       
      //  useEffect(() => {

      //   if(window.innerWidth > 768 && document.querySelector('.footer-fixed')){
      //     document.querySelector('.footer-fixed').style.display = "block"
      //   }
    
      // }, [])

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
   
       useEffect(() => {
           fetchBlog()
       }, [])

       return(
        <>
            
            <Container maxWidth={'lg'} sx={{marginTop:'20px', marginBottom:'100px'}}>
                             <div style={{position:'fixed', zIndex:-1, top:0, left:0 , width:'100%', height: '100%', backgroundSize:'cover', backgroundImage: 'url("/site-assets/feed-bg.jpg")', backgroundRepeat:'repeat'}}>
                </div>
                {
                    isLoading ? (<LoadingPost />)
                    :   <BlogDetail blog={blog} />
                }

            </Container>
        </>
    )

}

export default BlogPage;