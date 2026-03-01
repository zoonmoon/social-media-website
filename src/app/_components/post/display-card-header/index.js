import { Avatar, Box, CardHeader, Chip, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Stack, Typography,  } from "@mui/material";
import calculatePostedAgo from "../../posted-ago";
import Link from "next/link";
import BasicPopover from "../../popovers";
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Groups3Icon from '@mui/icons-material/Groups3';

function Collaborators({open, onclose, post}){
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
  return(
                <Modal open={open} onClose={() => onclose()}>
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
  )
}


export default function DisplayCardHeader({p}){

  const [open, setOpen] = useState(false) 
  const handleClose = () => setOpen(false)

    return(
      <>
          <CardHeader
        avatar={
          <Link href={'/users/'+p.posted_by_username} style={{textDecoration:'none'}}>
            <Avatar src={p.poster_profile_pic} aria-label="recipe">
              {
                p.posted_by_name.split(' ').map(a => a[0]).join('')
              }
            </Avatar>

          </Link>
        }
        action={
          <BasicPopover popoverContent={generatePopoverContent(p)} />
        }
        title={
          <Stack direction={'row'} sx={{display:'flex', alignItems:'center'}} spacing={3}>
            <Link style={{textDecoration:'none'}} href={'/users/'+p.posted_by_username}> {p.posted_by_name}</Link>
            {
              p?.collaborators?.length > 0 ? (
                <div onClick={() => setOpen(true)}>

                <Chip
  icon={<Groups3Icon fontSize="small" />}
  sx={{ display: 'flex', justifyContent: 'center', p: 1.8, cursor: 'pointer' }}
  size="small"
  variant={'outlined'}
  color="primary"
  label={
    '+' + p?.collaborators?.length + 
    (p?.collaborators?.length > 1 ? ' collaborators' : ' collaborator')
  }
/>
                </div>
              ): <></>
            }
          </Stack>
        
        }
        subheader={calculatePostedAgo(p.posted_ago_in_seconds)}
      />
        <Collaborators post={p} open={open} onclose={handleClose} />
      </>

    )
}


import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import EditPostButton from "../../modals/edit-post";
import DeletePostButton from "../../modals/delete-post";
import { SupportButton } from "../../modals/support-artist";
import { AddCollaboratorsToPostButton } from "../../modals/add-post-collaborators";
import { useState } from "react";
import { Button } from "@mui/joy";


function generatePopoverContent(p){
  return(
      <Box sx={{ width: '100%', minWidth:250, maxWidth: 360, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
              <List>
                {
                  p.is_editable === 1 ? (
                    <>
                      <EditPostButton post={p} />
                      <DeletePostButton post={p} />
                      <AddCollaboratorsToPostButton post_id={p.id} />
                    </>
                  ): (
                    <>
                      <SupportButton 
                        type={'list_item'} 
                        toBeSupportedID={p.posted_by_username} 
                        firstName={p.posted_by_name.split(' ')[0].toUpperCase()} 
                      />
                      <ListItem disablePadding>
                          <ListItemButton>
                              <ListItemIcon>
                                  <OutlinedFlagIcon />
                              </ListItemIcon>
                              <ListItemText primary="Report" />
                          </ListItemButton>
                      </ListItem>
                    </>
                  )
                }
              </List>
              
          </nav>
      </Box>
  )
}