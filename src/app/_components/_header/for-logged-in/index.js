import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link'; // Import Link from Next.js
import { Button } from '@mui/joy';
import { SupportSiteButton } from '../../modals/support-site';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen size

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const logOut = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    location.reload();
  };

  const drawerItems = (
    <List>
      <ListItem button>
        <Link href="/feed" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Feed" />
        </Link>
      </ListItem>
      <ListItem button>
        <Link href="/pages/about-us" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="About us" />
        </Link>
      </ListItem>
      <ListItem button>
        <Link href="/pages/contact-us" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Contact us" />
        </Link>
      </ListItem>
      <SupportSiteButton  type={'list_item'}/>

      <ListItem button>
        <Link href="/pages/be-the-one" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Be the One" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link href="/pages/privacy-policy" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Privacy Policy" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link href="/pages/terms-of-use" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Terms of Use" />
        </Link>
      </ListItem>

      <ListItem button onClick={logOut}>
        <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Log Out" />
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
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          <Link href="/feed" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/site-assets/logo.png" width={'200'} height={'auto'} />
          </Link>
        </Typography>

        {/* Menu items in the center (only shown on larger screens) */}
        {!isMobile && (
          <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/feed" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button variant="plain" sx={{ margin: '0 10px' }}>
                Feed
              </Button>
            </Link>            
            <Link href="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button variant="plain" sx={{ margin: '0 10px' }}>
                Settings
              </Button>
            </Link>
            <Link href="/pages/about-us" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button variant="plain" sx={{ margin: '0 10px' }}>
                About us
              </Button>
            </Link>
            <Link href="/pages/contact-us" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button variant="plain" sx={{ margin: '0 10px' }}>
                Contact us
              </Button>
            </Link>
            <SupportSiteButton  type={'button'}/>
            <Link href="/pages/be-the-one" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button variant="plain" sx={{ margin: '0 10px' }}>
                Be the One
              </Button>
            </Link>
          </Container>
        )}

        {/* Hamburger menu for mobile */}
        {isMobile && (
          <IconButton
            variant="plain"
            onClick={() => toggleDrawer(true)}
            edge="end"
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Account icon (no Link here, it's still clickable for the menu) */}
        <IconButton variant="plain" onClick={handleMenuClick} className='account-icon' edge="end">
          <AccountCircleIcon />
        </IconButton>

        {/* Menu for account actions */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'user-menu-button',
          }}
        >
            {/*}
          <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
          </Link>
          <Link href="/account-settings" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
          </Link>
          {*/}
          <MenuItem onClick={logOut}>Logout</MenuItem>
        </Menu>

        {/* Drawer for mobile menu */}
        <Drawer anchor="right" PaperProps={{sx:{width:250}}} open={drawerOpen} onClose={() => toggleDrawer(false)}>
          {drawerItems}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
