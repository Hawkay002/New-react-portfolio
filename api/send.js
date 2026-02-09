import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userName, userEmail, serviceName, fileLink } = req.body;

  // 2. Configure the Transporter
  // Using Environment Variables for security
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER, // Your Gmail address
      pass: process.env.SMTP_PASS, // Your 16-character App Password
    },
  });

  try {
    // 3. Send the Email
    await transporter.sendMail({
      from: `"Shovith-dev" <${process.env.SMTP_USER}>`, 
      to: userEmail, // Now correctly sending to the user who requested it
      subject: `Your ${serviceName} Download is Ready`,
      html: getEmailHtml(userName, serviceName, fileLink),
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ error: 'Failed to send email. Check SMTP configuration.' });
  }
}

// --- HTML TEMPLATE GENERATOR ---
function getEmailHtml(userName, serviceName, fileLink) {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background-color: #0f172a; font-family: sans-serif; padding: 40px 0; color: #cbd5e1; }
    .container { margin: 0 auto; padding: 20px; max-width: 560px; background-color: #1e293b; border-radius: 12px; }
    .logo { color: #e2e8f0; font-size: 24px; font-weight: bold; text-align: center; margin: 0 0 20px; }
    .highlight { color: #10b981; }
    .button-box { text-align: center; margin: 30px 0; }
    .button { background-color: #10b981; color: #000; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block; }
    .footer { color: #64748b; font-size: 12px; text-align: center; margin-top: 30px; border-top: 1px solid #334155; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">Shovith<span class="highlight">-dev</span></div>
    <p>Hi ${userName},</p>
    <p>Thanks for requesting <strong>${serviceName}</strong>. You can download your resource using the link below:</p>
    <div class="button-box">
      <a href="${fileLink}" class="button">Download Now</a>
    </div>
    <div class="footer">
      © 2026 Shovith Debnath. Automated Portfolio Service.
    </div>
  </div>
</body>
</html>
  `;
}
