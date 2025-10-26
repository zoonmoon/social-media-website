import CardMedia from '@mui/material/CardMedia';
import { relative } from 'path';

export default function DisplayCardMedia({p}){
    if(p.media_src === null){
      return(
        <></>
      )
    }
    
    if(p.media_type.includes('video')){
      return(
        <CardMedia
        onContextMenu={(e) => e.preventDefault()}  // Prevent right-click menu
          component={'video'}
          width="100%"
          controls={true}
          height="auto"
          controlsList={'nodownload'}
          poster={p.thumbnail ? p.thumbnail : ''}
          src={p.media_src}
          sx={{maxHeight:'80vh', objectFit:"contain", background: p.thumbnail ? '': '#000000!important'}}
          alt="Paella dish"
        />
      )
    }else if(p.media_type.includes('audio')){
      return(
        <div style={{display:'flex', gap: '15px'}}>
          <div></div>
          <audio 
          controlsList='nodownload'
  onContextMenu={(e) => e.preventDefault()}  // Prevent right-click menu
          controls style={{width: '100%'}}>
            <source src={p.media_src} type={p.media_type} />
          </audio>
          <div></div>
        </div>
      )
    }else if(p.media_type.includes('image')){
      return(
        <CardMedia
        // onContextMenu={(e) => e.preventDefault()}  // Prevent right-click menu
        component={'img'}
          width="100%"
          controlsList={'nodownload'}
          height="auto"
          sx={{maxHeight:'80vh', objectFit:"contain"}}
          src={p.media_src}
          alt={p.caption}
        />
      )
    }else{
  
      const googleDocsViewerUrl = `https://docs.google.com/gview?url=${p.media_src}&embedded=true`;
  
      return (
        <div style={{position:'relative'}}>
          <div style={{position:'absolute', background:'transparent', zIndex:555, top: '-40px', right: '-40px', width:'150px', height: '150px', borderRadius: '50%'}}>
          </div>
          <iframe
            src={googleDocsViewerUrl}
            style={{ border: 'none', width: '100%', minHeight: '350px' }}
            title="PDF Viewer"
          />
        </div>

      );
    }
  }