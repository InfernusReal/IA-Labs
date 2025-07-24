// Snowimple Vercel API for contact form
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, company, phone, inquiryType, message, budget } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Name, email, and message are required' 
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to business
    const businessEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.BUSINESS_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryType || 'General'}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Auto-reply to customer
    const customerEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting IA Labs',
      html: `
        <h2>Thank You for Contacting IA Labs</h2>
        <p>Hi ${name},</p>
        <p>We've received your inquiry and will get back to you within 24 hours.</p>
        <p>Best regards,<br>The IA Labs Team</p>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessEmail),
      transporter.sendMail(customerEmail)
    ]);

    return res.status(200).json({ 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      message: 'Failed to send email' 
    });
  }
}
