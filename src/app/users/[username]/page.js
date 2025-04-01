import ProfileBasicInfo from "./profile_basic_info";

import UserPosts from "./posts";
import { Container } from "@mui/material";

export default function User({params}){



  
    return(
      <>
        <ProfileBasicInfo username={params.username} />
        <Container maxWidth={'sm'} sx={{marginTop:'20px', paddingLeft:'0px', paddingRight:'0px'}}>
          <UserPosts username={params.username} />
        </Container>
      </>
    )
}