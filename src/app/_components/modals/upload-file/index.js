'use client'

import React, { useState } from 'react';
import { Modal, Box, Avatar, Divider  } from '@mui/material';
import Button from '@mui/joy/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import toast from "react-hot-toast";
import uploadToS3 from '../../_upload-to-s3';
import ProgressBar from '../../_progress-bar';

const MediaUploadGeneral = ({ open, handleClose, handleSuccess }) => {
  
  const [media, setMedia] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isUploadSuccess, setIsUploadSuccess] = useState(false)
  const [fileUploadProgressValue, setFileUploadProgressValue] = useState(0)

  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async () => {
    if(media){
      try{
          setIsUploading(true)
          uploadToS3(media, fileUploadProgressHandler, fileUploadErrorHandler, fileUploadSuccessHandler)
      }catch(error){
        setIsUploading(false)
        toast(error.message)
      }
    }else{
        toast('Please choose media to upload')
    }
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setMedia(selectedFile);
      
      
      setFileName(selectedFile.name)
    }
  }

  const handleMediaChangeLinkClick = ()=>{
    setMedia(false)
  }

  const fileUploadProgressHandler = (progressValue) => {
    setFileUploadProgressValue(progressValue)
  }

  const fileUploadErrorHandler = (message) => {
    setIsUploading(false)
    toast(message)
  }

  const fileUploadSuccessHandler = (file_url_after_upload) => {
    setIsUploading(false)
    setMedia(false)
    setFileUploadProgressValue(0)
    handleSuccess(file_url_after_upload)
    handleClose()
  }

  return (
    <Modal
      open={open} // You need to manage the open state in your parent component
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
            onClick={handleClose}
            sx={{ position: 'absolute', fontWeight:'bold', top: 10, right: 10, color: 'grey' }}
        >
           {!isUploading && <CloseIcon /> || ''}
        </IconButton>

        {
          !media ? 

            <div style={{marginTop:'20px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', alignItems:'center'}}>
              <Button
                variant="outlined"
                component="label"
                sx={{ marginBottom:'20px'  }}
              >
                Choose Media
                <input
                  type="file"
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
            isUploading ? (
            <div style={{marginTop: '25px'}}>
                <ProgressBar progressValue={fileUploadProgressValue} />
            </div>
            ): ''
        }
        <Button
          variant="solid"
          loading={isUploading}
          onClick={handleFileUpload}
          component="label"
          disabled={!media}
          sx={{ marginTop: '20px', minWidth: '250px'  }}
        >
          Upload
        </Button>
      </Box>
    </Modal>
  );
};


export const FileUploadButton = ({handleSuccess, buttonLabel}) => {

    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () =>setOpen(false)
  
    return (
      <>
        <Button 
            variant={'outlined'} 
            color={'neutral'} 
            onClick={handleOpen}
        >
            {buttonLabel}
        </Button>

        <MediaUploadGeneral 
            open={open} 
            handleClose={handleClose}  
            handleSuccess={handleSuccess}
        />
      </>
    );
  
  };