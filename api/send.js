import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // 1. Security: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userName, userEmail, serviceName, fileLink } = req.body;

  try {
    // 2. Send the email using HTML string (Safe for Vite/Vercel)
    const { data, error } = await resend.emails.send({
      from: 'Shovith <onboarding@resend.dev>', // Keep this until you verify a domain
      to: [userEmail], //['shovith2002@gmail.com'], //userEmail if I decided to buy domain name  one day
      subject: `Your ${serviceName} Download is Ready`,
      html: getEmailHtml(userName, serviceName, fileLink),
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// --- HTML TEMPLATE GENERATOR ---
// This uses standard strings to avoid build errors on Vercel
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
    .link { color: #10b981; text-decoration: underline; word-break: break-all; }
    .footer { color: #64748b; font-size: 12px; text-align: center; margin-top: 30px; border-top: 1px solid #334155; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">Shovith<span class="highlight">-dev</span></div>
    
    <p>Hi ${userName},</p>
    <p>Thanks for requesting <strong>${serviceName}</strong>. I've attached the secure download link below.</p>

    <div class="button-box">
      <a href="${fileLink}" class="button">Download</a>
    </div>
    
    <div class="footer">
      © 2026 Shovith Debnath. Automated Portfolio Service.
    </div>
  </div>
</body>
</html>
  `;
}
