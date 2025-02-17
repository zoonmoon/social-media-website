import Header from "@/app/_components/_header"
import { Container, Grid, Typography } from "@mui/material"

export default function DashboardLayout({params,  children }) {
    
    return(
        <>
          <Header />
          <Container>
            <section>
                <h1>Contact Us</h1>
                <Typography variant="body1">
                For any inquiries, please reach out to us at{" "}
                <a href="mailto:artxpressart@gmail.com">artxpressart@gmail.com</a>.
                </Typography>
            </section>
          </Container>
        </>
      )

}