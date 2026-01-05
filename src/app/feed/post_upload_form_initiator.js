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
        return <div >
            <h1>Creatives Wanted & Supported</h1>
            <Typography sx={{marginTop:'10px'}}><strong>Set your creativity free and connect with others through:
</strong></Typography>
            <Typography sx={{marginTop:'10px', textAlign:'left'}}>
<strong>Audio Art:</strong> singing, spoken word, music, interviews, and more.<br></br>
<strong>Visual Art:</strong> painting, sketching, drawing, sculpture, graphic design, behind-the-scenes videos, dancing, stand-up, short films, and more.<br></br>
<strong>Written Word:</strong> poems, short stories, personal narratives, creative writing, and more.<br></br>
We are all artists.

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