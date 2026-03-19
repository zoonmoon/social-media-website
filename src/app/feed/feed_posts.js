'use client'

import Post from '../_components/post';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import NonStickyFooter from '../_components/footer/non-fixed-footer';
import { Button } from '@mui/joy';
import Link from 'next/link';

export default function FeedPosts({posts}) {
    useEffect(() => {
        // Find all ad containers
        const ads = document.querySelectorAll('.adsbygoogle');
    
        // Loop through the ad containers and push ads only if not initialized
        ads.forEach((ad, index) => {
          // Only push ads to 'ins' elements that don't have the 'data-adsbygoogle-status' attribute set to 'done'
          if (!ad.hasAttribute('data-adsbygoogle-status') || ad.getAttribute('data-adsbygoogle-status') !== 'done') {
            // Push ad if not already initialized
            if (typeof window !== 'undefined' && window.adsbygoogle) {
              window.adsbygoogle.push({});
            }
          }
        });
    }, [posts]);  // Re-run the effect when posts change

    return (
        <>        
            <Stack container spacing={1}>
                {
                    posts.map((post, index) => {
                        return(
                            <div key={index}>

                                <Post post={post} key={index} />
                                

                                {/* LOGIN CTA after every 2 posts if user not logged in */}
                                {/* {(index + 1) % 2 === 0 && post?.has_logged_in === false && (
                                    <Paper elevation={3} sx={{ p: 3, borderRadius:'10px',  mt: 2, mb:2, textAlign: 'center' }}>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Create an account or log in to interact with posts
                                        </Typography>

                                        <Stack
                                            spacing={2}
                                            divider={<Divider />}
                                        >
                                            <Link href={'/login'}>
                                                <Button
                                                    variant="solid"
                                                    sx={{padding:'10px 40px'}}
                                                >
                                                    Create new Account
                                                </Button>
                                            </Link>
                                            
                                            <Link href={'/login'}>
                                                <Button
                                                    variant="outlined"
                                                    sx={{padding: '0 20px'}}
                                                >
                                                    Login
                                                </Button>
                                            </Link>



                                        </Stack>


                                    </Paper>
                                )} */}

                                {/* Show Ad after every 5th post */}
                                
                                    {(index + 1) % 5 === 0 && (
                                        <div key={`ad-${index}`}>
                                            <ins class="adsbygoogle"
                                                style={{display:'block'}}
                                                data-ad-client="ca-pub-7180492942755368"
                                                data-ad-slot="5330803639"
                                                data-ad-format="auto"
                                                data-full-width-responsive="true"></ins>
                                        </div>
                                    )}

                                {/* Show footer after every 15th post */}
                                {/* {
                                    (index + 1) % 15 === 0 && (
                                        <NonStickyFooter />
                                    ) 
                                } */}

                            </div>
                        
                        )
                    
                    })
                
                }
            
            </Stack>
        
        </>
    
    );

}