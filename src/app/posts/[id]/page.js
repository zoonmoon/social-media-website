'use client'
import { useSearchParams } from 'next/navigation';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import Post from '@/app/_components/post';
import toast from 'react-hot-toast';
import LoadingPost from '@/app/_components/_loading-post';
import Alert from '@mui/material/Alert';
import { Card, Divider, Grid, Paper, Stack, Modal, Typography, Box, Avatar, Chip } from '@mui/material';
import { Button } from '@mui/joy';
import Link from 'next/link';
import { AddCollaboratorsContent, AddCollaboratorsToPostButton } from '@/app/_components/modals/add-post-collaborators';

export default function ViewProfile({params}) {

    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState({accept: false, ignore: false});
    const [collabModalOpen, setCollabModalOpen] = useState(false);
const searchParams = useSearchParams();
    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`/api/post/${params.id}`);
                if (!response.ok) throw new Error('Failed to fetch post');
                const data = await response.json();
                if(data?.success == false){
                  window.location.href ='/'
                  return 
                }
                setPost(data.post);
                                setIsLoading(false);

            } catch (error) {
                toast(error.message);
            } finally {
            }
        }
        fetchPost();
    }, []);

useEffect(() => {
    const shouldOpen = searchParams.get('show_collaborators');

    if (shouldOpen === 'true' && !isLoading && post?.id) {
        setCollabModalOpen(true);

        const url = new URL(window.location.href);
        url.searchParams.delete('show_collaborators');
        window.history.replaceState({}, '', url);
    }
}, [searchParams, isLoading, post?.id]);

    const handleCollabAction = async (action) => {
        if (!['accept','ignore'].includes(action)) return;
        setActionLoading(prev => ({...prev, [action]: true}));

        try {
            const response = await fetch('/api/collaboration-requests', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ post_id: post.id, action })
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.msg);

            // Update post state
            setPost(prev => ({
                ...prev,
                has_collaboration_request_been_accepted: action === 'accept',
                has_collaboration_request_been_rejected: action === 'ignore',
                is_collaborator: true
            }));

            toast.success(data.msg);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setActionLoading(prev => ({...prev, [action]: false}));
        }
    }

    const renderCollabAlert = () => {
        if (!post.is_collaborator) return null;

        if (post.has_collaboration_request_been_accepted) {
            return <Alert severity="success">You have already accepted this collaboration request.</Alert>;
        }

        if (post.has_collaboration_request_been_rejected) {
            return <Alert severity="warning">You have already ignored this collaboration request.</Alert>;
        }

        return <Alert severity="info">You have received a collaboration request for this post.</Alert>;
    }


      const getInitials = (name) => {
    if (!name) return ''
    const parts = name.trim().split(' ')
    if (parts.length === 1) {
      return parts[0][0]?.toUpperCase()
    }
    return (
      parts[0][0]?.toUpperCase() +
      parts[parts.length - 1][0]?.toUpperCase()
    )
  }
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>

                {/* Sidebar */}
                <Grid item xs={12} md={3} sx={{ order: { xs: 2, md: 1 } }}>
                    {isLoading ? null : (
                        <Card sx={{position: {sx: 'relative', md: 'sticky'}, top:'100px', borderRadius:'10px', mb: '200px', mt: {xs:0, md:'30px'}, p:'10px', textAlign:'center'}}>
                            <Stack divider={<Divider />} gap={1}>
                                <div className="image-holder">
                                    <img style={{width:'100%', height:'auto'}} src={post.poster_profile_pic}/>
                                </div>
                                <Typography variant="subtitle1"><b>{post.posted_by_name}</b></Typography>

                                <Button fullWidth onClick={() => window.location.href='/users/'+post.posted_by_username}>View profile</Button>
                                <Link href={'/blogs-v2/earn-money-online-here-creatives'}><Button>Earn Income</Button></Link>
                            </Stack>
                        </Card>
                    )}
                </Grid>

                {/* Main Content */}
                <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                    <div style={{ marginTop: '30px' }}>
                        {isLoading ? <LoadingPost /> :
                            <Stack spacing={2}>

                                {/* Collaboration Request */}
                                {post.is_collaborator && (
                                    <Paper sx={{p: 2}}>
                                        {renderCollabAlert()}
<Stack spacing={2.5} sx={{ pt: 2 }}>
  {/* Accept button */}
  {!post.has_collaboration_request_been_accepted && (
    <Button
      variant={post.has_collaboration_request_been_rejected ? 'outlined' : 'solid'}
      color="success"
      loading={actionLoading.accept}
      onClick={() => handleCollabAction('accept')}
    >
      Accept
    </Button>
  )}

  {/* Ignore button */}
  {!post.has_collaboration_request_been_rejected && (
    <Button
      variant={post.has_collaboration_request_been_accepted ? 'outlined' : 'solid'}
      color="danger"
      loading={actionLoading.ignore}
      onClick={() => handleCollabAction('ignore')}
    >
      Decline
    </Button>
  )}

  <Divider />

  <Button variant="outlined" onClick={() => setCollabModalOpen(true)}>
    View all Collaborators
  </Button>
</Stack>
                                    </Paper>
                                )}

                                {/* Post Content */}
                                <Post post={post} />
                            </Stack>
                        }
                    </div>
                </Grid>
                
                {
                  post.is_editable && (
                  <Grid item xs={12} md={3} sx={{mt: 3.5,  order: { xs: 3, md: 3 } }}>
                    <Paper sx={{p: 2}}>
                      <AddCollaboratorsToPostButton  post_id={post.id} />

                    </Paper>
                </Grid>

                  )
                }
            </Grid>

            {/* Collaborators Modal */}
            <Modal open={collabModalOpen} onClose={() => setCollabModalOpen(false)}>
                <Box sx={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', width:350, bgcolor:'background.paper', p:3, borderRadius:2, maxHeight:'80vh', overflowY:'auto'}}>
                    <Typography variant="h6" mb={2}>Collaborators</Typography>
                    <Divider sx={{marginBottom:'20px'}}></Divider>
                    {post.collaborators && post.collaborators.length > 0 ? (
                        <Stack spacing={3}>
                            {post.collaborators.map(c => (
                                <Stack 
                                  sx={{cursor:'pointer'}}
                                 onClick={() => {
  window.open('/users/' + c.username, '_blank');
}}
                                key={c.username} direction="row" spacing={2} alignItems="center">
                                  <Avatar
                                      src={c.profile_pic_src || undefined}
                                      sx={{ mr: 2 }}
                                    >
                                      {!c.profile_pic_src &&
                                        getInitials(c.name)}
                                    </Avatar>

                                    <Typography>{c.name}</Typography>

                                    {
                                      (post.is_editable  && c?.accepted_invite == 1) ? (
                                          <Chip  color={'success'} label="accepted" />
                                      ) : <></>
                                    }

                                    {
                                      (post.is_editable  && c?.accepted_invite == 2) ? (
                                          <Chip color={'error'} label="rejected" />
                                      ): <></>
                                    }
                                    
                                    {
                                      (post.is_editable  && c?.accepted_invite == 0) ? (
                                          <Chip color={'info'} label="pending" />
                                      ) : <></>
                                    }



                                </Stack>
                            ))}
                        </Stack>
                    ) : (
                        <Typography>No collaborators yet.</Typography>
                    )}
                    {
                      post.is_editable ? (
<div style={{marginTop:'30px'}}>
          <Divider></Divider>
                    <AddCollaboratorsToPostButton  post_id={post.id} />

</div>
                      ): <></>
                    }
          
                </Box>
            </Modal>
        </Container>
    )
}