// EmailJS Configuration for Client-Side Email Sending
// This works with Vite + Vercel deployment

import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || 'Not provided',
      phone: formData.phone || 'Not provided',
      inquiry_type: formData.inquiryType || 'General Inquiry',
      budget: formData.budget || 'Not specified',
      message: formData.message,
      to_email: 'infernusrm@gmail.com', // Your business email
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    if (response.status === 200) {
      return { success: true, message: 'Email sent successfully!' };
    } else {
      throw new Error('Email sending failed');
    }
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { 
      success: false, 
      message: 'Failed to send email. Please try again.' 
    };
  }
};

// Alternative: Formspree Integration (No signup required for basic use)
export const sendFormspreeEmail = async (formData) => {
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        inquiryType: formData.inquiryType,
        budget: formData.budget,
        message: formData.message,
      }),
    });

    if (response.ok) {
      return { success: true, message: 'Email sent successfully!' };
    } else {
      throw new Error('Formspree submission failed');
    }
  } catch (error) {
    console.error('Formspree Error:', error);
    return { 
      success: false, 
      message: 'Failed to send email. Please try again.' 
    };
  }
};
