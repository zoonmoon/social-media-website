import DeleteCommentButton from "./delete_comment_modal";
import {  Button } from "@mui/joy";
import { Avatar, Box, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState} from "react";
import { getRequest, pOSTRequest } from "../../file_upload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SendIcon from '@mui/icons-material/Send';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { SupportButton } from "../../modals/support-artist";
import EditIcon from '@mui/icons-material/Edit';
export default function DisplayComments({ commentsSubmitCallback, post: {is_editable, id: post_id, posted_by_name, posted_by_username } }) {

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [parentID, setParentID] = useState(0) 
    const [commentsPageNumber, setCommentsPageNumber] = useState(1)
    const [moreDataExists, setMoreDataExists] = useState(true)

    useEffect( () => {
    
        async function fetchData(){
            try {
                setIsLoading(true);
                const commentsJSON = await getRequest(
                `/api/post/${post_id}/comments?page=${commentsPageNumber}&parent_id=${parentID}`
                );
                setComments(commentsJSON.comments); // Append new likes
                setMoreDataExists(commentsJSON.moreDataExists); // Set whether more data exists
              } catch (error) {
                toast(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchData()

  }, [commentsPageNumber, parentID]);

  // Handler to increase page number
  const increaseLikesPageNumber = () => {
    setCommentsPageNumber((prevPage) => prevPage + 1);
  };

  // Redirect to user profile on click
  const redirectToProfile = (username) => {
    router.push(`/users/${username}`);
  };

  const [comment, setComment] = useState('')

  const [isSubmittingComment, setIsSubmittingComment]= useState(false)

  const submitComment = async () =>{
    try{
        if(comment.trim().length === 0) throw new Error('Comment can not be empty')
        setIsSubmittingComment(true)
        const formData = new FormData()
        formData.append('comment', comment)
        formData.append('parent_id', null)
        const submitCommentResp = await pOSTRequest(formData, `/api/post/${post_id}/comments`)
        if(submitCommentResp.success !== true) throw new Error(submitCommentResp.msg) 
        toast("Comment added")
        setComment('')
        setComments(prevState => [submitCommentResp.cmt, ...prevState])
        commentsSubmitCallback()
    }catch(error){
        toast(error.message)
    }finally{
        setIsSubmittingComment(false)
    }
  }



const CommentEditModal = ({ open, comment , handleClose, post_id, handleEdit}) => {

    const [isLoading, setIsLoading] = useState(false) 
    const [caption,setCaption] = useState(comment.cmt)

    const handlePostEdit = async () => {
        try{
            if(caption.trim().length === 0){
                toast("Caption empty")
                return
            }
            setIsLoading(true) 
            const formData = new FormData()
            formData.append('comment', caption)
            
            
                const postEditResponse = await fetch(`/api/post/${post_id}/comments/${comment.id}`, {
                  method: 'PUT', // or 'PATCH' depending on your API
                  body: formData
                });
            const postEditResponseJSON = await postEditResponse.json()
            if(postEditResponseJSON.success !== true) throw new Error(postEditResponseJSON.msg)
            handleClose()
          handleEdit(comment, caption)
        }catch(error){
            toast(error.message)
        }finally{
            setIsLoading(false)
        }
    }


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="share-dialog-title"
      maxWidth="sm" // Adjusted maxWidth for a wider modal
      PaperProps={{
        style: {
          borderRadius: '20px',
          padding: '10px',
          maxWidth: '400px', // Set maximum width to 800px for a wider look
          width: '80%'
        },
      }}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <DialogTitle id="share-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Edit Comment
      </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center">
        <textarea
            placeholder='Comment..'
            // autoFocus={true}
            onChange={(e) => setCaption(e.target.value)}
            defaultValue={caption}
            disabled={isLoading  }
            rows="4"
            style={{
              overflow: 'hidden',
              fontSize: '20px',
              width: '100%',
              marginTop: '20px',
              outline: 'none',
              padding: '10px',
              borderRadius: '20px',
            }}
          >

          </textarea>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            onClick={handlePostEdit}
            loading={isLoading}
            startDecorator={<EditIcon />}
          >
            Edit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

  const handleEdit = (comment, newComment) => {

    
            setComments(prevState => prevState.map(c => c.id === comment.id ? ({...c, cmt: newComment}): c ))

  }

const handleDelete = (id) => {
  // alert(id)
  setComments(prevState => prevState.filter(c => c.id !== id));
}


const CommentEditorTrigger = ({ comment }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="edit comment">
        <EditIcon />
      </IconButton>

      <CommentEditModal
        open={open}
        handleClose={handleClose}
        comment={comment}
        post_id={post_id}
        handleEdit={handleEdit}
      />
    </>
  );
};




  return (
    <div style={{ marginTop: "10px" }}>

      <Divider />



      <div 
        style={{
            display:'flex', 
            gap:'10px', 
            justifyContent:'space-between',
            alignItems:'center',
            padding:'15px'
        }}
    >
            <textarea 
                rows={4}
                value={comment}
                style={{width:'100%', fontSize:'16px', border:'1px solid rgba(0,0,0,0.6)', borderRadius:'10px', padding:'10px'}}
                disabled={isSubmittingComment}
                placeholder="Write a comment"
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <IconButton disabled={isSubmittingComment} onClick={submitComment}>
                
                {isSubmittingComment ? <AutorenewIcon color="primary" /> :<SendIcon color="primary" /> }
            </IconButton>
      </div>

      { comments.length > 0 && (
      <Divider>Comments</Divider>
      ) || ''}

      
      <div style={{ padding: comments.length > 0 ? "15px" : '5px'}}>

        <Grid container spacing={2}>
          {comments.map((comment, index) => (
            <Grid
              key={index}
              item
              xs={12}
              gap={0}
            >
              <div>
                <div 
                  style={{   display:'flex', gap: '10px',padding:'10px', flex:1, borderRadius:'5px', background:'rgba(0,0,0, 0.05)' }}
                >
                  <Avatar
                    onClick={()=>redirectToProfile(comment.username)}
                    alt={comment.name}
                    src={comment.profile_pic_src || ""}
                  >
                    {!comment.profile_pic_src ? comment.name.split(' ').map(w=>w[0]).join('').toUpperCase() : ""}
                  </Avatar>
                  <div style={{flex:1}}>
                    <div style={{width: '100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <Typography><strong>{comment.name}</strong></Typography>
                      {comment.is_editable && (
                        <Stack gap={1} direction={'row'}>
                          <CommentEditorTrigger comment={comment} post_id={post_id}/>
                          <DeleteCommentButton comment_id={comment.id} post_id={post_id} handleDelete={handleDelete} />
                        </Stack>
                      )}
                    </div>

                    <Typography>
                        {comment.cmt.split(/\r?\n/).map((line, idx) => (
                          <p style={{marginBottom:0,marginTop:0}} key={idx}>{line}</p>
                        ))}
                    </Typography>

                </div>
                </div>

              </div>
            </Grid>
          ))}
        </Grid>

        {moreDataExists && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
            <Button loading={isLoading} variant={'plain'} onClick={increaseLikesPageNumber}>
              View More 
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}