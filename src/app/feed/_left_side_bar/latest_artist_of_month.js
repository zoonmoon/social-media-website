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
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@mui/joy";
import  LaunchIcon from '@mui/icons-material/Launch';

const API = {
  GET: "/api/artists-of-months",
};

export default function LatestArtistOfMonth() {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchLatestArtist = async () => {
    setLoading(true);
    try {
      const res = await fetch(API.GET);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        // Since API sorts DESC, first element is latest
        setArtist(data.data[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestArtist();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", marginTop:'20px', justifyContent: "center", p: 4, background:'white' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!artist) {
    return (
      <Typography variant="body1" align="center">
        No Artist of the Month yet.
      </Typography>
    );
  }

  return (
    <Card onClick={() => router.push("/artists-of-months")} sx={{ maxWidth: 500,  cursor:'pointer', margin: "15px auto" }}>
        <div style={{textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', padding:'10px'}}> 
                    <Typography >Artist of the Month

        </Typography>
                        <LaunchIcon/>

        </div>

      <CardActionArea onClick={() => router.push("/artists-of-months")}>
        {artist.image_url && (
            <div> 
          <CardMedia
            component="img"
            height="150"
            
            image={artist.image_url}
            sx={{  objectFit: "cover" }}
          />
            </div>

        )}
        <CardContent sx={{textAlign:'center'}}>
          <Link href={'/artists-of-months'}>
            <Button>View All</Button>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
