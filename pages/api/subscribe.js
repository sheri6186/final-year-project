import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      // Make a POST request to Strapi to save the email
      const strapiRes = await fetch(`${process.env.STRAPI_URL}/newsletters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await strapiRes.json();

      if (strapiRes.ok) {
        // Send a confirmation email using SendGrid
        await sendgrid.send({
          to: email, // User's email
          from: 'your-email@domain.com', // Replace with your email or verified sender email in SendGrid
          subject: 'Thank you for subscribing!',
          html: `<h1>Welcome to Our Newsletter</h1><p>Thank you for subscribing! We'll keep you updated.</p>`,
        });

        res.status(200).json({ message: 'Subscribed successfully and email sent!' });
      } else {
        res.status(400).json({ message: data.error || 'Error subscribing' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
