# Lead Capture Form - Database Save Verification Guide

## Quick Summary: What Saves Where

### 1. **Form Configuration Save** (When admin creates perk)
```
Admin Panel (/admin/perks/add)
  ↓ Configure form fields
  ↓ Click "Publish Perk"
  ↓
Supabase Database
  ↓
lead_forms table:
  - id (auto-generated)
  - perk_id (links to perk)
  - form_fields: [
      { id, name, label, type, placeholder, required },
      ...
    ]
  - created_at, updated_at
```

### 2. **Lead Submission Save** (When user submits form)
```
Frontend Modal (/perks page)
  ↓ User fills form
  ↓ Clicks Submit
  ↓ POST /api/leads
  ↓
Supabase Database
  ↓
leads table:
  - id (auto-generated)
  - perk_id
  - lead_form_id
  - form_data: { field_name: value, ... }
  - email_address
  - submission_timestamp
  - email_sent: boolean
  - email_sent_at
  - created_at

Email Sent:
  ↓
hello@venturenext.io with form data in HTML table
```

## Step-by-Step Setup

### Phase 1: Database Schema Creation
**Status: MUST BE DONE FIRST**

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "SQL Editor" (left sidebar)
4. Click "New Query"
5. Copy content from `/setup-lead-forms.sql`
6. Paste and execute
7. You should see: "Query successful. No rows returned."

**Verify:**
- In Supabase dashboard → Tables
- You should see `lead_forms` and `leads` tables

### Phase 2: Environment Variables
**Status: MUST BE CONFIGURED**

Your `.env.local` must have:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx  (16 chars, app password)
```

**Get these from:**
1. Supabase Dashboard → Settings → API
   - Find NEXT_PUBLIC_SUPABASE_URL
   - Find SUPABASE_SERVICE_ROLE_KEY (🔒 private key)
2. Google Account
   - Enable 2-factor auth
   - Create app password (not regular password)
   - Copy 16-character password

### Phase 3: Test Everything

#### Test 1: Admin Creates Perk with Lead Form
1. Go to http://localhost:3004/admin/perks/add (or your port)
2. Fill in perk details (name, category, discount, expiry)
3. Select deal type: "Lead Capture Form"
4. Configure form fields:
   - Add "Full Name" (text, required)
   - Add "Email" (email, required)
   - Add "Phone" (phone, optional)
5. Click "Publish Perk"
6. Should see success toast
7. Redirects to /admin/perks

**Verify in Database:**
```sql
-- Run in Supabase SQL Editor
SELECT * FROM lead_forms;
```
You should see your form configuration with JSONB field data.

#### Test 2: User Submits Form
1. Go to http://localhost:3004/perks
2. Find the perk you just created
3. Click "Get Deal" button
4. Modal should appear with your configured fields
5. Fill form with test data
6. Click "Submit"
7. Should see success message

**Verify in Database:**
```sql
-- Check leads table
SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;

-- Check if email was marked as sent
SELECT id, perk_id, form_data, email_sent, email_sent_at FROM leads ORDER BY created_at DESC LIMIT 1;
```

#### Test 3: Admin Views Submissions
1. Go to http://localhost:3004/admin/leads
2. Should see your submitted lead
3. Expandable row shows all form data
4. Email status badge shows sent/failed

**Verify in Database:**
```sql
-- Count total leads
SELECT COUNT(*) as total_leads FROM leads;

