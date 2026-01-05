'use client'
import Header from "@/app/_components/_header"
import { Container, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import YourArtonFAQ from "./faq.js"

export default function DashboardLayout() {
    
    useEffect(() => {

        if(window.innerWidth > 768 && document.querySelector('.footer-fixed')){
          document.querySelector('.footer-fixed').style.display = "block"
        }
    
    }, [])

    return(
        <>
          <Header />
          <Container>

            <YourArtonFAQ />

          </Container>
        </>
      )

}