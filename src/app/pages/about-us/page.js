'use client'
import Header from "@/app/_components/_header"
import { Container, Grid } from "@mui/material"
import Link from "next/link"
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
            <section>
                <h1>About</h1>
                <ul>
                    <li>We are passionate about supporting Artists!</li>
                    <li>Our Goal is to positively inspire, encourage, empower, and intrigue through our members’ art.</li>
                    <li>Our Intention is to help artists monetarily earn from the expression of their art.</li>
                    <li>Create a free PayPal account to add in your profile account <a href="https://www.paypal.com" target="_blank">here</a>.</li>
                    <li>We support positive expressions of art by encouraging visitors-viewers to give to artists that move them through their positive art.</li>
                    <li>Viewers can give monetary gifts in US dollars (Artists will only receive gifts in US dollars) via PayPal up to $19,000 per year per person in 2025 (per the IRS). If you are married, you and your spouse can give up to $38,000 to the same person without worrying about gift taxes.</li>
                    <li>85% of the monetary gift will be given to the artist, a 15% fee will be used for maintenance of the site, help fund our services, and pay for the PayPal processing fees.</li>
                    <li>Visit often and know that you are free from any intrusion on your device (computer, tablet, phone, etc.) from us on artXpress.art or when you go elsewhere on the web.</li>
                    <li>Our members’ art is their art, not ours. Our goal is to make their positive expressions visible to the world and help them thrive in the process by sharing their positive selves.</li>
                    <li>We are grateful for your positive comments and critiques of art.</li>
                    <li>We reserve the right to remove any art or comments at our sole discretion.</li>
                    <li>Our members (artists and viewers) positive feelings and trust from us is of the utmost importance.</li>
                    <li>Maximum file upload size is 5mb</li>
                    <li>Please allow your true light to shine here to inspire, encourage, empower, and intrigue.</li>
                    <li>Thank You, Arty</li>
                </ul>
            </section>

            <section>
                <h2>Advertising</h2>
                <p><Link href={'/pages/contact-us'}>Contact us</Link> to learn more.</p>
            </section>

            <div style={{height: '100px'}}></div>

          </Container>
        </>
      )

}