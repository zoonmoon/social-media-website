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
