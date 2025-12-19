# Lead Capture Form System - Setup Guide

## Features Implemented

✅ **Dynamic Lead Form Configuration** - Create custom forms in admin panel
✅ **Three Deal Types** - Affiliate Link, Coupon Code, Lead Capture Form
✅ **Modal Form Submission** - Beautiful modal with validation
✅ **Secure Data Storage** - Leads saved to Supabase `leads` table
✅ **Email Notifications** - Auto-email to hello@venturenext.io
✅ **Email Fallback** - Data saved even if email fails
✅ **Admin Leads List** - View all submissions with expandable details
✅ **Form Validation** - Client-side validation for all field types

## Database Schema

### lead_forms table
- `id` - UUID primary key
- `perk_id` - UUID reference to perks table
- `form_fields` - JSONB array of form field configurations
- `submit_button_text` - Customizable button text
- `success_message` - Message shown after submission
- `created_at`, `updated_at` - Timestamps

### leads table
- `id` - UUID primary key
- `perk_id` - UUID reference to perks table
- `lead_form_id` - UUID reference to lead_forms table
- `form_data` - JSONB object with submitted form data
- `email_address` - Extracted email from form
- `submission_timestamp` - When lead was submitted
- `email_sent` - Boolean flag for email delivery
- `email_sent_at` - Timestamp of email sent
- `created_at` - Record creation time

## Setup Steps

### 1. Database Setup
Execute the SQL in `setup-lead-forms.sql` in Supabase SQL Editor:
```sql
-- Run all statements in setup-lead-forms.sql
```

### 2. Environment Variables
Add to your `.env.local`:
```
GMAIL_USER=your-gmail@gmail.com
GMAIL_PASSWORD=your-app-password
```

Note: Use Gmail App Password (not regular password) for security.
Learn how: https://support.google.com/accounts/answer/185833

### 3. Install Dependencies
```bash
npm install
```

### 4. Restart Development Server
```bash
npm run dev
```

## API Routes

### Lead Forms
- `GET /api/lead-forms` - List all lead forms
- `GET /api/lead-forms?perk_id=X` - Get form for specific perk
- `POST /api/lead-forms` - Create or update lead form
- `PUT /api/lead-forms` - Update lead form
- `DELETE /api/lead-forms?id=X` - Delete lead form

### Leads (Submissions)
- `GET /api/leads` - List all leads
- `GET /api/leads?perk_id=X` - List leads for specific perk
- `POST /api/leads` - Submit new lead (validates, saves, emails)

## Usage in Admin Panel

### Adding Lead Capture Form to a Perk

1. In **AddPerk** or **EditPerk** form, look for the deal type selection
2. Select **"Lead Capture Form"** as the deal type
3. Click to expand the **Lead Form Configuration** section
4. Add form fields using the **Add Field** button
5. Configure each field:
   - Label (shown to user)
   - Internal name (stored in database)
   - Field type (text, email, phone, number, textarea, checkbox)
   - Placeholder text
   - Required/optional toggle
6. Click **Save Lead Form Configuration**
7. Save the entire perk

### Example Form Fields
- Name (text, required)
- Email (email, required)
- Phone (phone, required)
- Company (text, required)
- Message (textarea, optional)
- Agree to terms (checkbox, required)

## Frontend Usage

### For "Get Deal" Button
The system automatically detects the deal type:
- **Affiliate Link** → Opens link directly
- **Coupon Code** → Shows code in modal
- **Lead Capture Form** → Shows lead form modal

No changes needed to existing button logic!

## Admin Leads List

Access at: `/admin/leads`

Features:
- View all submitted leads
- Expandable rows to see full details
- Email sent status badge
- Submission timestamp
- Perk name association
- Read-only view (no editing)

## Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication: https://myaccount.google.com/security
2. Create App Password: https://myaccount.google.com/apppasswords
3. Use the generated password in `GMAIL_PASSWORD`

### Email Content
- **To:** hello@venturenext.io
- **Subject:** "New Lead: [Perk Name]"
- **Body:** HTML table with all form fields
- **Fallback:** Always saved to database even if email fails

## Form Field Types

| Type | Input | Validation | Use Case |
|------|-------|-----------|----------|
| text | Text box | Required check | Name, company |
| email | Email input | Valid email format | Email contact |
| phone | Phone input | 10+ digits | Phone number |
| number | Number input | Numeric only | Age, quantity |
| textarea | Multi-line | Required check | Message, comments |
| checkbox | Checkbox | Boolean | Agreement terms |

## Validation Rules

- **Required fields** - Must have value
- **Email fields** - Must match email pattern
- **Phone fields** - Must have 10+ digits
- **Custom messages** - Shows below each field if validation fails

## Security Features

- Server-side validation on form submission
- RLS policies enabled on database tables
- Email credentials stored in environment variables
- No sensitive data in frontend code
- CSRF protection via Next.js built-in

## Troubleshooting

### Email not sending
1. Check `GMAIL_USER` and `GMAIL_PASSWORD` in `.env.local`
2. Verify Gmail App Password is correct
3. Check email_sent flag in database
4. View server logs for error messages

### Form not appearing
1. Verify lead form is configured for the perk
2. Check perk deal_type is set to "lead_capture_form"
3. Clear browser cache
4. Check browser console for errors

### Leads not saving
1. Check database connection
2. Verify RLS policies are created
3. Check Supabase logs for errors
4. Ensure lead_forms record exists for perk

## Next Steps

1. Run SQL setup script in Supabase
2. Configure Gmail app password in `.env.local`
3. Restart dev server
4. Create a test perk with lead capture form
5. Test form submission and email delivery
6. View leads in admin panel at `/admin/leads`

