import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { SupportSiteButton } from '../modals/support-site';

const Footer = () => {
  return (
    <div style={divStyle}>
      <Box sx={{ textAlign: 'center'}}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/feed" style={linkStyle}><Typography variant="body2">Home</Typography></Link>
          <Link href="/pages/about-us" style={linkStyle}><Typography variant="body2">About us</Typography></Link>
          <SupportSiteButton type={'tex'} />
          <Link href="/pages/privacy-policy" style={linkStyle}><Typography variant="body2">Privacy Policy</Typography></Link>
          <Link href="/pages/terms-of-use" style={linkStyle}><Typography variant="body2">Terms of use</Typography></Link>
          <Link href="#" style={linkStyle}><Typography variant="body2">&copy; 2025 Beaver Entertainment LLC. All rights reserved.
          </Typography></Link>
        </Box>
      </Box>
    </div>
  );
};

const linkStyle = {
  textDecoration: 'none',
  margin: '5px 15px', // Slight margin adjustment for better spacing
  color: 'inherit', // Ensure text color is consistent with parent.
};


const divStyle = {
  background: 'white',
  position:'fixed',
  bottom: '0px',
  padding: '5px 0',
  width: '100%'
}

export default Footer;
