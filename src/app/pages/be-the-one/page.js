'use client'
import Header from "@/app/_components/_header"
import { Container, Grid } from "@mui/material"
import { useEffect } from "react"

export default function DashboardLayout({params,  children }) {
    

    useEffect(() => {

        if(window.innerWidth > 768 && document.querySelector('.footer-fixed')){
          document.querySelector('.footer-fixed').style.display = "block"
        }
    
      }, [])

    return(
        <div style={{position:'relative', paddingBottom:'20px'}}>
          <Header />
          <img style={{position:'absolute',  top:'0', width: '100%', minHeight:'100vh', height:'100%', objectFit:'cover'}} src="/site-assets/be-the-one-bg.jpg" />

          <div style={{position:'relative', color:'white', textShadow:'2px 2px 4px rgba(0, 0, 0, 0.75)'}}>  

          <Container maxWidth={'md'} >
            <h1>Be the One</h1>

          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                <div>
                    <p>That Appreciates the Arts</p>
                    <p>Helping Positive Artists Here</p>
                    <p>And the Creativity it Leads to</p>
                    <p>Positive Expressions that:</p>
                    <ul>
                        <li>Inspire</li>
                        <li>Encourage</li>
                        <li>Empower</li>
                        <li>Intrigue</li>
                        <li>Entertain</li>
                    </ul>
                    <p>Artists and Viewers:</p>
                    <p>Share Your Positive Thoughts</p>
                    <ul>
                        <li>Gifts</li>
                        <li>Care</li>
                        <li>Love</li>
                    </ul>
                </div>

            </Grid>
            <Grid item xs={12} md={6}>
            <div>
                    <p>Take Your Time</p>
                    <p>Browse the Positive:</p>
                    <ul>
                        <li>Visual Art</li>
                        <li>Audio Art</li>
                        <li>Written Word</li>
                    </ul>
                    <p>And Empathetically Embrace What We Share</p>
                    <p>If We Positively Move You:</p>
                    <ul>
                        <li>Bring Beauty to Your World</li>
                        <li>Share that Beauty</li>
                        <li>Leave a Positive Comment</li>
                        <li>A Monetary Gift to Help</li>
                    </ul>
                    <p>Inspire, Encourage, and Empower Positive Artists!</p>
                </div>
            </Grid>
        </Grid>  

          </Container>
          </div>
        </div>
      )

}