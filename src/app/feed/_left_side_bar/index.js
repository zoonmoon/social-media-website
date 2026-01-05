import GroupsDropdown from "@/app/_components/_groups_sidebar/groups_dropdown";
import PPandCover from "./cover_and_pp";
import NonStickyFooter from "@/app/_components/footer/non-fixed-footer";
import Alert from '@mui/material/Alert';
import Link from "next/link";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import LatestArtistOfMonth from "./latest_artist_of_month";
import PostUploadFormInitiator from "../post_upload_form_initiator";

import { useRef, useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import PostUploadForm from "@/app/_components/_post_upload_form";
export default function LeftSideBar({profileStats,handlFilterReset , handleFeedTypeFilterChange, feedTypeFilter }){


  const sidebarRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("auto");
  const [isHovered, setIsHovered] = useState(false);
  const[isOverflowing, setIsOverflowing] = useState(false)
  const [postUploadFormOpen, setPostUploadFormOpen] = useState(false)
    
  const [isMobile, setIsMobile] = useState(false)
  const handlePostUploadFormDisplay = () => {setPostUploadFormOpen(!postUploadFormOpen)}

  useEffect(() => {

    setIsMobile(window.innerWidth < 600)

    const updateHeight = () => {
      if (sidebarRef.current) {
        const sidebarTop = sidebarRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const calculatedHeight = windowHeight - sidebarTop - 20; // 20px for margin/padding buffer
        setMaxHeight(`${calculatedHeight}px`);

      const el = sidebarRef.current;
      const isOverflowing = el.scrollHeight > el.clientHeight;
      setIsOverflowing(isOverflowing)
      console.log('Sidebar is overflowing:', isOverflowing);

      }
    };

    // Initial calculation
    updateHeight();
})


    return(
        <div className="left-side-bar"  
        ref={sidebarRef}
        style={{
            maxHeight: isMobile ? 'unset' : maxHeight ,
            overflowY: (isOverflowing && isHovered ) ? "auto" :"hidden",
            paddingRight:isMobile ? 0 : "15px",
            transition: "max-height 0.3s ease",
        }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
        >
      {postUploadFormOpen ? <PostUploadForm onClose={handlePostUploadFormDisplay} /> : '' }

            <div >

               <Paper sx={{display:{xs:'block', md:'none'}, marginBottom:'20px', paddingTop: {md: '20px', xs: '20px'}, paddingBottom: '20px', paddingLeft: '20px', paddingRight:'20px' }}>
                        <PostUploadFormInitiator data={profileStats} handlePostUploadFormDisplay={handlePostUploadFormDisplay} />
                </Paper>


                {
                    profileStats.is_logged_in == true 
                        ? <>
                            <PPandCover data={profileStats} />

                            {
                                (
                                    profileStats.userInfo.paypal_billing_email == null || 
                                    profileStats.userInfo.paypal_billing_email.trim().length == 0
                                ) ? 
                                <Alert variant="filled" sx={{marginBottom:'20px'}} severity={'success'} icon={<NotificationsIcon />}>
                                    <Link href='/settings/receiving-account' style={{color:'white'}}>Click here</Link> to setup your email that receives fund from your supporters.
                                </Alert>
                                : <></>
                            }
                        </>   
                        
                        : <></>
                }

                
                <Box sx={{display: {md: 'block', xs:'none'}}}>
                    <GroupsDropdown handlFilterReset={handlFilterReset} handleFeedTypeFilterChange={handleFeedTypeFilterChange} feedTypeFilter={feedTypeFilter} />
                </Box>

                <LatestArtistOfMonth />

                <Box sx={{display: {md: 'none', xs:'block'}}}>
                    <GroupsDropdown handlFilterReset={handlFilterReset} handleFeedTypeFilterChange={handleFeedTypeFilterChange} feedTypeFilter={feedTypeFilter} />
                </Box>

            </div>



        </div>
    )
}
