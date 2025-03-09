'use client'
import React, { useState } from 'react';
import { Dialog, useMediaQuery, useTheme , DialogContent, DialogTitle, IconButton, Box, Stack, Divider, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Button as BtnJoy, Button } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';

// Modal component
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  TextField,
} from '@mui/material';
import toast from 'react-hot-toast';
import SupportSitePaypalButton from '../../_support-site-btn';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WarningIcon from '@mui/icons-material/Warning';
import RecommendIcon from '@mui/icons-material/Recommend';


const SupportModal = ({ open, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState('coffee'); // Default selection
  const [customAmount, setCustomAmount] = useState('');
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false) 
  const [isPaymentFailure, setIsPaymentFailure] = useState(false) 

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== 'custom') {
      setCustomAmount(''); // Clear custom amount if a predefined option is selected
    }
  };

  const handleCustomAmountChange = (event) => {
    setSelectedOption('custom'); // Set to custom if the field is being typed in
    let amount = parseFloat(event.target.value)
    if(amount < 1){
        amount = 1
    }
    setCustomAmount(amount);
  };


  const [isContinueClicked, setIsContinueClicked] = useState(false)

  const returnFinalAmount =() => {
    let amount;
    
    if (selectedOption === 'custom') {
      amount = parseFloat(customAmount) || 0; // Default to 0 if invalid
    } else if (selectedOption === 'coffee') {
      amount = 5;
    } else if (selectedOption === 'dinner') {
      amount = 20;
    }else if (selectedOption === 'dinner2') {
      amount = 50;
    }else if (selectedOption === 'suit') {
      amount = 100;
    }
    return amount
  }

  const handleSubmit = () => {
    
    const amount = returnFinalAmount()

    if(amount < 1){
        toast('Amount less than $5')
        return
    }

    setIsContinueClicked(true)

  };

  const handleSuccess =() => setIsPaymentSuccess(true)
  const handleFailure = (err) => {
    setIsPaymentFailure(true) 
    console.log(err)
  }

  if(isPaymentFailure){
    return(
      <Dialog
        open={open}
        onClose={()=>{}}
        aria-labelledby="share-dialog-title"
        maxWidth="sm"
        PaperProps={{
          style: {
            borderRadius: '20px',
            padding: '10px',
            maxWidth: '800px',
            minWidth: '350px'
          },
        }}
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{display:'flex', justifyContent:'end', right: '100px'}}>
          <IconButton onClick={handleClose} sx={{background:'rgba(0, 0, 0, 0.05)'}}  aria-label="close">
              <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <Stack direction={'column'} gap={2}>
            <div style={{textAlign:'center'}}>
              <WarningIcon sx={{width: 80, height: 80, color:'red',  animation: 'scale 0.5s ease-in-out'}} />
            </div>
            <div id="share-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
              Payment Failed
            </div>
            <Divider></Divider>
            <Typography sx={{textAlign:'center'}}>
              Please try again later
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    )
  }

  if(isPaymentSuccess){
    return(
      <Dialog
        open={open}
        onClose={()=>{}}
        aria-labelledby="share-dialog-title"
        maxWidth="sm"
        PaperProps={{
          style: {
            borderRadius: '20px',
            padding: '10px',
            maxWidth: '800px',
            minWidth: '350px'
          },
        }}
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{display:'flex', justifyContent:'end', right: '100px'}}>
          <IconButton onClick={handleClose} sx={{background:'rgba(0, 0, 0, 0.05)'}}  aria-label="close">
              <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <Stack direction={'column'} gap={2}>
            <div style={{textAlign:'center'}}>
              <CheckCircleRoundedIcon sx={{width: 80, height: 80, color:'green',  animation: 'scale 0.5s ease-in-out'}} />
            </div>
            <div id="share-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
              Payment Successful
            </div>
            <Divider></Divider>
            <Typography sx={{textAlign:'center'}}>
              Thanks for supporting us.
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={()=>{}}
      aria-labelledby="share-dialog-title"
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: '20px',
          padding: '10px',
          maxWidth: '800px',
          minWidth: '350px'
        },
      }}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >

      <div style={{display:'flex', justifyContent:'end', right: '100px'}}>
        <IconButton onClick={handleClose} sx={{background:'rgba(0, 0, 0, 0.05)'}}  aria-label="close">
            <CloseIcon />
        </IconButton>
      </div>

      <DialogTitle id="share-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
          Support the Site
      </DialogTitle>

      <DialogContent>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup value={selectedOption} onChange={handleOptionChange}>
            <FormControlLabel value="coffee" control={<Radio />} label="Buy us a coffee ($5)" />
            <FormControlLabel value="dinner" control={<Radio />} label="Buy us a dinner ($20)" />
            <FormControlLabel value="dinner2" control={<Radio />} label="Buy our developers a dinner ($50)" />
            <FormControlLabel value="suit" control={<Radio />} label="Buy our developers a new suit ($100)" />
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label={
                <Box sx={{display:'flex', gap: '10px', alignItems:'center', flexWrap: 'wrap'}}>
                        <div>
                            Custom Amount: 
                        </div>
                        <TextField
                            variant="outlined"
                            type={'number'}
                            size="small"
                            placeholder="$"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            sx={{ maxWidth: '100px' }}
                        />
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>
        <Box  justifyContent="center" mt={4}>
            {
                !isContinueClicked || returnFinalAmount() < 1 ? (
                    <BtnJoy disabled={returnFinalAmount() < 1} variant="solid" fullWidth onClick={handleSubmit}>
                        Continue
                    </BtnJoy>
                ): (
                    <>
                        <Stack direction={'column'} gap={2}>
                            <Divider>Support with ${returnFinalAmount()}</Divider>
                            <SupportSitePaypalButton 
                              handleFailure={handleFailure} 
                              handleSuccess={handleSuccess} 
                              amount={returnFinalAmount()}
                            />
                        </Stack>
                    </>
                )
            }

        </Box>
      </DialogContent>
    </Dialog>
  );
};


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';

export const SupportSiteButton = ({  type }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {
        type === 'list_item' ? (
          <ListItem  onClick={handleOpen} disablePadding>
          <ListItemButton>
              <ListItemText primary= {'Support Site'} />
          </ListItemButton>
      </ListItem>
        ) : 
        
          type === "button" ? (
            <>
              <Link onClick={handleOpen}  style={{ textDecoration: 'none', color: 'black' }} href={'#'}>
                <Button variant='plain' sx={{ margin: '0 10px' }}>
                  Support Site
                </Button>
              </Link>
            </>
          ) 
          :
          (
            <Link 
              style={{
                textDecoration: 'none',
                margin: '5px 15px', // Slight margin adjustment for better spacing
                color: 'inherit', // Ensure text color is consistent with parent.
              }} 
              href={'#'} 
              onClick={handleOpen} 
              disablePadding
            >
              <Typography variant={'body2'}>Support Site</Typography>
            </Link>
        )
      }
      <SupportModal open={open} handleClose={handleClose} />
    </>
  );
};