-- Get leads for specific perk
SELECT * FROM leads WHERE perk_id = 'YOUR_PERK_ID';
```

## API Endpoints (for reference)

### Save Form Configuration
```
POST /api/lead-forms
{
  "perk_id": "uuid",
  "form_fields": [
    {
      "id": "1",
      "name": "full_name",
      "label": "Full Name",
      "type": "text",
      "placeholder": "Enter your name",
      "required": true
    }
  ],
  "submit_button_text": "Submit",
  "success_message": "Thank you!"
}
```

**Response:**
```json
{
  "id": "uuid",
  "perk_id": "uuid",
  "form_fields": [...],
  "created_at": "2025-12-18T...",
  "updated_at": "2025-12-18T..."
}
```

### Get Form Configuration
```
GET /api/lead-forms?perk_id=UUID
```

### Submit Lead
```
POST /api/leads
{
  "perk_id": "uuid",
  "lead_form_id": "uuid",
  "form_data": {
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "email_address": "john@example.com"
}
```

**Response:**
```json
{
  "id": "uuid",
  "perk_id": "uuid",
  "lead_form_id": "uuid",
  "form_data": {...},
  "email_sent": true,
  "submission_timestamp": "2025-12-18T..."
}
```

### Get All Leads
```
GET /api/leads
GET /api/leads?perk_id=UUID&limit=50&offset=0
```

## Troubleshooting Database Issues

### Issue: "Table does not exist"
**Solution:** Run the SQL schema in Supabase SQL Editor

### Issue: "Permission denied"
**Solution:** 
- Check SUPABASE_SERVICE_ROLE_KEY is correct
- Not using NEXT_PUBLIC_SUPABASE_ANON_KEY
- RLS policies might be blocking → check SQL again

### Issue: Data not appearing in table
**Solution:**
- Check API response in browser Network tab
- Verify POST request returns 201
- Check if error message in response
- Try manual SQL insert:
  ```sql
  INSERT INTO leads (perk_id, form_data) 
  VALUES ('uuid', '{"name": "test"}');
  ```

### Issue: Email not sending but data saved
**Solution:**
- This is EXPECTED behavior (database has fallback)
- Check email_sent = false
- Verify GMAIL_USER and GMAIL_PASSWORD
- Get app password from Google (not regular password)

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                   Admin Panel                        │
│ /admin/perks/add → LeadCaptureForm Component        │
│                                                      │
│  Configure Fields:                                  │
│  - Full Name (text, required)                       │
│  - Email (email, required)                          │
│  - Phone (phone, optional)                          │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓ handleSubmit
              POST /api/lead-forms
                     │
                     ↓ Supabase upsert
         ┌─────────────────────────┐
         │   lead_forms table       │
         │  (form configuration)    │
         │  JSONB form_fields       │
         └─────────────────────────┘
                     │
                     ↓
         ┌─────────────────────────┐
         │     Frontend Perks       │
         │   /perks page            │
         │  Click "Get Deal"        │
         └────────────┬─────────────┘
                     │
                     ↓ GET /api/lead-forms?perk_id=X
              Fetch form from database
                     │
                     ↓
         ┌─────────────────────────┐
         │   LeadFormModal          │
         │  Display fields          │
         │  Mobile responsive       │
         └────────────┬─────────────┘
                     │
                     ↓ User fills & submits
              POST /api/leads
                     │
    ┌────────────────┴────────────────┐
    ↓                                 ↓
Supabase Insert              Send Email
    │                                 │
    ↓                                 ↓
┌─────────────────────┐    ┌──────────────────────┐
│   leads table        │    │  hello@venturenext.io │
│ (form submissions)   │    │  HTML table format     │
│ JSONB form_data      │    │  with all field values │
│ email_sent = true    │    └──────────────────────┘
└─────────────────────┘
    │
    ↓
┌─────────────────────────┐
│   /admin/leads          │
│   View all submissions   │
│   Expandable rows        │
│   Email status badge     │
└─────────────────────────┘
```

## Complete Checklist

- [ ] Execute SQL schema in Supabase
- [ ] Set NEXT_PUBLIC_SUPABASE_URL in .env.local
- [ ] Set SUPABASE_SERVICE_ROLE_KEY in .env.local
- [ ] Set GMAIL_USER in .env.local
- [ ] Set GMAIL_PASSWORD in .env.local (app password, not regular)
- [ ] Restart dev server (for env changes)
- [ ] Create perk with lead form in admin
- [ ] Verify form config saved in lead_forms table
- [ ] Go to /perks page
- [ ] Click "Get Deal" on perk
- [ ] Modal appears with fields
- [ ] Submit form with test data
- [ ] Verify data in leads table
- [ ] Check /admin/leads shows submission
- [ ] Verify email received (or check email_sent status)

## Status Summary

| Component | Status | Notes |
|-----------|--------|-------|
| API Routes | ✅ Ready | POST, GET, PUT for lead forms and leads |
| UI Components | ✅ Ready | LeadCaptureForm, LeadFormModal responsive |
| Email System | ✅ Ready | Requires Gmail setup |
| Database Schema | ⏳ **PENDING** | Must execute SQL in Supabase |
| Integration | ✅ Ready | Admin can create, users can submit |
| Mobile Response | ✅ Ready | Tailwind responsive classes applied |

**Next Action: Run the SQL schema in your Supabase project!**
