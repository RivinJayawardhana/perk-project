# Form Security Implementation Guide

This document outlines the form security implementation for contact, partner, and lead form submissions.

## Security Features Implemented

### 1. reCAPTCHA v3 Integration
- **Server-side verification** of reCAPTCHA tokens
- **Client-side token generation** on form submission
- Score-based verification (minimum score: 0.5)
- Automatic bot detection without user interaction

### 2. Input Validation & Sanitization
- **Zod schemas** for strict input validation on server
- **sanitize-html** library to prevent XSS attacks
- Removes all potentially dangerous HTML tags
- Preserves safe formatting tags (b, i, em, strong, p, br)

### 3. Rate Limiting
- **5 submissions per hour per IP address** across all form endpoints
- Database-backed rate limiting using `submission_logs` table
- Graceful 429 responses with retry-after headers
- Client IP detection from x-forwarded-for, x-real-ip headers

### 4. Progressive Validation
- **Client-side validation** for immediate user feedback
- **Server-side validation** as authoritative check
- Clear error messages for validation failures

## Setup Instructions

### Step 1: Set Environment Variables

Add the following to your `.env.local` file:

```
# reCAPTCHA v3 Keys (get from https://www.google.com/recaptcha/admin)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**How to get reCAPTCHA keys (for localhost development):**
1. Visit https://www.google.com/recaptcha/admin
2. Click "Create" or "+" button
3. Enter label (e.g., "Perk Project")
4. Choose reCAPTCHA v3
5. Add domains:
   - For local development: `localhost`
   - For production: `yourdomain.com`
   - You can add both now
6. Accept terms and submit
7. Copy Site Key and Secret Key to your `.env.local`

**Note:** reCAPTCHA v3 works with `localhost` during development. When you deploy:
- Go back to reCAPTCHA console
- Edit your site settings
- Replace/add your production domain
- Update env vars with new keys if needed

### Step 2: Create Submission Logs Table

Run this SQL in your Supabase database (SQL Editor):

```sql
-- Create submission_logs table for rate limiting
CREATE TABLE IF NOT EXISTS submission_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for efficient rate limiting queries
CREATE INDEX IF NOT EXISTS idx_submission_logs_ip_endpoint_created 
ON submission_logs(ip, endpoint, created_at DESC);

-- Enable RLS
ALTER TABLE submission_logs ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage submission_logs
CREATE POLICY "Service role can insert submission logs"
  ON submission_logs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can select submission logs"
  ON submission_logs FOR SELECT
  USING (true);
```

### Step 3: Install Dependencies

The `sanitize-html` package has already been installed. If needed:

```bash
npm install sanitize-html @types/sanitize-html
```

### Step 4: Verify Integration

Newly created/updated files:

1. **src/lib/form-security.ts** - Utility functions for reCAPTCHA and rate limiting
2. **src/lib/form-validation.ts** - Zod validation schemas
3. **src/hooks/useRecaptcha.ts** - React hook for reCAPTCHA token generation
4. **src/app/api/contact/route.ts** - Updated with security features
5. **src/app/api/partner/route.ts** - Updated with security features
6. **src/app/api/leads/route.ts** - Updated with security features
7. **src/app/contact/page.tsx** - Client-side reCAPTCHA integration
8. **src/app/partner/page.tsx** - Client-side reCAPTCHA integration
9. **src/components/perks/LeadFormModal.tsx** - reCAPTCHA integration for lead forms
10. **src/hooks/useLeadForms.ts** - Updated to include reCAPTCHA token

## Testing

### Manual Testing

1. **Contact Form** (`/contact`):
   - Fill out form and submit
   - Check server logs for reCAPTCHA verification
   - Verify data is sanitized in database

2. **Partner Form** (`/partner`):
   - Same as contact form
   - Verify rate limiting: submit 5+ times within an hour → should see 429 error

3. **Lead Form** (click "Learn More" on a perk):
   - Open lead form modal
   - Fill and submit
   - Verify submission is saved and email sent

### Rate Limit Testing

```javascript
// To test rate limiting, submit the same form 6 times in quick succession
// On the 6th attempt, you should get a 429 response with:
// { error: "Too many submissions. Please try again later.", retryAfter: 3600 }
```

## API Response Codes

| Code | Meaning | Response |
|------|---------|----------|
| 200 | Success | `{ message: "...", data: {...} }` |
| 400 | Validation failed | `{ error: "...", details: [...] }` |
| 403 | reCAPTCHA failed | `{ error: "reCAPTCHA verification failed" }` |
| 429 | Rate limit exceeded | `{ error: "Too many submissions...", retryAfter: 3600 }` |
| 500 | Server error | `{ error: "..." }` |

## Data Sanitization

### What Gets Sanitized

- **All text inputs** - Removes all HTML tags
- **Textarea/message fields** - Allows safe formatting (bold, italic, line breaks)
- **Email addresses** - Removes HTML tags (should just be text anyway)
- **URLs (website field)** - Removes HTML tags

### Example

Input: `<script>alert('xss')</script>Hello`
Output: `Hello`

## Rate Limiting Details

- **Window**: 60 minutes (3600 seconds)
- **Limit**: 5 submissions per IP per endpoint
- **Tracking**: IP address + endpoint path in `submission_logs` table
- **Cleanup**: Old logs automatically eligible for cleanup (not auto-deleted)

## Troubleshooting

### "reCAPTCHA verification failed"
- Check that `RECAPTCHA_SECRET_KEY` is set correctly
- Verify the site key in `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- Check reCAPTCHA console for errors

### Forms returning 400
- Check browser console for client-side validation errors
- Check server logs for Zod validation errors
- Verify field names match expected schema

### Rate limiting not working
- Verify `submission_logs` table was created
- Check that RLS policies are enabled
- Verify `SUPABASE_SERVICE_ROLE_KEY` has database access

### Emails not sending
- Check SMTP credentials in environment
- Verify email recipient is correct
- Check server logs for email errors (non-blocking, form still submits)

## Security Considerations

1. **reCAPTCHA Score** - Set to 0.5, adjust down for stricter or up for looser
2. **Rate Limiting** - Can be adjusted in `form-security.ts` functions
3. **Sanitization** - Configurable per field type in API routes
4. **IP Detection** - Assumes behind a proxy; adjust for direct connections

## Future Enhancements

- [ ] Add email verification links for lead forms
- [ ] Implement CAPTCHA challenge fallback for low reCAPTCHA scores
- [ ] Add submission analytics/dashboard
- [ ] Implement form field encryption at rest
- [ ] Add webhook notifications for form submissions
- [ ] Implement progressive rate limiting tiers

## Files Changed Summary

- **New files**: 3 (form-security.ts, form-validation.ts, useRecaptcha.ts)
- **Modified files**: 7 (API routes, form components, hooks)
- **New SQL**: 1 (submission_logs table)
- **Total dependencies added**: 2 (sanitize-html, @types/sanitize-html)
