export function getCollaborationAcceptedEmail({ name, collaboratorName, postId }) {
    const postUrl = `https://yourarton.com/posts/${postId}?show_collaborators=true`;

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Collaboration Request Accepted</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;padding:30px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">



<tr>
<td style="font-size:16px;color:#333;padding-bottom:15px;">
Dear ${name},
</td>
</tr>

<tr>
<td style="font-size:15px;color:#555;padding-bottom:20px;line-height:1.6;">
Good news! 🎉<br><br>
<strong>${collaboratorName}</strong> has accepted your collaboration request.
</td>
</tr>

<tr>
<td align="center" style="padding-bottom:25px;">
<a href="${postUrl}" 
style="background-color:#4CAF50;color:#fff;text-decoration:none;padding:12px 24px;border-radius:5px;font-size:15px;display:inline-block;">
View Post
</a>
</td>
</tr>

<tr>
<td style="font-size:14px;color:#888;">
Or open this link:<br>
${postUrl}
</td>
</tr>

<tr>
<td style="font-size:13px;color:#aaa;padding-top:30px;">
This is an automated email from YourArt.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}

export function getCollaborationIgnoredEmail({ name, collaboratorName, postId }) {
    const postUrl = `https://yourarton.com/posts/${postId}?show_collaborators=true`;

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Collaboration Request Update</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;padding:30px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">



<tr>
<td style="font-size:16px;color:#333;padding-bottom:15px;">
Dear ${name},
</td>
</tr>

<tr>
<td style="font-size:15px;color:#555;padding-bottom:20px;line-height:1.6;">
<strong>${collaboratorName}</strong> has declined your collaboration request.
</td>
</tr>

<tr>
<td align="center" style="padding-bottom:25px;">
<a href="${postUrl}" 
style="background-color:#2196F3;color:#fff;text-decoration:none;padding:12px 24px;border-radius:5px;font-size:15px;display:inline-block;">
View Post
</a>
</td>
</tr>

<tr>
<td style="font-size:14px;color:#888;">
Or open this link:<br>
${postUrl}
</td>
</tr>

<tr>
<td style="font-size:13px;color:#aaa;padding-top:30px;">
This is an automated email from YourArt.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}

export function getNewCollaborationRequestEmail({ name, requestSentBy, postId }) {
    const postUrl = `https://yourarton.com/posts/${postId}`;

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>New Collaboration Request</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;padding:30px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">



<tr>
<td style="font-size:16px;color:#333;padding-bottom:15px;">
Dear ${name},
</td>
</tr>

<tr>
<td style="font-size:15px;color:#555;padding-bottom:20px;line-height:1.6;">
You have received a new collaboration request from 
<strong>${requestSentBy}</strong>. 🤝<br><br>

Please review the request and choose whether to accept or ignore it.
</td>
</tr>

<tr>
<td align="center" style="padding-bottom:25px;">
<a href="${postUrl}" 
style="background-color:#673AB7;color:#fff;text-decoration:none;padding:12px 24px;border-radius:5px;font-size:15px;display:inline-block;">
Review Collaboration Request
</a>
</td>
</tr>

<tr>
<td style="font-size:14px;color:#888;">
Or open this link:<br>
${postUrl}
</td>
</tr>

<tr>
<td style="font-size:13px;color:#aaa;padding-top:30px;">
This is an automated email from YourArt. Please do not reply.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}