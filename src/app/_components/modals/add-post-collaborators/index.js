'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Stack,
  Typography,
  Divider,
  TextField,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemIcon,
  ListItemButton,
  InputAdornment
} from '@mui/material'

import Groups3Icon from '@mui/icons-material/Groups3'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import LaunchIcon from '@mui/icons-material/Launch'

import { Button } from '@mui/joy'
import toast from 'react-hot-toast'


/* =========================================================
   🔹 REUSABLE INNER CONTENT (NO MODAL)
========================================================= */

const AddCollaboratorsContent = ({ post_id, onClose }) => {

  const [searching, setSearching] = useState(false)
  const [loading, setLoading] = useState(true)
  const [collaborators, setCollaborators] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [saving, setSaving] = useState(false)

  // 🔹 Get initials
  const getInitials = (name) => {
    if (!name) return ''
    const parts = name.trim().split(' ')
    if (parts.length === 1) {
      return parts[0][0]?.toUpperCase()
    }
    return (
      parts[0][0]?.toUpperCase() +
      parts[parts.length - 1][0]?.toUpperCase()
    )
  }

  // 🔹 Fetch collaborators
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/post/${post_id}/collaborators`)
        const data = await res.json()

        if (data.success) {
          setCollaborators(data.collaborators || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCollaborators()
  }, [post_id])

  // 🔹 Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const delay = setTimeout(async () => {
      try {
        setSearching(true)

        const res = await fetch(`/api/search?query=${searchQuery}`)
        const data = await res.json()

        if (data.success) {
          setSearchResults(data.suggestions || [])
        } else {
          setSearchResults([])
        }

      } catch (err) {
        console.error(err)
        setSearchResults([])
      } finally {
        setSearching(false)
      }
    }, 400)

    return () => clearTimeout(delay)

  }, [searchQuery])

  const addCollaborator = (user) => {
    const exists = collaborators.some(
      u => u.username === user.username
    )

    if (!exists) {
      setCollaborators(prev => [...prev, user])
    }

    setSearchQuery('')
    setSearchResults([])
  }

  const removeCollaborator = (username) => {
    setCollaborators(prev =>
      prev.filter(u => u.username !== username)
    )
  }

  const handleApply = async () => {
    try {
      setSaving(true)

      const res = await fetch(`/api/post/${post_id}/collaborators`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id,
          collaborators: collaborators.map(u => u.username)
        })
      })

      const data = await res.json()

      if (data.success) {
        toast("Collaborators applied")
        if (onClose){
          window.location.href='/posts/'+post_id+'?show_collaborators=true'
        }
      }

    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <DialogContent>

        {loading ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress />
            <Typography mt={2}>
              Loading collaborators...
            </Typography>
          </Box>
        ) : (
          <Stack spacing={0}>

            {/* 🔎 Search */}
            <TextField
              placeholder="Search users by name or username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
            />

            {/* 🔎 Search Results */}
            {searchQuery.trim() && (
              <Box
                sx={{
                  maxHeight: 200,
                  overflowY: 'auto',
                  border: '1px solid #eee',
                  borderRadius: 2,
                  mt: 1,
                }}
              >
                {searching ? (
                  <Box sx={{ py: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Fetching suggestions...
                    </Typography>
                  </Box>
                ) : searchResults.length === 0 ? (
                  <Box sx={{ py: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No suggestions found
                    </Typography>
                  </Box>
                ) : (
                  <List disablePadding>
                    {searchResults.map(user => (
                      <ListItem
                        key={user.username}
                        onClick={() => addCollaborator(user)}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: '#f5f5f5' }
                        }}
                      >
                        <Avatar
                          src={user.profile_pic_src || undefined}
                          sx={{ mr: 2 }}
                        >
                          {!user.profile_pic_src &&
                            getInitials(user.name)}
                        </Avatar>

                        <ListItemText primary={user.name} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            )}

            <Divider sx={{ mt: 2, mb: 2 }} />

            {/* 👥 Selected */}
            <Typography variant="subtitle1">
              Selected Collaborators
            </Typography>

            {collaborators.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No collaborators selected.
              </Typography>
            ) : (
              <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                <List>
                  {collaborators.map(user => (
                    <ListItem
                      key={user.username}
                      secondaryAction={
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            onClick={() =>
                              window.open(`/users/${user.username}`, '_blank', 'noopener,noreferrer')
                            }
                          >
                            <LaunchIcon />
                          </IconButton>

                          <IconButton
                            onClick={() =>
                              removeCollaborator(user.username)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      }
                    >
                      <Avatar
                        src={user.profile_pic_src || undefined}
                        sx={{ mr: 2 }}
                      >
                        {!user.profile_pic_src &&
                          getInitials(user.name)}
                      </Avatar>

                      <ListItemText primary={user.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

          </Stack>
        )}
      </DialogContent>

      {!loading && (
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid #eee',
            background: '#fff'
          }}
        >
          <Button
            variant="solid"
            fullWidth
            size="lg"
            loading={saving}
            onClick={handleApply}
          >
            {saving ? 'Applying...' : 'Apply'}
          </Button>
        </Box>
      )}
    </>
  )
}


/* =========================================================
   🔹 MODAL WRAPPER
========================================================= */

const AddCollaboratorsToPost = ({ open, handleClose, post_id }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ style: { borderRadius: 20 } }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', pr: 1 }}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Manage Collaborators
        </DialogTitle>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <AddCollaboratorsContent
        post_id={post_id}
        onClose={handleClose}
      />
    </Dialog>
  )
}


/* =========================================================
   🔹 BUTTON TRIGGER
========================================================= */

const AddCollaboratorsToPostButton = ({ post_id, type = "list-item" }) => {

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      {type === 'list-item'
        ? (
          <ListItem onClick={handleOpen} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Groups3Icon />
              </ListItemIcon>
              <ListItemText primary="Manage Collaborators" />
            </ListItemButton>
          </ListItem>
        )
        : (
          <Button fullWidth onClick={handleOpen}>
            Add Collaborators
          </Button>
        )
      }

      <AddCollaboratorsToPost
        open={open}
        handleClose={handleClose}
        post_id={post_id}
      />
    </>
  )
}


/* =========================================================
   🔹 EXPORTS
========================================================= */

export {
  AddCollaboratorsToPostButton,
  AddCollaboratorsToPost,
  AddCollaboratorsContent
}