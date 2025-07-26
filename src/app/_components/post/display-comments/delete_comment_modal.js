import DeleteIcon from '@mui/icons-material/Delete';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Box, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Button } from '@mui/joy';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Delete Modal component
const PostDeleteModal = ({ open, handleClose, handleDelete,  post_id, comment_id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePostDelete = async () => {
    try {
        setIsLoading(true);
        // Assuming you have a delete request function similar to your update one
        const deleteResponse = await fetch(`/api/post/${post_id}/comments/${comment_id}`, { method: 'DELETE' });
        const deleteResponseJSON = await deleteResponse.json();
        
        if (!deleteResponseJSON.success) throw new Error(deleteResponseJSON.msg);
        
        handleClose();
handleDelete(comment_id)

    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-dialog-title"
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: '20px',
          padding: '20px',
          maxWidth: '400px',
          width: '80%',
        },
      }}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <DialogTitle id="delete-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Are you sure you want to delete this comment?
      </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="solid"
            color="danger"
            loading={isLoading}
            onClick={handlePostDelete}
            startDecorator={<DeleteOutlineIcon />}
            sx={{ marginRight: '10px', width:'120px', fontWeight: 'bold' }}
          >
            Delete
          </Button>
          <Button
            variant="solid"
            color="success"
            
            onClick={handleClose}
            disabled={isLoading}
            sx={{ fontWeight: 'bold', width:'120px' }}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// Delete Post Button Component
const DeleteCommentButton = ({ post_id, handleDelete,  comment_id }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>

        <IconButton onClick={handleOpen}><DeleteIcon/></IconButton>


      <PostDeleteModal handleDelete={handleDelete} open={open} handleClose={handleClose} post_id={post_id} comment_id={comment_id} />
    </>
  );
};

export default DeleteCommentButton;
