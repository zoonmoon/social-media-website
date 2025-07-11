import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Script from 'next/script'


import Footer from "./_components/footer";

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <head> 


        <meta name="google-adsense-account" content="ca-pub-7180492942755368" />

        <link rel="canonical" href="https://www.artxpress.art" />

        {/* <meta property="og:title" content="ArtXpress - Supporting Positive Expressions of Artist" /> */}
        {/* <meta property="og:description" content="A community supporting artists' positive expressions of art." /> */}
        {/* <meta property="og:image" content="https://www.artxpress.art/site-assets/logo.png" /> */}
        {/* <meta property="og:url" content="https://www.artxpress.art" /> */}
        {/* <meta property="og:type" content="website" /> */}
        
        {/* <meta name="description" content="A community supporting artists' positive expressions of art." /> */}
        {/* <meta name="keywords" content="art, artists, paintings, digital art, written word, support artists, support arts, support the arts, contemporary art, family-friendly art, modern art, online art gallery" /> */}




      {/* <title>Social Platform for Artists | Digital Art, Dance & Music Community Site</title> */}
      <meta name="description" content="Join the USA leading social platform for artists to showcase digital art, dance, literature and music. Connect with creators, grow your audience, and share your talent with a vibrant creative community."/>
      <meta name="keywords" content="social platform for artists, best art sharing platform, artwork websites, Artist Social & Portfolio Platform, Art Marketing Platform, social media platform for artist, Art Sharing community site, Digital Art Sharing community site, dance Sharing community site, literature Sharing community site, music Sharing community site, Art That Makes You Love, Express Yourself Through Art, Connect with other artists, get feedback on your work, spoken word community, express yourself through music, express yourself through writing" />
      {/* <meta property="og:title" content="Social Platform for Artists | Digital Art, Dance & Music Community Site" /> */}
      <meta property="og:description" content="Join the USA leading social platform for artists to showcase digital art, dance, literature and music. Connect with creators, grow your audience, and share your talent with a vibrant creative community." />
      <meta property="og:type"content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="artxpress" />
      <meta property="og:url" content="https://www.artxpress.art/feed" />
      <meta property="og:image" content="https://www.artxpress.art/site-assets/logo.png" />
      <meta name="author" content="artxpress.art" />
      <meta name="canonical" content="https://www.artxpress.art/feed"/>

      <script async src="https://www.googletagmanager.com/gtag/js?id=G-MRSY9GB8Y4"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MRSY9GB8Y4');
          `,
        }}
      />


      </head>

      <body  style={{backgroundColor: 'rgba(0, 0, 0, 0.1)', overflowX: 'hidden!important'}} className={inter.className}>
        {/* AdSense Script */}
        <Script
            strategy="afterInteractive" // Script loads after page becomes interactive
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
            crossOrigin="anonymous"
        />
          <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
            <Toaster  position="bottom-center" 
              toastOptions={{
                className: '',
                style: {
                  backgroundColor: 'black',
                  padding: '8px',
                  color: 'white',
                },
              }}
            />
            {children}
          </GoogleOAuthProvider>
        <div style={{marginTop:'30px'}}>
          <Footer />
        </div>
      </body>
    </html>
  );
}
