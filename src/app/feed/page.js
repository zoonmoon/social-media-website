'use client'
import FeedPosts from "./feed_posts"
import RightSidebar from "./right_side_bar"
import { Divider, Grid, Paper } from '@mui/material';
import {Container} from '@mui/material';
import LeftSideBar from './_left_side_bar';
import { useState, useEffect } from 'react';
import DisplaySelectedFiltersChips from './_selected_filters';
import LoadingPosts from './post_skeleton';
import smoothScrollToTop from './smooth_scroll_to_top';
import toast from 'react-hot-toast';
import PostUploadForm from "../_components/_post_upload_form";
import PostUploadFormInitiator from "./post_upload_form_initiator";
import { getRequest } from "../_components/file_upload";
import FeedLeftSidebarSkeleton from "./_left_side_bar/skeleton";
import Footer from "../_components/footer";


// 

export default function Feed(){

  const [postUploadFormOpen, setPostUploadFormOpen] = useState(false)
    
  const handlePostUploadFormDisplay = () => {setPostUploadFormOpen(!postUploadFormOpen)}

  const [posts, setPosts] = useState([])

  const [loading, setLoading] = useState(true)
  
  const [feedTypeFilter, setFeedTypeFilter] = useState([]) 

  const [page, setPage] = useState(1)

  const handleNextPage = () => setPage(prevPage => prevPage + 1);

  async function fetchDashboard() {
    
    try {

        setLoading(true)

        let apiURL = '/api/feed/';
        
        let filters = [];

        if(feedTypeFilter.length){           
          filters.push('feedTypeFilter='+feedTypeFilter.join('||'))
        }

        filters.push('page='+page) 

        console.log("updating site url from fetchDashboard")
        updateSiteURL()

        let queryParams = filters.join('&') 
        
        apiURL += '?' + queryParams
        

        const postsResponse = await fetch(apiURL)
        
        const postsResponseJson = await postsResponse.json();

        setPosts((prevPosts) => [
          ...prevPosts,
          ...(postsResponseJson.success ? postsResponseJson.posts : []),
        ]);
          

    } catch (error) {
        toast( error.message)
    }finally{
        setLoading(false)
    }
  }



  useEffect(() => {
    // This function will run only once when the component mounts
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // alert(l/oading)
      console.log(scrollPosition, documentHeight, loading)
      if ( (scrollPosition >= documentHeight - 100) && !loading) {
        handleNextPage()
      }
    };

    // Adding the event listener to window scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]); // Empty dependency array ensures this effect runs only once when the component mounts


  useEffect(() => {

      fetchDashboard();

  }, [feedTypeFilter, page]); 


  const updateSiteURL = () => {
    if(feedTypeFilter.length){ 
      history.replaceState({}, '', '/feed?filter='+feedTypeFilter.join(',') ) 
    }else{
      history.replaceState({}, '', '/feed/')
    }
  }

  const handleFeedTypeFilterChange = (filterBy) => {
    if(!(feedTypeFilter.includes(filterBy))){
      setFeedTypeFilter([filterBy])
      setPage(1)
      setPosts([])
    }
  }

  const handlFilterUnselect = (filterby) => {
    setFeedTypeFilter(feedTypeFilter.filter((item) => item !== filterby));
    setPage(1)
    setPosts([])
  }


  const [fetchingStats, setFetchingStats]= useState(true)
  const [profileStats, setProfileStats] = useState({})



  useEffect(()=> {
    async function fetchStats(){
      try{
        const userInfoJSON = await getRequest('/api/feed/left-side-bar')
        if(userInfoJSON.success !== true) throw new Error(userInfoJSON.msg)
          setProfileStats(userInfoJSON)
      }catch(error){
          toast(error.message)
      }finally{
        setFetchingStats(false)
      }
    }
    fetchStats();
  }, [])

  function isFooterVisible() {
    const count = posts.length - 4;
    console.log(posts.length)
    const block = count > 0 ?  Math.floor(count / 15) : 0;
    return block % 2 === 1;
  }

  useEffect(() => {

    if(isFooterVisible()){
      document.querySelector('.footer-fixed').style.display = "block"
    }else{
      document.querySelector('.footer-fixed').style.display = "none"
    }

  }, [posts])

  return(
    <>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{marginTop: '1px'}}>
          <Grid item xs={12} md={3}>
            {
              fetchingStats  ? <FeedLeftSidebarSkeleton /> :  <LeftSideBar feedTypeFilter={feedTypeFilter} handleFeedTypeFilterChange={handleFeedTypeFilterChange} profileStats={profileStats} />
            }
          </Grid>
          <Grid item xs={12} md={6}>

              <Paper sx={{paddingTop: {md: '20px', xs: '20px'}, paddingBottom: '20px', paddingLeft: '20px', paddingRight:'20px' }}>
                <PostUploadFormInitiator data={profileStats} handlePostUploadFormDisplay={handlePostUploadFormDisplay} />
              </Paper>
              <Divider sx={{marginBottom: '20px'}} />
              <FeedPosts posts={posts}  /> 
              {
                loading 
                  ? <LoadingPosts />
                  : <></>
              }
          </Grid>
          <Grid item xs={12} md={3}>
            <RightSidebar />
          </Grid>
        </Grid>
      </Container>
      {postUploadFormOpen ? <PostUploadForm onClose={handlePostUploadFormDisplay} /> : '' }

    </>
  )
}

