import Header from "@/app/_components/_header"
import { Container, Grid } from "@mui/material"

export default function Index({params,  children }) {
    
    return(
        <>
          <Header />
          <Container maxWidth="lg">
            {children}
          </Container>
        </>
      )

}