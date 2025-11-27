import { databaseConnection, executeQuery, isAdmin } from "@/app/api/utils";
import { sendEmail } from "@/app/api/utils/email";

export const dynamic = "force-dynamic";

export async function POST(req) {
  let connection = false;

  try {
    // ADMIN CHECK
    if (!isAdmin()) {
      return new Response(JSON.stringify({ success: false, msg: "Unauthorized" }), { status: 403 });
    }

    const { subject, html } = await req.json();

    if (!subject || !html) {
      return new Response(JSON.stringify({ success: false, msg: "Subject and HTML body required" }), { status: 400 });
    }

    connection = await databaseConnection();

    // 1) GET ALL USER EMAILS
    const usersQuery = `SELECT email FROM users WHERE email IS NOT NULL AND email != ''`;
    const users = await executeQuery(connection, usersQuery);

    // 2) GET ALL BILLING PAYPAL EMAILS
    const billingQuery = `SELECT paypal_billing_email FROM user_more_info 
                          WHERE paypal_billing_email IS NOT NULL 
                          AND paypal_billing_email != ''`;
    const billingRows = await executeQuery(connection, billingQuery);

    // MERGE EMAILS
    const emailSet = new Set();

    users.forEach(u => emailSet.add(u.email));
    billingRows.forEach(u => emailSet.add(u.paypal_billing_email));

    let allEmails = Array.from(emailSet);


    console.log(allEmails)

    // SAFETY CHECK
    if (allEmails.length === 0) {
      return new Response(JSON.stringify({ success: false, msg: "No user emails found" }), { status: 404 });
    }

    // allEmails = ["arjunpoudel703@gmail.com"]
    
    // 3) SEND EMAIL TO EACH USER
    let sentCount = 0;

    for (const email of allEmails) {
      try {
        await sendEmail({ to: email, subject, html });
        sentCount++;
      } catch (err) {
        console.error("Failed sending to:", email, err.message);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Email sent to ${sentCount} users.`,
        total_users: allEmails.length
      }),
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, msg: err.message }), { status: 500 });

  } finally {
    if (connection) connection.end();
  }
}
