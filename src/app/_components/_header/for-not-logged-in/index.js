import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container, Drawer, List, ListItem, ListItemText, useMediaQuery, Box, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/joy';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import { SupportSiteButton } from '../../modals/support-site';

const LoggedOutHeader = () => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen size

  const handleArtistSearch = () => {
    const q = searchTerm.trim();
    if (!q) return;
    router.push(`/search/${encodeURIComponent(q)}`);
  };

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
        <Link style={{ textDecoration: 'none', color: 'black', width: '100%' }} href="/blogs-v2/earn-money-online-here-creatives">
          <ListItemText primary="Earn Income" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link href="/landing-pages" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Pages" />
        </Link>
      </ListItem>

    
      <ListItem button>
        <Link href="/blogs-v2" style={{ textDecoration: 'none',width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Blogs" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link style={{ textDecoration: 'none', color: 'black', width: '100%' }} href="/landing-pages/about-us">
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
        <Link href="/pages/faq" style={{ textDecoration: 'none',width: '100%', color: 'inherit' }}>
          <ListItemText primary="FAQs" />
        </Link>
      </ListItem>
      <ListItem button>
        <Link href="/landing-pages/privacy-policy" style={{ textDecoration: 'none', width: '100%',  color: 'inherit' }}>
          <ListItemText primary="Privacy Policy" />
        </Link>
      </ListItem>

      <ListItem button>
        <Link href="/landing-pages/terms-of-use" style={{ textDecoration: 'none', width: '100%',  color: 'inherit' }}>
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

    <AppBar position="sticky" color="transparent" sx={{ 
        boxShadow: 'none', 
        paddingTop:'15px', 
        paddingBottom:'10px' 
      }}
    >

      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* Logo on the left */}
        
        {
          isMobile && (
            <Typography  variant="h6" noWrap sx={{ minWidth:'250px', flexGrow: 1, position: 'relative', display: 'inline-block' }}>
              <a href="/feed" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', display: 'inline-block' }}>
                <img src="/site-assets/artyxpress-logo.png" width="150" height="auto" alt="Logo" />
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
          )
        }

        {
          !isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 'auto', ml: 1, width: '360px', minWidth: '240px', zIndex: 2 }}>
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #dfe6f1',
                  backgroundColor: '#f5f7fb',
                  borderRadius: '999px',
                  px: 1.5,
                  py: 0.75,
                  width: '100%',
                  minWidth: 0,
                  boxShadow: 'inset 0 1px 2px rgba(15, 23, 42, 0.04)'
                }}
              >
                <SearchIcon sx={{ color: '#6b7280', fontSize: 18, mr: 1 }} />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleArtistSearch();
                  }}
                  placeholder="Search artists..."
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '0.9rem',
                    color: '#111827',
                    width: '100%',
                    minWidth: 0
                  }}
                />
              </Box>
              <Button
                variant={'solid'}
                onClick={handleArtistSearch}
                sx={{ minWidth: '110px', borderRadius: '999px', whiteSpace: 'nowrap' }}
              >
                Search
              </Button>
            </Box>
          )
        }


 
        {
          (!isMobile) && (

              <Typography  variant="h6" noWrap sx={{ 
                left: '50%',
                transform:'translateX(-50%)',
                position: 'absolute',
                minWidth:'400px',
                display:'flex',
                justifyContent:'center' 
              }}
              >
                <a href="/feed" style={{ textDecoration: 'none', color: 'inherit', position: 'relative', display: 'inline-block' }}>
                  <img src="/site-assets/artyxpress-logo.png" style={{width:'200px'}} height="auto" alt="Logo" />
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

          )
        }



        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #dfe6f1', backgroundColor: '#f5f7fb', borderRadius: '999px', px: 1, py: 0.5, maxWidth: '170px', width: '100%', mr: 1 }}>
            <SearchIcon sx={{ color: '#6b7280', fontSize: 18, mr: 0.5 }} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleArtistSearch();
              }}
              placeholder="Search"
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.8rem',
                color: '#111827',
                width: '100%',
                minWidth: 0
              }}
            />
          </Box>
        )}

        {/* Only show menu items in the center for larger screens */}
        {(isMobile &&!isMobile) && (

          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              <Link style={{ textDecoration: 'none', color: 'black' }} href={'/feed'}>
                <Button variant='plain' sx={{ margin: '0 10px' }}>
                  Feed
                </Button>
              </Link>

              <Link style={{ textDecoration: 'none', color: 'black' }} href={'/blogs-v2/earn-money-online-here-creatives'}>
                <Button variant='plain' sx={{ margin: '0 10px' }}>
                  Earn Income
                </Button>
              </Link>



              <Link style={{ textDecoration: 'none', color: 'black' }} href={'/landing-pages/about-us'}>
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

              <Link href="/pages/faq" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="plain" sx={{ margin: '0 10px' }}>
                  FAQs
                </Button>
              </Link>

              
              {/* Log In Button wrapped in Link */}
              <Link style={{ textDecoration: 'none', color: 'black' }} href="/login">
                <Button variant={'solid'} sx={{ marginLeft: '10px', paddingTop:'10px', paddingBottom:'10px', minWidth: '200px' }}>
                  Log In
                </Button>
              </Link>
            </div>
          </Container>
        )}

        <Stack
          direction={'row'}
          spacing={2}
        >
          {
            (!isMobile) && (

              <Link style={{ textDecoration: 'none', color: 'black' }} href="/login">
                <Button variant={'solid'} sx={{ marginLeft: '10px', paddingTop:'10px', paddingBottom:'10px', minWidth: '200px' }}>
                  Join the Community
                </Button>
              </Link>


            )
          }

          <IconButton
            color="inherit"
            onClick={() => toggleDrawer(true)}
            edge="end"
          >
            <MenuIcon />
          </IconButton>
        

        </Stack>




      </Toolbar>

      {/* Drawer for mobile menu */}
      <Drawer PaperProps={{sx:{width:250}}} anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        {drawerItems}
      </Drawer>

    </AppBar>
  );
};

export default LoggedOutHeader;
