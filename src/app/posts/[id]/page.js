'use client'
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import Post from '@/app/_components/post';
import toast from 'react-hot-toast';
import LoadingPost from '@/app/_components/_loading-post';
import Alert from '@mui/material/Alert';
import { Card, Divider, Grid, Stack } from '@mui/material';
import { Button } from '@mui/joy';



export default function ViewProfile({params}){

    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`/api/post/${params.id}`); // Adjust the API endpoint URL as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setPost(data.post)
            } catch (error) {
                toast( error.message)
            }finally{
                setIsLoading(false)
            }
        }

        fetchPost();

    }, []); 

    if(!isLoading && !post){
        return(
            <Alert severity="error">This post no longer exists.</Alert>
        )
    }

    return(
        <Container maxWidth={'lg'}>
<Grid container sx={{gap: {md: '40px', xs: 0}}}>
  <Grid
    item
    xs={12}
    md={3}
    sx={{
      order: { xs: 2, md: 1 } // On mobile, this comes second. On desktop, it comes first.
    }}
  >
    {isLoading ? (
      <></>
    ) : (
        <Card sx={{position: {sx: 'relative', md: 'sticky'}, top:'100px', borderRadius:'10px', marginBottom: '200px', marginTop: {xs: 0, md: '30px'}, padding: '10px', textAlign: 'center' }}>
          <Stack divider={<Divider />} gap={'10px'} >
            <div>
              <div className="image-holder">
                <img
                  style={{ width: '100%', height: 'auto' }}
                  src={post.poster_profile_pic}
                />
              </div>
              <div className="poster-name" style={{ textTransform: 'capitalize' }}>
                <b>{post.posted_by_name}</b>
              </div>
            </div>

            <div>
              <Button fullWidth onClick={() => window.location.href='/users/'+post.posted_by_username}>View profile</Button>
            </div>
          </Stack>
        </Card>
    )}
  </Grid>
    
  <Grid
    item
    xs={12}
    md={6}
    sx={{
      order: { xs: 1, md: 2 } // On mobile, this comes first. On desktop, it comes second.
    }}
  >
    <div style={{ marginTop: '30px' }}>
      {isLoading ? <LoadingPost /> : <Post post={post} />}
    </div>
  </Grid>
</Grid>

        </Container>
    )
    
}