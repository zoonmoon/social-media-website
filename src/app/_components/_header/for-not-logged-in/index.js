import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container, Drawer, List, ListItem, ListItemText, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/joy';
import Link from 'next/link';
import { SupportSiteButton } from '../../modals/support-site';

const LoggedOutHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen size

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const drawerItems = (
    <List>
      <ListItem button>
        <Link style={{ textDecoration: 'none', color: 'black' }} href="/login">
          <Button fullWidth variant={'solid'} sx={{  minWidth: '100%' }}>
            Log In
          </Button>
        </Link>
      </ListItem>
      <hr style={{opacity: 0.3}} /> 
      <ListItem button>
        <Link style={{ textDecoration: 'none', color: 'black', width: '100%' }} href="/feed">
          <ListItemText primary="Feed" />
        </Link>
      </ListItem>
      <ListItem button>
        <Link style={{ textDecoration: 'none', color: 'black', width: '100%' }} href="/artists-of-months">
          <ListItemText primary="Artist of the Month" />
        </Link>
      </ListItem>
      <ListItem button>
        <Link style={{ textDecoration: 'none', color: 'black', width: '100%' }} href="/blogs/earn-money-online-here-5ih3z">
          <ListItemText primary="Earn Income" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link href="/blogs-v2" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Blogs" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link style={{ textDecoration: 'none', color: 'black', width: '100%' }} href="/pages/about-us">
          <ListItemText primary="About us" />
        </Link>
      </ListItem>
      <ListItem button>
        <Link style={{ textDecoration: 'none', color: 'black', width: '100%' }} href="/pages/contact-us">
          <ListItemText primary="Contact us" />
        </Link>
      </ListItem>
      <SupportSiteButton  type={'list_item'}/>
      <ListItem button>
        <Link href="/pages/be-the-one" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Be the One" />
        </Link>
      </ListItem>


      <ListItem button>
        <Link href="/pages/privacy-policy" style={{ textDecoration: 'none', width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Privacy Policy" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link href="/pages/terms-of-use" style={{ textDecoration: 'none', width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Terms of Use" />
        </Link>
      </ListItem>
      
      <hr style={{opacity: 0.3}} /> 


      <ListItem button>
        <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="&copy; 2025 Beaver Entertainment LLC. All rights reserved." />
        </Link>
      </ListItem>


    </List>
  );

  return (
    <AppBar position="sticky" color="transparent" sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo on the left */}
<Typography variant="h6" noWrap sx={{ flexGrow: 1, position: 'relative', display: 'inline-block' }}>
  <a href="/feed" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', display: 'inline-block' }}>
    <img src="/site-assets/logo.png" width="150" height="auto" alt="Logo" />
    <Box
      sx={{
        position: 'absolute',
        top: 10,
        right: -30,
        bgcolor: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
        color: 'white',
        fontSize: '0.65rem',
        fontWeight: 600,
        px: 0.8,
        py: '2px',
        borderRadius: '9999px',
        boxShadow: 1,
      }}
    >
      Beta
    </Box>
  </a>
</Typography>


        {/* Only show menu items in the center for larger screens */}
        {!isMobile && (
          <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              <Link style={{ textDecoration: 'none', color: 'black' }} href={'/feed'}>
                <Button variant='plain' sx={{ margin: '0 10px' }}>
                  Feed
                </Button>
              </Link>

              <Link style={{ textDecoration: 'none', color: 'black' }} href={'/blogs/earn-money-online-here-5ih3z'}>
                <Button variant='plain' sx={{ margin: '0 10px' }}>
                  Earn Income
                </Button>
              </Link>



              <Link style={{ textDecoration: 'none', color: 'black' }} href={'/pages/about-us'}>
                <Button variant='plain' sx={{ margin: '0 10px' }}>
                  About Us
                </Button>
              </Link>
              <Link style={{ textDecoration: 'none', color: 'black' }} href={'/pages/contact-us'}>
                <Button variant='plain' sx={{ margin: '0 10px' }}>
                  Contact Us
                </Button>
              </Link>
              <SupportSiteButton  type={'button'}/>
              <Link href="/pages/be-the-one" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="plain" sx={{ margin: '0 10px' }}>
                  Be the One
                </Button>
              </Link>
              {/* Log In Button wrapped in Link */}
              <Link style={{ textDecoration: 'none', color: 'black' }} href="/login">
                <Button variant={'solid'} sx={{ marginLeft: '10px', minWidth: '100px' }}>
                  Log In
                </Button>
              </Link>
            </div>
          </Container>
        )}

        {/* Hamburger menu for mobile */}
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={() => toggleDrawer(true)}
            edge="end"
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Drawer for mobile menu */}
      <Drawer PaperProps={{sx:{width:250}}} anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        {drawerItems}
      </Drawer>
    </AppBar>
  );
};

export default LoggedOutHeader;
