import Header from "@/app/_components/_header"
import { Container, Grid } from "@mui/material"
import Link from "next/link"

export default function DashboardLayout({params,  children }) {
    
    return(
        <>
          <Header />
          <Container>
            


<div class="terms-of-service" style={{paddingBottom:'50px'}}>

  <h1>YOURARTON Terms of Service</h1>
  <p><strong>Effective Date:</strong> 02-24</p>
  <p><strong>Operated by:</strong> Beaver Entertainment, LLC (Wyoming)</p>

  <p>
    Welcome to YourArton. By using this platform, you agree to these Terms of Service (“Terms”).
    This is a legally binding agreement between you and Beaver Entertainment, LLC
    (“Company,” “we,” “us”).
    If you don’t agree, please do not use the platform.
  </p>

  <section>
    <h2>1. Eligibility</h2>
    <p>You must be:</p>
    <ul>
      <li>At least 18 years old</li>
      <li>Legally able to enter into contracts</li>
      <li>Not prohibited from using the service under applicable law</li>
    </ul>
    <p>By using YourArton, you confirm you meet these requirements.</p>
  </section>

  <section>
    <h2>2. Account Login (Google & Apple Only)</h2>
    <p>YourArton uses third-party authentication:</p>
    <ul>
      <li>Google</li>
      <li>Apple</li>
    </ul>
    <p>
      We do not store passwords. You are responsible for maintaining the security of your
      Google or Apple account. If your authentication provider suspends your access,
      your YourArton access may also be affected.
    </p>
  </section>

  <section>
    <h2>3. User Content</h2>
    <p>You retain ownership of your artwork and content.</p>
    <p>
      By posting on YourArton, you grant us a non-exclusive, worldwide,
      royalty-free license to:
    </p>
    <ul>
      <li>Display your content</li>
      <li>Promote the platform</li>
      <li>Operate and improve the service</li>
    </ul>
    <p>You are responsible for what you post.</p>
    <p>You may not post:</p>
    <ul>
      <li>Illegal content</li>
      <li>Copyright-infringing material</li>
      <li>Harassment or threats</li>
      <li>Explicit or unlawful material</li>
    </ul>
    <p>We may remove content at our discretion.</p>
  </section>

  <section>
    <h2>4. Tips & Payments</h2>
    <p>Payments are processed by a third-party provider (PayPal).</p>
    <p>We do not store full financial details.</p>
    <p>We are not responsible for:</p>
    <ul>
      <li>Payment processor errors</li>
      <li>Chargebacks</li>
      <li>Tax obligations of users</li>
    </ul>
    <p>
      You are responsible for reporting income received through tips if they exceed
      the applicable threshold in the United States or your country of residence.
    </p>
  </section>

  <section>
    <h2>5. Advertising & Cookies</h2>
    <p>We may display ads through:</p>
    <ul>
      <li>Google AdSense</li>
    </ul>
    <p>Ads may be personalized using cookies.</p>
    <p>You can opt out via:</p>
    <ul>
      <li>Cookie preferences</li>
      <li>“Do Not Sell or Share” link (California residents)</li>
    </ul>
    <p>We do not sell personal data for monetary compensation.</p>
  </section>

  <section>
    <h2>6. Platform Rules</h2>
    <p>You agree not to:</p>
    <ul>
      <li>Attempt to hack or disrupt the service</li>
      <li>Reverse engineer the platform</li>
      <li>Use bots or scraping tools</li>
      <li>Impersonate others</li>
    </ul>
    <p>Violation may result in suspension or termination.</p>
  </section>

  <section>
    <h2>7. Account Termination</h2>
    <p>We may suspend or terminate accounts for:</p>
    <ul>
      <li>Violations of these Terms</li>
      <li>Fraud</li>
      <li>Legal compliance reasons</li>
    </ul>
    <p>You may delete your account at any time.</p>
  </section>

  <section>
    <h2>8. Disclaimers</h2>
    <p>YourArton is provided “AS IS.”</p>
    <p>We do not guarantee:</p>
    <ul>
      <li>Continuous availability</li>
      <li>Error-free performance</li>
      <li>Specific results</li>
    </ul>
    <p>
      We are not responsible for user interactions or third-party services.
    </p>
  </section>

  <section>
    <h2>9. Limitation of Liability</h2>
    <p>
      To the maximum extent permitted by law, Beaver Entertainment, LLC is not
      liable for indirect, incidental, special, or consequential damages.
    </p>
    <p>
      Total liability shall not exceed the amount paid by you to the platform
      in the prior 12 months.
    </p>
  </section>

  <section>
    <h2>10. Arbitration & Dispute Resolution</h2>
    <p>
      Any disputes shall be resolved through binding arbitration.
      No class actions permitted.
      Arbitration shall occur in Wyoming unless otherwise required by law.
      You waive the right to a jury trial.
    </p>
  </section>

  <section>
    <h2>11. Governing Law</h2>
    <p>
      These Terms are governed by the laws of the State of Wyoming,
      without regard to conflict-of-law principles.
    </p>
  </section>

  <section>
    <h2>12. Changes to Terms</h2>
    <p>
      We may update these Terms periodically.
      Continued use after updates constitutes acceptance.
    </p>
  </section>

  <section>
    <h2>13. Contact</h2>
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