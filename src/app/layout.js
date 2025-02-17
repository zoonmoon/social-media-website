import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Script from 'next/script'

export const metadata = {
  title: "ArtXpressArt",
  description: "ArtXpressArt",
};

import Footer from "./_components/footer";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head> 
        {/* site specific */}
        <meta name="google-adsense-account" content="ca-pub-7180492942755368" />

      </head>
      <body  style={{backgroundColor: 'rgba(0, 0, 0, 0.1)', overflowX: 'hidden!important'}} className={inter.className}>
        {/* AdSense Script */}
        <Script
            strategy="afterInteractive" // Script loads after page becomes interactive
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
            crossOrigin="anonymous"
        />
        <div id="fb-root">
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
        </div>
        <Footer />
      </body>
    </html>
  );
}
