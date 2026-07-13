'use client'
import  { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  Stack,
  Grid,
} from '@mui/material';
import Header from '@/app/_components/_header';
import LoadingPost from '@/app/_components/_loading-post';
import toast from 'react-hot-toast';


import Link from 'next/link';
import FeedPosts from '@/app/feed/feed_posts';
import { Button } from '@mui/joy';
import BlogPost from '@/app/_components/_blog_post';

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
              {'<-'}<Link style={{color:'unset', paddingLeft:'2px'}} href={'/landing-pages'}>Back to all Pages</Link>
            </p>
            <p>|</p>

<p>
  <Link
    href="/landing-pages"
    style={{ color: 'unset' }}
    onClick={(e) => {
      e.preventDefault();
      const url = window.location.href;
      navigator.clipboard.writeText(url)
        .then(() => {toast('Link Copied')})
        .catch(() => {}); // navigate even if copy fails
    }}
  >
    Share
  </Link>
</p>


          </Stack>

        </Box>
      </Paper>
  );
};


const blogs = [
  {
    "id": 171,
    "version": 2,
    "title": "The Heart and Soul of Art",
    "slug": "the-heart-and-soul-of-art",
    "author": null,
    "created_at": "2026-02-25T01:17:01.000Z",
    "status": "published",
    "thumbnail": "https://s3.amazonaws.com/media703/3ppyoiy12mp61ag8ggbc.jpg",
    "content": "",
    "editable": false
  },
  {
    "id": 159,
    "version": 2,
    "title": "Earn Money Online",
    "slug": "earn-money-online-here-creatives",
    "author": null,
    "created_at": "2025-12-24T16:26:20.000Z",
    "status": "published",
    "thumbnail": "https://s3.amazonaws.com/media703/hfy4sa6edl4yjqu3gewr.jpg",
    "content": "",
    "editable": false
  },
  {
    "id": 158,
    "version": 2,
    "title": "Your Art is Ready Now",
    "slug": "your-art-is-ready-now",
    "author": null,
    "created_at": "2025-12-24T16:15:10.000Z",
    "status": "published",
    "thumbnail": "https://s3.amazonaws.com/media703/21my2gi1vl2590l5umb1.jpg",
    "content": "",
    "editable": false
  },

]


const BlogPage = ({params}) => {
      const [blog, setBlog] = useState({})
      
      const [isLoading, setIsLoading] = useState(true) 
      const [isPostsLoading, setIsPostsLoading] = useState(true) 
      
      const [posts, setPosts] = useState([])
      
      const fetchPosts = async () => {

        setIsPostsLoading(true)

        let apiURL = '/api/feed/';
        
        const postsResponse = await fetch(apiURL)
        
        const postsResponseJson = await postsResponse.json();

        setPosts(postsResponseJson.posts)

        setIsPostsLoading(false)


      }

       const fetchBlog = async () =>{
           try{
               
               const response = await fetch('/api/admin/landing-pages/'+params.slug)
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
           fetchPosts()
       }, [])

       return(
        <>
            
            <Container maxWidth={'lg'} sx={{marginTop:'20px', marginBottom:'100px'}}>
                <div style={{position:'fixed', zIndex:-1, top:0, left:0 , width:'100%', height: '100%', backgroundSize:'cover', backgroundImage: 'url("/site-assets/feed-bg.jpg")', backgroundRepeat:'repeat'}}>
                </div>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={9} size={{ xs: 12, md: 8 }}>
                    {isLoading ? <LoadingPost /> : 
                    
                    <div>
                      <BlogDetail blog={blog} />

                      <Grid container spacing={2} sx={{mt:3,}}>
                        {   
                          blogs.map((blog, index) => ( 
                              <Grid key={index} item xs={12} md={4}>
                                  <BlogPost key={index} blogPost={blog} />
                              </Grid>
                          ))
                        }
                      </Grid>


                      <Paper sx={{p: 2, mt: 4, display:'flex', justifyContent:'center'}}>
                          <a href='/feed'>
                            <Button >Xpress Your Arty!</Button>
                          </a>
                      </Paper>

                    </div>
                    
                    }
                  </Grid>

                  <Grid item xs={12} md={3}  size={{ xs: 12, md: 4 }}>
                    <div>
                        
                      <FeedPosts posts={posts.slice(0,2)}  /> 
                      {
                        isPostsLoading 
                          ? <LoadingPost />
                          : 
                            <div>
                              <Paper sx={{p: 2}}>
                                  <a href='/feed'>
                                    <Button fullWidth>View more Posts</Button>
                                  </a>
                              </Paper>
                              <Paper sx={{p: 2, mt: 2}}>
                                  <a href='/feed'>
                                    <Button fullWidth>Xpress Your Arty!</Button>
                                  </a>
                              </Paper>
                            </div> 
                      }
                      
                    </div>
                  </Grid>
                </Grid>
            </Container>
        </>
    )

}

export default BlogPage;