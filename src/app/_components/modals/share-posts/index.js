import ShareIcon from '@mui/icons-material/Share';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button as BtnJoy } from '@mui/joy';

// Styled social media button
const SocialButton = ({ children, href }) => (
  <IconButton
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      backgroundColor: '#ffffff',
      borderRadius: '50%',
      padding: '12px',
      margin: '10px',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = '#f0f0f0';
      e.currentTarget.style.transform = 'scale(1.05)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = '#ffffff';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    {children}
  </IconButton>
);

// Modal component
const ShareModal = ({ open, handleClose, shareLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Define share URLs
  const smsShareUrl = `sms:?&body=${encodeURIComponent(`See the latest art that someone like you created: ${shareLink}`)}`;
  const emailShareUrl = `mailto:?subject=See the latest art that someone like you created&body=${encodeURIComponent(`See the latest art that someone like you created: ${shareLink}`)}`;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="share-dialog-title"
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '800px',
        },
      }}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <DialogTitle id="share-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Share this Post
      </DialogTitle>
      <DialogContent>
        <Box display="flex" gap={4} justifyContent="center" alignItems="center">
          <SocialButton href={smsShareUrl}>
            <SmsIcon style={{ color: '#1DA1F2', fontSize: '36px' }} />
          </SocialButton>
          <SocialButton href={emailShareUrl}>
            <EmailIcon style={{ color: '#D44638', fontSize: '36px' }} />
          </SocialButton>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            onClick={handleCopyLink}
            startIcon={<ContentCopyIcon />}
            style={{
              borderRadius: '25px',
              backgroundColor: '#0077ff',
              textTransform: 'none',
              fontWeight: 'bold',
              padding: '10px 20px',
              fontSize: '16px',
            }}
          >
            {copied ? 'Link Copied!' : 'Copy Link'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const ShareButton = ({ postID }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const shareLink = `https://${window.location.hostname}/posts/${postID}`;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <BtnJoy
        fullWidth
        onClick={handleOpen}
        variant="outlined"
        color="neutral"
        startDecorator={<ShareIcon />}
      >
        {isMobile ? '' : 'Share'}
      </BtnJoy>

      <ShareModal open={open} handleClose={handleClose} shareLink={shareLink} />
    </>
  );
};

export default ShareButton;