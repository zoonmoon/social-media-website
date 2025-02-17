import Header from "@/app/_components/_header"
import { Container, Grid } from "@mui/material"

import NavigationBar from "../_components/app-bar"

export default function Settings({params,  children }) {
    
    return(
        <>
          <Header />
          <Container maxWidth="sm" >
            {children}
          </Container>
        </>
      )

}