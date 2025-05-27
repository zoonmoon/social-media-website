'use client'
import Header from "@/app/_components/_header"
import { Container, Grid, Typography } from "@mui/material"
import { useEffect } from "react"

export default function DashboardLayout({params,  children }) {
    
    useEffect(() => {

        if(window.innerWidth > 768 && document.querySelector('.footer-fixed')){
          document.querySelector('.footer-fixed').style.display = "block"
        }
    
    }, [])

    return(
        <>
          <Header />
          <Container>
                            <div style={{position:'fixed', zIndex:-1, top:0, left:0 , width:'100%', height: '100%', backgroundSize:'cover', backgroundImage: 'url("/site-assets/about-us-bg.jpg")', backgroundRepeat:'repeat'}}>
                </div>
            <section>
                <h1>Contact Us</h1>
                <Typography variant="body1">
                For any inquiries, please reach out to us at{" "}
                <a href="mailto:support@artxpress.art ">support@artxpress.art </a>.
                </Typography>
            </section>
          </Container>
        </>
      )

}