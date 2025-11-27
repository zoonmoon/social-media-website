export async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.MG_API_KEY;
  const domain = process.env.MG_DOMAIN;

  // ALWAYS the same FROM address
  const from = "Arty <arty@mg.yourarton.com>";

  const url = `https://api.mailgun.net/v3/${domain}/messages`;

  const formData = new FormData();
  formData.append("from", from);
  formData.append("to", to);
  formData.append("subject", subject);
  if (html) formData.append("html", html);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`api:${apiKey}`).toString("base64"),
    },
    body: formData,
  });

  return await response.json();

}


export async function generateWelcomeEmail(toName, toEmail) {
  const subject = `Welcome to YourArton, ${toName}!`;

  const html = `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <h2 style="color: #4a4a4a;">Welcome to YourArton, ${toName}! 🎉</h2>

    <p>We're thrilled to have you join the YourArton community. Your account is ready, and you're all set to explore what YourArton can offer.</p>

    <div style="margin: 30px 0;">
      <a href="https://yourarton.com/"
        style="
          background:#4a90e2;
          padding:12px 20px;
          text-decoration:none;
          color:white;
          border-radius:6px;
          font-weight:bold;">
        Go to YourArton Dashboard
      </a>
    </div>

    <p>Best regards,<br/>The YourArton Team</p>
  </div>
  `;

  return await sendEmail({
    to: toEmail,
    subject,
    html
  });
}

export async function generateMissingPayPalEmail(toName, toEmail) {
  const settingsUrl = "https://www.yourarton.com/settings/receiving-account";
    
  return {
    to: toEmail,
    subject: "Action Required: Set Up Your PayPal Receiving Account",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Hello ${toName},</h2>
        
        <p>
          Someone recently attempted to support you on <strong>YourArton.com</strong>, 
          but we could not process the contribution because your 
          <strong>PayPal receiving account is not set up yet</strong>.
        </p>

        <p>
          To start receiving support from your fans and community, 
          please add your PayPal email address to your receiving account settings.
        </p>

        <p>
          Simply follow the link below to update your receiving account 
          and enable supporters to send you money.
        </p>

        <div style="margin: 30px 0;">
          <a 
            href="${settingsUrl}" 
            style="
              background-color: #4CAF50;
              color: white;
              padding: 12px 20px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            "
          >
            Set Up PayPal Receiving Account
          </a>
        </div>

       

        <p style="margin-top: 40px;">
          Best regards,<br/>
          <strong>YourArton Team</strong>
        </p>
      </div>
    `
  };
}
