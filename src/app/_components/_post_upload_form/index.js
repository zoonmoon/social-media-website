import React, { useState } from 'react';
import { Modal, Box, Avatar, Divider  } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Button from '@mui/joy/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import MicIcon from '@mui/icons-material/Mic';
import {pOSTRequest, dELETErequest} from '@/app/_components/file_upload';
import AssignmentIcon from '@mui/icons-material/Assignment';
import toast from 'react-hot-toast';

import uploadToS3 from '../_upload-to-s3';

import ProgressBar from '../_progress-bar';

const PostUploadForm = ({ onClose }) => {
  
  const [caption, setCaption] = useState('')
  const [media, setMedia] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isUploadSuccess, setIsUploadSuccess] = useState(false)
  const [post_id, setPostID] = useState('')

  const [isFileUploading, setFileUploading] = useState(false)

  const [fileUploadProgressValue, setFileUploadProgressValue] = useState(0)

  const [isUploading, setIsUploading] = useState(false)

  const handlePostUpload =  () => {

    if(!(!media && caption.trim().length == 0)){
      
        if(media !== false){
          setIsUploading(true)
          setFileUploading(true)
          uploadToS3(media, fileUploadProgressHandler, fileUploadErrorHandler, fileUploadSuccessHandler)
        }else{
          finalUpload()
        }
    }
  }

  const fileUploadProgressHandler = (progressValue) => {
    setFileUploadProgressValue(progressValue)
  }

  const fileUploadErrorHandler = (message) => {
    setFileUploading(false)
    setIsUploading(false)
    toast(message)
  }

  const fileUploadSuccessHandler = (file_url_after_upload) => {
    setFileUploading(false)
    finalUpload(file_url_after_upload)
  }

  const finalUpload = async (file_url_after_upload = '') => {
   
    try{

      setIsUploading(true)
      
      let media_type = ''

      if(media !== false)
        media_type = media.type

      const formData = new FormData();
      formData.append('file_url_after_upload', file_url_after_upload);
      formData.append('caption', caption);
      formData.append('media_type', media_type);

      const result = await pOSTRequest(formData, '/api/post/')

      if(result.success === true){
        setPostID(result.post_id)
      }else{
        throw new Error(result.msg);
      }

  }catch(error){
    toast(error.message)
  }finally{
    setIsUploading(false)
  }
}

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setMedia(selectedFile);
      const name = selectedFile.name;
      const parts = name.split('.');
      const ext = parts.pop();
      const baseName = parts.join('.');

      // Truncate the base name if it's longer than 10 characters
      let displayName = baseName;
      if (baseName.length > 10) {
        displayName = baseName.substring(0, 10) + '...';
      }
      // Combine the truncated base name with the extension
      const truncatedFileName = `${displayName}.${ext}`;
      setFileName(truncatedFileName);
    }
  }

  const handleMediaChangeLinkClick = ()=>{
    setMedia(false)
  }

  const handleTextAreaInput = (e) => {
    const textarea = e.target
    if (textarea) {
      if(textarea.value.split('\n').length > 2){
        textarea.style.fontSize = 'unset'
      }else{
        textarea.style.fontSize = '20px'
      }
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    setCaption(textarea.value)
  }

  if(post_id !== ''){
    return(
      <>
        <UploadSuccessMessage post_id={post_id} onClose={onClose} />
      </>
    )
  }

  return (
    <Modal
      sx={{opacity: 1}}
      open={true} // You need to manage the open state in your parent component
      onClose={()=>{}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          opacity: 1,
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
          textAlign: 'center',
        }}
      >
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', fontWeight:'bold', top: 10, right: 10, color: 'grey' }}
        >
           {!isUploading && <CloseIcon /> || ''}
        </IconButton>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <textarea
            placeholder='What do you positively think about this art?'
            onInput={(e) => handleTextAreaInput(e)}
            defaultValue={caption}
            disabled={isUploading  }
            autoFocus={true}
            rows="2"
            style={{
              overflow: 'hidden',
              fontSize: '20px',
              width: '100%',
              marginTop: '20px',
              border: 'none',
              outline: 'none',
              resize: 'none',
            }}
          >

          </textarea>
        </Box>
        <Divider></Divider>
        {
          !media ? 

            <div style={{marginTop:'20px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', alignItems:'center'}}>
              <Button
                variant="outlined"
                component="label"
                startDecorator={<PhotoCameraIcon />}
                sx={{  marginBottom:'20px'  }}
              >
                Photo
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </Button>

              <Button
                variant="outlined"
                startDecorator={<VideoCameraBackIcon />}
                component="label"
                sx={{  marginBottom:'20px'  }}
              >
                Video
                <input
                  type="file"
                  accept="video/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </Button>

              <Button
                variant="outlined"
                component="label"
                startDecorator={<MicIcon />}
                sx={{ marginBottom:'20px'  }}
              >
                Audio
                <input
                  type="file"
                  accept="audio/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </Button>


              <Button
                variant="outlined"
                component="label"
                startDecorator={<AssignmentIcon />}
                sx={{ marginBottom:'20px'  }}
              >
                Text
                <input
                  type="file"
                  accept=".doc, .docx, .txt, .pdf"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </Button>
            </div>
            : 
            <div style={{marginBottom: '20px', marginTop: '20px'}}>
              <span>{fileName}</span> <span  onClick={handleMediaChangeLinkClick} style={{ display: isUploading ?'none': '', marginLeft: '10px', fontStyle:'italic', cursor:'pointer', borderBottom: '1px dotted black', paddingBottom: '2px'}}>Change Media</span>
            </div>

        }
        <Divider></Divider>

        {
          isFileUploading ? (
            <div style={{marginTop: '25px'}}>
              <ProgressBar progressValue={fileUploadProgressValue} />
            </div>
          ): (
            <Button
              variant="solid"
              loading={isUploading}
              onClick={handlePostUpload}
              component="label"
              disabled={!media && !caption.length}
              sx={{ marginTop: '20px', minWidth: '250px'  }}
            >
              Post
            </Button>
          )
        }

      </Box>
    </Modal>
  );
};

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import Link from 'next/link';

const UploadSuccessMessage =  ({post_id, onClose}) => {

return(
  <>
    <Modal
      open={true} // You need to manage the open state in your parent component
      onClose={()=>{}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
          textAlign: 'center',
        }}
      >
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', fontWeight:'bold', top: 10, right: 10, color: 'grey' }}
        >
          <CloseIcon />
        </IconButton>

        <div style={{textAlign:'center', marginTop:'20px', marginBottom:'10px'}}>
          <CheckCircleRoundedIcon sx={{width: 80, height: 80, color:'green',  animation: 'scale 0.5s ease-in-out'}} />
        </div>
        <Divider></Divider>
        <Button
          variant="outlined"
          component="label"
          sx={{ marginTop: '20px', minWidth:'250px', marginBottom:'20px'  }}
        >
        <Link href={`/posts/${post_id}`} style={{textDecoration:'none', color:'inherit'}}>
            View Post          
        </Link>
        </Button>
      </Box>
    </Modal>
  </>
)
}

export default PostUploadForm;
