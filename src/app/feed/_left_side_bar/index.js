import GroupsDropdown from "@/app/_components/_groups_sidebar/groups_dropdown";
import PPandCover from "./cover_and_pp";
import NonStickyFooter from "@/app/_components/footer/non-fixed-footer";
import Alert from '@mui/material/Alert';
import Link from "next/link";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import LatestArtistOfMonth from "./latest_artist_of_month";

import { useRef, useState, useEffect } from "react";
export default function LeftSideBar({profileStats,handlFilterReset , handleFeedTypeFilterChange, feedTypeFilter }){

  const sidebarRef = useRef(null);
  const [topOffset, setTopOffset] = useState(10);

  const [position, setPosition]  = useState('static')

  useEffect(() => {
    if (window.innerWidth < 992) return; // only desktop

    function updateTopOnScroll() {
        if(position == 'sticky') return 
      const target = document.querySelector(".view-all-customn");
      if (!sidebarRef.current || !target) return;

      const rect = target.getBoundingClientRect();
      // check if element is visible in viewport
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        // setTopOffset(rect.top + 100); // sticky offset


    const sidebarHeight = sidebarRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const newTop = -(sidebarHeight - viewportHeight) - 50;
        // alert(newTop)
        setTopOffset(newTop);

        setPosition('sticky')
      }
    }

    window.addEventListener("scroll", updateTopOnScroll);
    window.addEventListener("resize", updateTopOnScroll);

    // cleanup
    return () => {
      window.removeEventListener("scroll", updateTopOnScroll);
      window.removeEventListener("resize", updateTopOnScroll);
    };
  }, []);

    return(
        <div className="left-side-bar"      ref={sidebarRef} 
        style={{
            top: `${topOffset}px`,
            position
        }}
        >

            <div >


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

                

                <GroupsDropdown handlFilterReset={handlFilterReset} handleFeedTypeFilterChange={handleFeedTypeFilterChange} feedTypeFilter={feedTypeFilter} />
                <LatestArtistOfMonth />

            </div>



        </div>
    )
}
