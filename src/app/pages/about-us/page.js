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
                <div style={{position:'fixed', zIndex:-1, top:0, left:0 , width:'100%', height: '100%', backgroundSize:'cover', backgroundImage: 'url("/site-assets/about-us-bg.jpg")', backgroundRepeat:'repeat'}}>
                </div>
            <section>
                <h1>About</h1>
                <ul>
                    <li>ArtXpress.Art is passionate about supporting Artists!</li>
                    <li>Art: the expression or application of human creative skill and imagination (such as painting, music, literature, and dance). We agree with this definition of art and have created a platform where multiple art forms and beyond can be shared.</li>
                    <li>What’s your Art? How do you like to use your creative skill and imagination?</li>
                    <li>Maybe you like to make hats/clothes, maybe your thing is numbers-finance, maybe take photos, maybe write poems/stories and narrate them, or passionate about space or comedy. Great! Creativity and imagination are vast!</li>
                    <li>Maximum art file upload size is 5mb.</li>
                    <li>Our intention is to help artists express their creative skills and imagination with other like-minded people, to support and encourage us all.</li>
                    <li>If our members’ creative expressions touch your heart (smile, laugh), please leave an encouraging comment, like, and/or support them by giving a monetary gift to help them on their journey.</li>
                    <li>As an artist, if you do not have a PayPal account to receive support from others, you can create a free PayPal account to add in your profile account here.</li>
                    <li>Viewers can give monetary gifts in US dollars via PayPal.</li>
                    <li>If you are inspired by an artist’s creative skills here, you can give up to $19,000 per year, per person in 2025 per the IRS, tax free (gift tax). If you are married, you and your spouse can give up to $38,000 to the same person.</li>
                    <li>85% of the monetary gift will be given to the artist; a 15% fee will be used for maintenance of the site, help fund our services, and pay for the PayPal processing fees.</li>
                    <li>Visit often and know that you are free from any intrusion on your device (computer, tablet, phone, etc.) from ArtXpress.Art.</li>
                    <li>Our members’ art is their art, not ours.</li>
                    <li>We are grateful you are here and for your support.</li>
                    <li>We reserve the right to remove any art or comments at our sole discretion.</li>
                    <li>Our members’ (artists and viewers) positive feelings and trust from us is of the utmost importance.</li>
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