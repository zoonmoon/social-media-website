'use client'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Divider, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { getRequest } from '@/app/_components/file_upload';
import Header from '@/app/_components/_header';
import { useRouter } from 'next/navigation';

export default function SearchResults({ params }) {
  const [loading, setIsLoading] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState(decodeURIComponent(params.query || ''))
  const router = useRouter()
  const query = decodeURIComponent(params.query || '')

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true)
        const data = await getRequest('/api/search?query=' + encodeURIComponent(query))
        setSearchResults(data?.suggestions || [])
      } catch (error) {
        console.error(error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  const handleClick = (username) => {
    router.push(`/users/${encodeURIComponent(username)}`)
  }

  const handleSearch = () => {
    const trimmed = searchTerm.trim()
    if (!trimmed) return
    router.push(`/search/${encodeURIComponent(trimmed)}`)
  }

  return (
    <>
      <Header />
      <Container sx={{ marginTop: '30px' }} maxWidth="md">
        <Paper sx={{ paddingTop: '10px', paddingBottom: '20px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 3, pt: 2, pb: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                border: '1px solid #dfe6f1',
                backgroundColor: '#f5f7fb',
                borderRadius: '999px',
                px: 1.5,
                py: 0.7
              }}
            >
              <SearchIcon sx={{ color: '#6b7280', fontSize: 18, mr: 1 }} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch()
                }}
                placeholder="Search artists..."
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '0.95rem',
                  color: '#111827',
                  width: '100%',
                  minWidth: 0
                }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ borderRadius: '999px', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', textTransform: 'none', px: 2.5 }}
            >
              Search
            </Button>
          </Box>

          {loading ? (
            <div style={{ textAlign: 'center' }}>Loading</div>
          ) : (
            <>
              <div>
                <h4 style={{ textAlign: 'center' }}>Search Results for <i>{query}</i></h4>
              </div>
              <Divider />
              <div style={{ padding: '30px' }}>
                {searchResults.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#666' }}>
                    No artists found for this search.
                  </div>
                ) : (
                  <Grid container spacing={2}>
                    {searchResults.map((sr, index) => (
                      <Grid item xs={12} sm={6} md={4} key={`${sr.username}-${index}`} sx={{ justifyContent: 'center' }}>
                        <Card style={{ cursor: 'pointer' }} onClick={() => handleClick(sr.username)}>
                          <CardHeader
                            avatar={
                              <Avatar
                                src={sr.profile_pic_src || undefined}
                                alt={sr.name || sr.username}
                                aria-label="artist-profile"
                              >
                                {!sr.profile_pic_src && (sr.name || sr.username || 'A').charAt(0).toUpperCase()}
                              </Avatar>
                            }
                            title={sr.name || sr.username}
                            subheader={`@${sr.username}`}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </div>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
}