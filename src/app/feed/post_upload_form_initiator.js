import ShortTextIcon from '@mui/icons-material/ShortText';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import MicIcon from '@mui/icons-material/Mic';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { Skeleton, Typography } from '@mui/material';
import Link from 'next/link';
import CreativesIntro from './creatives_intro';

export default function PostUploadFormInitiator({handlePostUploadFormDisplay, data}){

    console.log(data)

    if(data?.is_logged_in === false){
       return(<CreativesIntro />)
    }
    
    return(
        <>
            <Grid container spacing={2}>
                
                {
                    data?.userInfo?.profile_pic_src 
                        ? (
                            <></>
                        ): (
                            <Grid item>
                            <Skeleton variant="circular" width={50} height={50} />
                            </Grid>
                        )
                }
                
                <Grid item xs onClick={handlePostUploadFormDisplay}>
                    {
                        data?.userInfo?.profile_pic_src ? (
                            <div>
                                <div style={{ marginBottom:'10px', textAlign:'center'}}>Upload your art here, {data?.userInfo?.name?.split(" ")?.[0] || "friend"}.</div>
                                <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                                    <div class="light-bg-on-hover" style={{flexGrow:'1', textAlign:'center',  padding:'12px 20px', curspor:'pointer', border:'1px solid rgba(0, 0, 0, 0.5)', borderRadius: '35px'}} >
                                        
                                        What do you want people to feel when they experience your art, {data?.userInfo?.name?.split(" ")?.[0] || "friend"}?
                                    </div>
                                 
                                </div>
                            </div>
        
                        ): (
                            <Skeleton variant="rounded" width={'100'} height={50} />
                        )
                    }
                </Grid>



            </Grid>
            {
                data?.userInfo?.profile_pic_src && (
                    <div onClick={handlePostUploadFormDisplay} style={{display:'flex', cursor:'pointer', justifyContent: 'space-around', marginTop: '20px', }}>
                    <ShortTextIcon />
                    <InsertPhotoIcon />
                    <VideoCameraBackIcon />
                    <MicIcon />
                </div> 
                )
            }



       
        </>
    )
}