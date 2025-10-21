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
     
      <div>

<h1>Privacy Policy for YourArton.com Social Network</h1>
<p><strong>Effective Date:</strong> October 20, 2025</p>

<p>Welcome to <strong>YourArton.com</strong>, a social network dedicated to fostering creativity and positivity. Your privacy is important to us, and this Privacy Policy explains how we collect, use, and protect your information.</p>

<h2>1. Information We Collect</h2>
<p>YourArton.com is designed to respect your privacy. We only collect information that you choose to share with us. This includes:</p>
<ul>
  <li><strong>Account Information:</strong> When you sign up, we collect your username, email address, and optional profile details (such as profile picture and bio).</li>
  <li><strong>Content You Share:</strong> Posts, comments, and other content you create or interact with on the platform.</li>
  <li><strong>Technical Information:</strong> Basic technical data such as device type, browser type, and operating system to ensure the platform functions correctly.</li>
</ul>

<h2>2. How We Use Your Information</h2>
<p>We use your information to:</p>
<ul>
  <li>Provide and improve the functionality of the YourArton.com platform.</li>
  <li>Facilitate interactions within the community, such as sharing art, commenting, and liking posts.</li>
  <li>Send you notifications about your account or updates to the platform (you can choose to opt out).</li>
</ul>

<h2>3. How We Protect Your Information</h2>
<p>We take your privacy seriously and implement industry-standard measures to protect your data, including:</p>
<ul>
  <li>Encryption of sensitive data during transmission and storage.</li>
  <li>Regular security audits to identify and address vulnerabilities.</li>
  <li>Strict access controls to ensure only authorized personnel can access your data.</li>
</ul>

<h2>4. No Sharing of Your Information</h2>
<p>YourArton.com does not share, sell, or rent your personal information with third parties for any purpose. Your data stays within our platform and is used only to provide you with the services you expect from YourArton.com.</p>

<h2>5. Your Rights</h2>
<p>You have the right to:</p>
<ul>
  <li><strong>Access Your Data:</strong> View the information you have shared with us.</li>
  <li><strong>Edit or Delete Your Data:</strong> Update or remove your profile information or content at any time.</li>
  <li><strong>Deactivate Your Account:</strong> Request the deletion of your account and all associated data.</li>
</ul>
<p>To exercise these rights, please contact us at <a href="https://www.yourarton.com/pages/contact-us">https://www.yourarton.com/pages/contact-us</a>.</p>

<h2>6. Cookies and Tracking</h2>
<p>YourArton.com does not use tracking cookies or analytics that collect personal data.</p>
<p>We do use Google and Apple for login purposes, both platforms use cookies for authentication purposes when a user logs in via their respective services.</p>
<p>We do not use their login cookies to track you across different websites;&amp;nbsp;however, if you are logged into your Google account on a site that integrates Google services (like commenting with your Google account), a Google cookie might be present on that site to facilitate that functionality, but it would not be used to track your activity across unrelated websites.&amp;nbsp;</p>

<h2>7. Childrens Privacy</h2>
<p>YourArton.com is intended for users aged 18 and above. We do not knowingly collect information from individuals under 18. If we learn that we have inadvertently collected such information, we will promptly delete it.</p>

<h2>8. Updates to This Policy</h2>
<p>We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of significant changes and update the &amp;quot;Effective Date&amp;quot; at the top of this policy.</p>

<h2>9. Contact Us</h2>
<p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="https://www.yourarton.com/pages/contact-us">https://www.yourarton.com/pages/contact-us</a>.</p>

<address>
  Beaver Entertainment LLC<br />
  30 N Gould St<br />
  Suite R<br />
  Sheridan, WY 82801
</address>

<p>Thank you for being a part of the YourArton.com community!</p>



      </div>

          </Container>
        </>
      )

}