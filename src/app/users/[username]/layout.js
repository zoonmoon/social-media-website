import Header from "@/app/_components/_header"
import { Container, Grid } from "@mui/material"
import RightSidebar from "./right_sidebar"

export default function DashboardLayout({params,  children }) {
    
    return(
        <>
          <Header />
          <Container maxWidth="lg">
              <Grid container spacing={4} sx={{marginTop: '1px'}}>
                  <Grid item xs={12}>
                      {children}
                  </Grid>
              </Grid>
               <div style={{position:'fixed', zIndex:-1, top:0, left:0 , width:'100%', height: '100%', backgroundSize:'cover', backgroundImage: 'url("/site-assets/feed-bg.jpg")', backgroundRepeat:'repeat'}}>
                </div>
          </Container>
        </>
      )

}