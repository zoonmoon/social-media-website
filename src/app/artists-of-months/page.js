'use client'
import { CircularProgress } from "@mui/material";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/joy";
import UploadMediaWidget from "../_components/_media-upload";
import Link from "next/link";
// API endpoints
const API = {
  GET: "/api/artists-of-months",
  POST: "/api/artists-of-months",
  PUT: "/api/artists-of-months",
  DELETE: "/api/artists-of-months",
};

export default function ArtistsOfMonthPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editArtist, setEditArtist] = useState(null);

  const [formData, setFormData] = useState({ username: "", title: "", image_url: "" });
  const [formErrors, setFormErrors] = useState({ username: "", title: "", image_url: "" });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [isAdmin, setIsAdmin] =  useState(false)
  
  // Fetch artists from API
  const fetchArtists = async () => {
    setLoading(true);
    try {
      const res = await fetch(API.GET);
      const data = await res.json();
      if (data.success) setArtists(data.data);
      setIsAdmin(data.is_admin)
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  // Validate form
  const validateForm = () => {
    const errors = { username: "", title: "", image_url: "" };
    let isValid = true;

    if (!formData.username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!formData.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (formData.image_url && !/^https?:\/\/.+\..+/.test(formData.image_url)) {
      errors.image_url = "Invalid URL";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Add new artist
const handleAdd = async () => {
  if (!validateForm()) return;

  setActionLoading(true); // start loading
  try {
    const res = await fetch(API.POST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      setSnackbar({ open: true, message: "Artist added!", severity: "success" });
      fetchArtists();
      setOpenAdd(false);
      setFormData({ username: "", title: "", image_url: "" });
      setFormErrors({ username: "", title: "", image_url: "" });
    } else {
      setSnackbar({ open: true, message: data.error || "Failed to add artist", severity: "error" });
    }
  } catch (error) {
    setSnackbar({ open: true, message: error.message, severity: "error" });
  } finally {
    setActionLoading(false); // stop loading
  }
};


const handleEdit = async () => {
  if (!formData.title.trim() || !formData.username.trim()) {
    setFormErrors({
      ...formErrors,
      title: !formData.title.trim() ? "Title is required" : "",
      username: !formData.username.trim() ? "Username is required" : "",
    });
    return;
  }

  setActionLoading(true);
  try {
    const res = await fetch(API.PUT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editArtist.id,
        username: formData.username,
        title: formData.title,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setSnackbar({ open: true, message: "Artist updated!", severity: "success" });
      fetchArtists();
      setOpenEdit(false);
      setEditArtist(null);
      setFormData({ username: "", title: "", image_url: "" });
      setFormErrors({ username: "", title: "", image_url: "" });
    } else {
      setSnackbar({
        open: true,
        message: data.error || "Failed to update artist",
        severity: "error",
      });
    }
  } catch (error) {
    setSnackbar({ open: true, message: error.message, severity: "error" });
  } finally {
    setActionLoading(false);
  }
};

const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this artist?")) return;

  setActionLoading(true);
  try {
    const res = await fetch(API.DELETE, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      setSnackbar({ open: true, message: "Artist deleted!", severity: "info" });
      fetchArtists();
    } else {
      setSnackbar({ open: true, message: data.error || "Failed to delete artist", severity: "error" });
    }
  } catch (error) {
    setSnackbar({ open: true, message: error.message, severity: "error" });
  } finally {
    setActionLoading(false);
  }
};


  const handleAddImage = (new_url) => setFormData({ ...formData, image_url: new_url })


if (loading) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh", // centers spinner vertically
      }}
    >
      <CircularProgress />
    </Box>
  );
}

  return (
    <Box sx={{ p: 3 }}>
      <div style={{textAlign:'center'}}>
        <Typography variant="h4" mb={2}>
          Artists of the Months
        </Typography>
        {
          isAdmin && (
            <Button variant="solid" onClick={() => setOpenAdd(true)} sx={{ mb: 3 }}>
              Add New Artist
            </Button>
          )
        }
      </div>


<Grid container spacing={3} direction="column">
  {artists.map((artist) => (
    <Grid item key={artist.id} xs={12}>
      <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{padding:'10px 0', borderBottom:'1px solid rgba(0,0,0,0.1)', background:'rgba(0, 0, 0, 0.05)', width:'100%'}}
        >

          {artist.image_url && (
            <CardMedia
              component="img"
              image={artist.image_url}
              alt={artist.title}
              sx={{
                maxHeight: "60vh",    // limit to 60% of viewport height
                width: "auto",        // natural width
                maxWidth: "100%",     // prevent overflow
                margin: "0 auto",     // center horizontally
                objectFit: "contain", // keep aspect ratio, no crop
              }}
            />
          )}

        </div>

        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6">{artist.title}</Typography>


        <Typography sx={{marginTop:'10px'}} variant="body2" color="text.secondary">
          <Link href={`/users/${artist.username}`} passHref style={{ textDecoration: "none", color: "inherit" }}>
            <Button>View Artist Profile</Button>
          </Link>
        </Typography>

        </CardContent>
        
        <CardActions sx={{display: isAdmin ? 'block': 'none'}}>
          <IconButton
            color="primary"
            onClick={() => {
              setEditArtist(artist);
              setFormData({
                username: artist.username,
                title: artist.title,
                image_url: artist.image_url,
              });
              setOpenEdit(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            loading={actionLoading}
            onClick={() => handleDelete(artist.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>


      {/* Add Artist Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Artist of the Month</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            value={formData.username}
            error={!!formErrors.username}
            helperText={formErrors.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={formData.title}
            error={!!formErrors.title}
            helperText={formErrors.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div style={{display:'flex',gap:'40px', marginTop:'20px', alignItems:'center'}}>
            <Typography variant="h6">Image</Typography>
            {formData.image_url.trim().length > 0 && (
              <img style={{width:'50px', height:'50px'}} src={formData.image_url} />
            )}
            <div>
              <UploadMediaWidget onSuccess={handleAddImage} uploadButtonText="Upload Image" 
                buttonText={formData.image_url.trim().length > 0 ? 'Change' : 'Add Image'} />
            </div>

          </div>
          
          



        </DialogContent>
        <DialogActions>
          <Button variant={'plain'} onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant={'solid'} onClick={handleAdd} loading={actionLoading} >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Artist Dialog */}
{/* Edit Artist Dialog */}
<Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
  <DialogTitle>Edit Artist of the Month</DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      label="Username"
      fullWidth
      value={formData.username}
      error={!!formErrors.username}
      helperText={formErrors.username}
      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
    />
    <TextField
      margin="dense"
      label="Title"
      fullWidth
      value={formData.title}
      error={!!formErrors.title}
      helperText={formErrors.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    />
  </DialogContent>
  <DialogActions>
    <Button variant="plain" onClick={() => setOpenEdit(false)}>Cancel</Button>
    <Button
      variant="solid"
      onClick={handleEdit}
      loading={actionLoading}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
