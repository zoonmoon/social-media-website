import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

const Footer = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 5 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/feed" style={linkStyle}><Typography variant="body2">Home</Typography></Link>
        <Link href="/pages/about-us" style={linkStyle}><Typography variant="body2">About us</Typography></Link>
        <Link href="/pages/contact-us" style={linkStyle}><Typography variant="body2">Contact us</Typography></Link>
        <Link href="/pages/be-the-one" style={linkStyle}><Typography variant="body2">Be the One</Typography></Link>
        <Link href="/pages/privacy-policy" style={linkStyle}><Typography variant="body2">Privacy Policy</Typography></Link>
        <Link href="/pages/terms-of-use" style={linkStyle}><Typography variant="body2">Terms of use</Typography></Link>
      </Box>
    </Box>
  );
};

const linkStyle = {
  textDecoration: 'none',
  margin: '5px 15px', // Slight margin adjustment for better spacing
  color: 'inherit', // Ensure text color is consistent with parent
};

export default Footer;
