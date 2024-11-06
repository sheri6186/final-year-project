// pages/api/send-email.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ message: 'Email, subject, and message are required.' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { email: 'sheri.6186@gmail.com' },
        to: [{ email }],
        subject,
        htmlContent: `<p>${message}</p>`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ message: 'Error sending email', error: errorData });
    }

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}
