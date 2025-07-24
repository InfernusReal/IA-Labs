# Vercel Deployment Setup for Contact Form with Nodemailer

This guide will help you deploy your React app with a working contact form to Vercel.

## 🚀 Quick Setup

### 1. Environment Variables Setup

First, create your environment file:

```bash
cp env.example .env.local
```

Then edit `.env.local` with your actual email credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
BUSINESS_EMAIL=your-business-email@example.com
```

### 2. Gmail Setup (Recommended)

For Gmail, you need to use an App Password:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Go to **Security** → **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Name it "IA Labs Contact Form" or similar
6. Copy the generated 16-character password
7. Use this password in your `EMAIL_PASS` environment variable

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# ? Set up and deploy "my-react-app"? Y
# ? Which scope do you want to deploy to? [Your account]
# ? Link to existing project? N
# ? What's your project's name? ia-labs-contact
# ? In which directory is your code located? ./
```

#### Option B: Using Vercel Website

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Vite project
6. Add your environment variables in the deployment settings:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `BUSINESS_EMAIL`
7. Deploy!

### 4. Add Environment Variables to Vercel

After deployment, add your environment variables:

1. Go to your project dashboard on Vercel
2. Click on **Settings**
3. Click on **Environment Variables**
4. Add each variable:
   - `EMAIL_USER` → your-email@gmail.com
   - `EMAIL_PASS` → your-app-password
   - `BUSINESS_EMAIL` → your-business-email@example.com

### 5. Test Your Contact Form

1. Visit your deployed site
2. Go to the contact page
3. Fill out and submit the form
4. Check your email for both:
   - The inquiry email (sent to BUSINESS_EMAIL)
   - The auto-reply confirmation (sent to the form submitter)

## 📁 Project Structure

```
my-react-app/
├── api/
│   └── contact.js          # Vercel serverless function for email
├── src/
│   └── pages/
│       └── ContactPage.jsx # Your contact form component
├── vercel.json            # Vercel configuration
├── env.example            # Environment variables template
└── .env.local            # Your actual environment variables (git-ignored)
```

## 🔧 How It Works

1. **Contact Form**: The `ContactPage.jsx` component sends a POST request to `/api/contact`
2. **API Route**: The `/api/contact.js` file handles the request using Nodemailer
3. **Email Service**: Nodemailer sends two emails:
   - One to your business email with the inquiry details
   - One auto-reply to the customer confirming receipt
4. **Vercel**: Handles the serverless function deployment automatically

## 🐛 Troubleshooting

### Common Issues:

1. **"Failed to send email"**
   - Check your environment variables are set correctly
   - Verify your Gmail App Password is correct
   - Make sure 2FA is enabled on your Google account

2. **"Network error"**
   - This is usually a client-side issue
   - Check browser console for more details

3. **API Route not found**
   - Make sure `vercel.json` is in the root directory
   - Redeploy after adding the configuration

4. **Environment variables not working**
   - Restart your development server after adding .env.local
   - On Vercel, redeploy after adding environment variables

### Testing Locally:

```bash
# Install Vercel CLI
npm install -g vercel

# Run development server with Vercel functions
vercel dev
```

This will run your app locally with the serverless functions working.

## 📧 Email Templates

The contact form sends beautifully formatted HTML emails with:
- Professional styling
- All form details organized clearly
- Auto-reply confirmation to customers
- Business inquiry notification to you

## 🔒 Security Features

- Form validation on both client and server
- CORS headers configured
- Input sanitization
- Rate limiting (handled by Vercel automatically)

## 🎨 Customization

To customize the email templates, edit the HTML content in `/api/contact.js`:
- Modify the `ownerMailOptions.html` for business notifications
- Modify the `customerMailOptions.html` for auto-replies

## 📞 Support

If you need help with deployment or customization, the form is working and ready to receive your inquiries!
