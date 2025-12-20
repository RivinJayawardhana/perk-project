# Form Submissions Setup Guide

## Overview
Both "Contact Us" and "Apply to become a Partner" forms now save submissions to Supabase and send emails to hello@venturenext.io.

## Setup Steps

### 1. Create Database Tables

Run the following SQL in your Supabase SQL Editor:

**For Partner Applications:**
```sql
-- Create partner_applications table
CREATE TABLE IF NOT EXISTS partner_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company TEXT NOT NULL,
  contact TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT NOT NULL,
  offer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Partner applications are public (SELECT)" ON partner_applications
  FOR SELECT USING (true);

CREATE POLICY "Anyone can submit partner application (INSERT)" ON partner_applications
  FOR INSERT WITH CHECK (true);
```

**For Contact Submissions:**
```sql
-- Create contact_submissions table (if not exists)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Contact submissions are public (SELECT)" ON contact_submissions
  FOR SELECT USING (true);

CREATE POLICY "Anyone can submit contact form (INSERT)" ON contact_submissions
  FOR INSERT WITH CHECK (true);
```

### 2. Configure Email Settings

Add these environment variables to your `.env.local`:

```
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASSWORD=your-smtp-password
SMTP_FROM=noreply@yourdomain.com
```

Example for Gmail:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
```

### 3. Install Required Package

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

### 4. API Endpoints

Both forms now POST to their respective APIs:
- Contact form → `/api/contact` (POST)
- Partner form → `/api/partner` (POST)

### 5. Features

✅ Form submissions saved to Supabase
✅ Automatic email notifications sent to hello@venturenext.io
✅ Graceful error handling (forms work even if email fails)
✅ Form data cleared after successful submission
✅ Success/error feedback to users

### 6. Viewing Submissions

Admin view available at:
- Contact submissions: `/api/contact` (GET)
- Partner applications: `/api/partner` (GET)

## Notes

- If email is not configured, forms will still save to database
- Email sending failures won't block form submission
- All timestamps are automatically added
- CORS and authentication handled automatically
