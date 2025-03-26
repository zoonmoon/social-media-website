import GroupsDropdown from "@/app/_components/_groups_sidebar/groups_dropdown";
import PPandCover from "./cover_and_pp";
import NonStickyFooter from "@/app/_components/footer/non-fixed-footer";

export default function LeftSideBar({profileStats, handleFeedTypeFilterChange=()=>{}, feedTypeFilter=[] }){

    return(
        <div className="left-side-bar">
            {
                profileStats.is_logged_in == true 
                    ?   <PPandCover data={profileStats} />
                    : <></>
            }
            <GroupsDropdown handleFeedTypeFilterChange={handleFeedTypeFilterChange} feedTypeFilter={feedTypeFilter} />
            <div className="left-side-bar-footer" style={{marginTop: '20px'}}>
                <NonStickyFooter />
            </div>
        </div>
    )
}

