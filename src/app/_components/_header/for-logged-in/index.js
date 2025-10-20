import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link'; // Import Link from Next.js
import { Button } from '@mui/joy';
import { SupportSiteButton } from '../../modals/support-site';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

import CircleIcon from '@mui/icons-material/Circle';
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasAnyUnread, setHasAnyUnread] = useState(false)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen size

  const [isAdmin, setIsAdmin] = useState(false) 

  async function fetchNoti(){
    const notis = await fetch('/api/notifications')
    const notisJson  = await notis.json()
    const unreadNotis = notisJson?.notifications?.filter(n => n.is_read == 0)
    setIsAdmin(notisJson.is_admin)
    setHasAnyUnread(unreadNotis?.length > 0)
  }

  useEffect( () => {

    fetchNoti()

  }, [])

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
    window.location.href = "/feed"
  };

  const drawerItems = (
    <List>
      <ListItem button>
        <Link href="/feed" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Feed" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link href="/settings" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Settings" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link href="/blogs/earn-money-online-here-5ih3z" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Earn Income" />
        </Link>
      </ListItem>



      {
        isAdmin && (
        <ListItem button>
          <Link href="/admin" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
            <ListItemText primary="Admin Portal" />
          </Link>
        </ListItem>
        )
      }

      <ListItem button>
        <Link href="/artists-of-months" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Artists of the Months" />
        </Link>
      </ListItem>

      
      <ListItem button>
        <Link href="/blogs" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Blogs" />
        </Link>
      </ListItem>
      
      <ListItem button>
        <Link href="/pages/about-us" style={{ textDecoration: 'none', width: '100%', color: 'inherit' }}>
          <ListItemText primary="About us" />
        </Link>
      </ListItem>
      <ListItem button>
        <Link href="/pages/contact-us" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Contact us" />
        </Link>
      </ListItem>
      <SupportSiteButton  type={'list_item'}/>

      <ListItem button>
        <Link href="/pages/be-the-one" style={{ textDecoration: 'none',width: '100%', color: 'inherit' }}>
          <ListItemText primary="Be the One" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link href="/pages/privacy-policy" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Privacy Policy" />
        </Link>
      </ListItem>


      <ListItem button>
        <Link href="/pages/terms-of-use" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
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
          <a href="/feed" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/site-assets/logo.png" width={'150'} height={'auto'} />
          </a>
        </Typography>

        {/* Menu items in the center (only shown on larger screens) */}
        {!isMobile && (
          <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/feed" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button variant="plain" sx={{ margin: '0 10px' }}>
                Feed
              </Button>
            </Link>    

            <Link href="/blogs/earn-money-online-here-5ih3z" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button variant="plain" sx={{ margin: '0 10px' }}>
                Earn Income
              </Button>
            </Link>    



                  {
                    isAdmin && (
      

            <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button variant="plain" sx={{ margin: '0 10px' }}>
                Admin Portal
              </Button>
            </Link>

                    )
                  }

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
        {(
          <div style={{display:'flex', gap:'10px'}}>
            <Link href='/notifications'>
            <IconButton
            variant="plain"
            edge="end"
            sx={{position:'relative'}}
          >
            <CircleNotificationsIcon color={hasAnyUnread ? 'error' : ''} />
            {
              hasAnyUnread ? <>
                          <div style={{position:'absolute', color:'red', right: '0px', top: 0}}>
              <CircleIcon fontSize={'small'} />
            </div>
              </> : <></>
            }

          </IconButton>
          </Link>

          <IconButton
          variant="plain"
          onClick={() => toggleDrawer(true)}
          edge="end"
        >
          <AccountCircleIcon />
        </IconButton>
          </div>



        )}

        {/* Account icon (no Link here, it's still clickable for the menu) */}
        {/* <IconButton variant="plain" onClick={handleMenuClick} className='account-icon' edge="end">
          <AccountCircleIcon />
        </IconButton> */}

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