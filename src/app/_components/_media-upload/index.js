import React, { useState } from 'react';
import { Modal, Box, Avatar, Divider  } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Button from '@mui/joy/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import {pOSTRequest} from '@/app/_components/file_upload';
import toast from 'react-hot-toast';

import uploadToS3 from '../_upload-to-s3';

import ProgressBar from '../_progress-bar';

const UploadMediaWidget = ({ onSuccess, buttonText="Change", uploadButtonText="Upload", variant="outlined" }) => {
  
  const [media, setMedia] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isFileUploading, setFileUploading] = useState(false)

  const [fileUploadProgressValue, setFileUploadProgressValue] = useState(0)

  const [isUploading, setIsUploading] = useState(false)

  const handleMediaUpload =  () => {

    if(!(!media)){
        if(media !== false){
          setIsUploading(true)
          setFileUploading(true)
          uploadToS3(media, fileUploadProgressHandler, fileUploadErrorHandler, fileUploadSuccessHandler)
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
    setIsUploading(false)
    setIsOpen(false) 
    setMedia(false) 
    onSuccess(file_url_after_upload)
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

  const [isOpen, setIsOpen] = useState( false ) 

  return (
    <>
      <Modal
        sx={{opacity: 1}}
        open={isOpen} // You need to manage the open state in your parent component
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
              onClick={() => setIsOpen(!isOpen)}
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
                  startDecorator={<PhotoCameraIcon />}
                  sx={{  marginBottom:'20px'  }}
                >
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </Button>

              </div>
              : 
              <>
                <div style={{ display:'flex', justifyContent:'center', marginBottom:'20px'}} >
                  <img src={URL.createObjectURL(media)} height={'100px'} width={'100px'} style={{objectFit:'cover'}} />
                </div>
                <Divider></Divider>
                <div style={{marginBottom: '20px', marginTop: '20px'}}>
                  <span>{fileName}</span> <span  onClick={handleMediaChangeLinkClick} style={{ display: isUploading ?'none': '', marginLeft: '10px', fontStyle:'italic', cursor:'pointer', borderBottom: '1px dotted black', paddingBottom: '2px'}}>Change Media</span>
                </div>
              </>

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
                onClick={handleMediaUpload}
                component="label"
                disabled={!media}
                sx={{ marginTop: '20px', minWidth: '250px'  }}
              >
                {uploadButtonText}
              </Button>
            )
          }
        </Box>
      </Modal>
      <Button variant={buttonText == "Add Thumbnail" ? 'solid': "outlined"} onClick={() => setIsOpen(!isOpen)}>{buttonText}</Button>
    </>
  );
};



export default UploadMediaWidget;