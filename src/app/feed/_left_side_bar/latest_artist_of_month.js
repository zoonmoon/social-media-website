// 'use client'
// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Typography,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@mui/joy";
// import  LaunchIcon from '@mui/icons-material/Launch';

// const API = {
//   GET: "/api/artists-of-months",
// };

// export default function LatestArtistOfMonth() {
//   const [artist, setArtist] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const fetchLatestArtist = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(API.GET);
//       const data = await res.json();
//       if (data.success && data.data.length > 0) {
//         // Since API sorts DESC, first element is latest
//         setArtist(data.data[0]);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLatestArtist();
//   }, []);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", marginTop:'20px', justifyContent: "center", p: 4, background:'white' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!artist) {
//     return (
//       <Typography variant="body1" align="center">
//         No Artist of the Month yet.
//       </Typography>
//     );
//   }

//   return (
//     <Card onClick={() => router.push("/artists-of-months")} sx={{ maxWidth: 500,  cursor:'pointer', margin: "15px auto" }}>
        
//         <div>
//             <div style={{textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', padding:'10px'}}> 
//                 <Typography >Artist of the Month</Typography>
//                 <LaunchIcon/>

//             </div>
//         </div>


//       <CardActionArea onClick={() => router.push("/artists-of-months")}>
//         {artist.image_url && (
//             <div> 
//           <CardMedia
//             component="img"
//             height="150"
            
//             image={artist.image_url}
//             sx={{  objectFit: "cover" }}
//           />
//             </div>

//         )}
//         <CardContent sx={{textAlign:'center'}}>
//           <Link href={'/artists-of-months'}>
//             <Button>View All</Button>
//           </Link>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }




'use client'
import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@mui/joy";
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';

const API = {
  GET: "/api/artists-of-months",
};

// Helper to get a cookie by name
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Helper to set a cookie
function setCookie(name, value, days = 30) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

export default function LatestArtistOfMonth() {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const fetchLatestArtist = async () => {
    setLoading(true);
    try {
      const res = await fetch(API.GET);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        const latestArtist = data.data[0];
        setArtist(latestArtist);

        // Check cookie
        const dismissedId = getCookie("dismissed_artist_id");
        if (dismissedId  &&  dismissedId === latestArtist.id.toString()) {
          setDismissed(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetchLatestArtist();
  }, []);

  const handleDismiss = () => {
    if (artist) {
      setCookie("dismissed_artist_id", artist.id.toString(), 30);
      setDismissed(true);
    }
  };

// Only hide on mobile if dismissed
  if (isMobile && dismissed) return null;

  return (
    <Card sx={{ maxWidth: 500, cursor: 'pointer', margin: "15px auto", position: 'relative' }}>
      {isMobile && (
        <IconButton 
          size="small" 
          onClick={handleDismiss} 
          sx={{ position: 'absolute', top: 5, right: 5, zIndex: 2 }}
        >
          <CloseIcon />
        </IconButton>
      )}

      <div style={{ textAlign: 'center', display: 'flex',  justifyContent: isMobile?'left':'center', alignItems: 'center', gap: '8px', padding: '10px' }}> 
        <Typography>Artist of the Month</Typography>
        <LaunchIcon />
      </div>

      <CardActionArea onClick={() => router.push("/artists-of-months")}>
        {artist.image_url && (
          <CardMedia
            component="img"
            height="150"
            image={artist.image_url}
            sx={{ objectFit: "cover" }}
          />
        )}
        <CardContent sx={{ textAlign: 'center' }}>
          <Link href={'/artists-of-months'}>
            <Button>View All</Button>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
