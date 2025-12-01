import ShortTextIcon from '@mui/icons-material/ShortText';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import MicIcon from '@mui/icons-material/Mic';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { Skeleton, Typography } from '@mui/material';
import Link from 'next/link';


export default function PostUploadFormInitiator({handlePostUploadFormDisplay, data}){

    console.log(data)

    if(data?.is_logged_in === false){
        return <div style={{textAlign:'center'}}>
            <h1>Join Our Art Community Network</h1>
            <Typography variant={'h4'}><strong>YourArton.com</strong></Typography>
            <Typography sx={{marginTop:'10px'}}><strong>Connect, Create, and Thrive as Artists</strong></Typography>
            <Typography sx={{marginTop:'10px'}}>
                Welcome to YourArtOn, a vibrant artist community network and social platform for artists where creativity thrives. Connect with fellow creatives, share your work, and join a creative art feed to showcase your talent. Our positive, artist community network and social platform for artists is designed so fans and friends can support creators, collaborate, and be inspired. Come join a creative art feed today and experience a community where artists and supporters grow together!
            </Typography>
        </div>
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
                                        
                                        What do you positively think about this art, {data?.userInfo?.name?.split(" ")?.[0] || "friend"}?
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