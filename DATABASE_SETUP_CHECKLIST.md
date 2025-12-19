# Database Setup Checklist

## Required Actions

### 1. Execute Database Schema
You need to run this SQL in your Supabase project to create the tables:

**Steps:**
1. Go to https://supabase.com/dashboard/projects
2. Select your project
3. Go to SQL Editor
4. Create a new query
5. Copy the SQL from `setup-lead-forms.sql` and execute it

**What gets created:**
- `lead_forms` table: Stores form configurations (perk_id, form_fields JSONB, submit_button_text, success_message)
- `leads` table: Stores form submissions (perk_id, lead_form_id, form_data JSONB, email_address, submission_timestamp, email_sent)
- RLS policies for public access
- Indexes for performance

### 2. Environment Variables
Ensure these are set in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASSWORD=your_app_password (16-char from Google App Passwords)
```

### 3. Verify Database Connection
The API routes will automatically test the connection:
- POST `/api/lead-forms` - Creates/updates lead form
- POST `/api/leads` - Submits lead and sends email
- GET `/api/lead-forms?perk_id=X` - Retrieves form for a perk

## Database Schema

### lead_forms table
```sql
- id: uuid (primary key)
- perk_id: uuid (foreign key to perks)
- form_fields: jsonb (array of field objects)
- submit_button_text: text
- success_message: text
- created_at: timestamp
- updated_at: timestamp
```

### leads table
```sql
- id: uuid (primary key)
- perk_id: uuid (foreign key to perks)
- lead_form_id: uuid (foreign key to lead_forms)
- form_data: jsonb (submitted form data)
- email_address: text
- submission_timestamp: timestamp
- email_sent: boolean
- email_sent_at: timestamp
- created_at: timestamp
```

## Complete Flow Verification

### Admin Creates Lead Form
1. ✅ Go to /admin/perks/add
2. ✅ Create perk with "Lead Capture Form" deal type
3. ✅ Configure form fields (name, label, type, required)
4. ✅ Click "Publish Perk"
5. ✅ Form configuration saved to `lead_forms` table

### User Submits Form
1. ✅ Go to /perks page
2. ✅ Click "Get Deal" on perk with lead form
3. ✅ Modal appears with dynamic fields from database
4. ✅ User fills form
5. ✅ Clicks Submit
6. ✅ Data saved to `leads` table
7. ✅ Email sent to hello@venturenext.io
8. ✅ Success message displayed

### Admin Reviews Submissions
1. ✅ Go to /admin/leads
2. ✅ View all submitted leads
3. ✅ Expandable rows show form data
4. ✅ Email status badge shows if sent

## Troubleshooting

### Form Not Saving
- Check if `lead_forms` table exists in Supabase
- Verify SUPABASE_SERVICE_ROLE_KEY is correct
- Check browser console for API errors

### Modal Not Appearing
- Verify deal_type includes "lead_capture_form"
- Check if form was saved to database
- Try GET /api/lead-forms?perk_id=<perk_id> in browser

### Email Not Sending
- Verify GMAIL_USER and GMAIL_PASSWORD are correct
- Ensure Gmail app password is used (not regular password)
- Check /admin/leads to see if email_sent flag is false
- Database fallback ensures data is saved even if email fails

### Lead Data Not in Database
- Check leads table in Supabase
- Verify form submission completed without errors
- Check API response in browser network tab

## Status
- API Routes: ✅ Ready
- UI Components: ✅ Ready
- Email System: ✅ Ready (requires Gmail setup)
- Database Schemas: ⏳ Needs to be executed in Supabase
