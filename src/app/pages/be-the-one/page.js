import Header from "@/app/_components/_header"
import { Container, Grid } from "@mui/material"

export default function DashboardLayout({params,  children }) {
    
    return(
        <>
          <Header />
          <Container>
          <h1>Be the One</h1>
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
           

          </Container>
        </>
      )

}