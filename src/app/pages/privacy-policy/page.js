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
        <>
          <Header />
          <Container>
<div className="privacy-policy" style={{paddingBottom:'50px'}}>

  <h1>YOURARTON Privacy Summary – Simple Overview</h1>
  <p><strong>(Including Data Processing Addendum + CCPA/CPRA Notice)</strong></p>
  <p><strong>Effective Date:</strong> 02-24-2026</p>

  <section>
    <h2>🔐 How Login Works</h2>
    <p>You sign in using:</p>
    <ul>
      <li>Google</li>
      <li>Apple</li>
    </ul>
    <p>We never see or store your password.</p>
    <p>We may receive your:</p>
    <ul>
      <li>Name</li>
      <li>Email</li>
      <li>Profile image</li>
      <li>Unique login ID</li>
    </ul>
    <p>Authentication is handled by the provider.</p>
  </section>

  <section>
    <h2>🎨 What We Collect on YourArton</h2>
    <ul>
      <li>Profile info</li>
      <li>Artwork & posts</li>
      <li>Comments</li>
      <li>Usage data</li>
      <li>Device & browser info</li>
      <li>IP address</li>
      <li>Cookie identifiers</li>
    </ul>
  </section>

  <section>
    <h2>💳 Payments</h2>
    <p>Payments are processed by third-party providers.</p>
    <p>We do not store full financial account numbers.</p>
    <p>We may receive transaction confirmation details.</p>
  </section>

  <section>
    <h2>🍪 Cookies & Ads</h2>
    <p>We use cookies for:</p>
    <ul>
      <li>Essential site functionality</li>
      <li>Analytics</li>
      <li>Advertising</li>
    </ul>
    <p>We may serve ads through Google AdSense.</p>
    <p>Google may use cookies to personalize ads.</p>
    <p>You can:</p>
    <ul>
      <li>Adjust cookie settings</li>
      <li>Opt out of personalized ads</li>
      <li>Use “Do Not Sell or Share My Personal Information” link</li>
    </ul>
  </section>

  <section>
    <h2>🇺🇸 California Privacy Rights (CCPA/CPRA)</h2>
    <p>If you are a California resident, you have the right to:</p>
    <ul>
      <li>Know what personal information we collect</li>
      <li>Request deletion</li>
      <li>Correct inaccurate information</li>
      <li>Opt out of “sale” or “sharing” of personal data</li>
    </ul>
    <p>
      While we do not sell data for money, advertising cookies may qualify as “sharing.”
    </p>
    <p>
      To exercise your rights:<br />
      <a href="mailto:create@yourarton.com">create@yourarton.com</a>
    </p>
    <p>We do not discriminate against users who exercise privacy rights.</p>
  </section>

  <section>
    <h2>🇪🇺 Data Processing Addendum (GDPR Summary)</h2>

    <h3>Our Role</h3>
    <p>
      Beaver Entertainment, LLC acts as a Data Controller for platform data.
      Google and Apple act as independent Data Controllers for authentication data.
      Advertising providers may act as independent controllers.
    </p>

    <h3>Legal Basis for Processing</h3>
    <p>We process data based on:</p>
    <ul>
      <li>Contract performance</li>
      <li>Legitimate interests</li>
      <li>Legal compliance</li>
      <li>User consent (for cookies)</li>
    </ul>

    <h3>International Transfers</h3>
    <p>Data may be processed in the United States.</p>
    <p>Where required, transfers rely on:</p>
    <ul>
      <li>Standard Contractual Clauses</li>
      <li>Provider safeguards</li>
      <li>Consent mechanisms</li>
    </ul>

    <h3>Your EU Rights</h3>
    <p>You may request:</p>
    <ul>
      <li>Access</li>
      <li>Rectification</li>
      <li>Erasure</li>
      <li>Restriction</li>
      <li>Data portability</li>
      <li>Withdrawal of consent</li>
    </ul>
    <p>
      Requests:<br />
      <a href="mailto:create@yourarton.com">create@yourarton.com</a>
    </p>
  </section>

  <section>
    <h2>🔒 Data Retention</h2>
    <p>We retain data:</p>
    <ul>
      <li>While your account is active</li>
      <li>As required for tax/legal compliance</li>
      <li>For fraud prevention</li>
    </ul>
    <p>Deleted accounts may remain in backups for up to 90 days.</p>
    <p>Transaction data may be retained for up to 7 years.</p>
  </section>

  <section>
    <h2>👶 Age Restriction</h2>
    <p>YourArton is for users 18+ only.</p>
    <p>We do not knowingly collect data from minors.</p>
  </section>

  <section>
    <h2>📩 Contact</h2>
    <p>
      Beaver Entertainment, LLC<br />
      Wyoming, United States<br />
      <a href="mailto:create@yourarton.com">create@yourarton.com</a>
    </p>
  </section>

</div>

          </Container>
        </>
      )

}