'use client'
import smoothScrollToTop from "@/app/feed/smooth_scroll_to_top";
import FeedPosts from "@/app/feed/feed_posts";
import LoadingPosts from "@/app/feed/post_skeleton";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
export default function UserPosts({username}){

    const [isLoading, setIsLoading]  = useState(true)

    const [feedTypeFilter, setFeedTypeFilter] = useState('')

    const [posts, setPosts] = useState([])

    const [page, setPage] = useState(1)

    useEffect(() => {

      if(window.innerWidth > 768 && document.querySelector('.footer-fixed')){
        document.querySelector('.footer-fixed').style.display = "none"
      }
  
    }, [])
  
    const [end, setEnd] = useState(false)

    async function fetchUserPosts() {
    
        try {
    
            setIsLoading(true)
    
            let apiURL = '/api/feed/';
            
            let queryParams = [];
                
            queryParams.push('of_user=' + username)
    
            queryParams.push('page='+page) 
    
    
            if(queryParams.length){
                apiURL+= '?' + queryParams.join('&')
            }            
            
    
            const postsResponse = await fetch(apiURL)
            
            const postsResponseJson = await postsResponse.json();
    
            if(!postsResponseJson.success || postsResponseJson.posts.length == 0) setEnd(true) 

            setPosts((prevPosts) => [
              ...prevPosts,
              ...(postsResponseJson.success ? postsResponseJson.posts : []),
            ]);
              
    
        } catch (error) {
            toast( error.message)
        }finally{
            setIsLoading(false)
        }
    }

   

    const handleNextPage = () => setPage(prevPage => prevPage + 1);


    useEffect(() => {
        // This function will run only once when the component mounts
        const handleScroll = () => {
          const scrollPosition = window.scrollY + window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          // alert(l/oading)
          if ( (scrollPosition >= documentHeight - 100) && !isLoading && !end) {
            handleNextPage()
          }
        };
    
        // Adding the event listener to window scroll
        window.addEventListener('scroll', handleScroll);
    
        // Cleanup function to remove the event listener when the component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };

      }, [isLoading]); // Empty dependency array ensures this effect runs only once when the component mounts
    
      useEffect(() => {


        fetchUserPosts();
  
    }, [page]);  

    return(
        <>
            <FeedPosts posts={posts}  /> 
            {
            isLoading 
                ? <LoadingPosts />
                : <></>
            }
        </>
    )
}