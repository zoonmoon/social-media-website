import GroupsDropdown from "@/app/_components/_groups_sidebar/groups_dropdown";
import PPandCover from "./cover_and_pp";
import NonStickyFooter from "@/app/_components/footer/non-fixed-footer";
import Alert from '@mui/material/Alert';
import Link from "next/link";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddAlertIcon from '@mui/icons-material/AddAlert';
export default function LeftSideBar({profileStats, handleFeedTypeFilterChange=()=>{}, feedTypeFilter=[] }){


    return(
        <div className="left-side-bar">
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

            

            <GroupsDropdown handleFeedTypeFilterChange={handleFeedTypeFilterChange} feedTypeFilter={feedTypeFilter} />

        </div>
    )
}

