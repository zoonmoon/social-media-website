import GroupsDropdown from "@/app/_components/_groups_sidebar/groups_dropdown";
import PPandCover from "./cover_and_pp";
import { Paper } from "@mui/material";

export default function LeftSideBar({profileStats, handleFeedTypeFilterChange=()=>{}, feedTypeFilter=[] }){


    if(profileStats.is_logged_in !== true){
        return(
            <>
                <Paper sx={{padding:'20px'}}>Please Log In to view Profile stats</Paper>
                <GroupsDropdown handleFeedTypeFilterChange={handleFeedTypeFilterChange} feedTypeFilter={feedTypeFilter} />
            </>
        )
    }

    return(
        <>
            <PPandCover data={profileStats} />
            <GroupsDropdown handleFeedTypeFilterChange={handleFeedTypeFilterChange} feedTypeFilter={feedTypeFilter} />
        </>
    )
}

