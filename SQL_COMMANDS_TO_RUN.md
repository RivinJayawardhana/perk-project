# Database Verification SQL Commands

## Copy & Paste These Commands

### Step 1: Create Tables (RUN FIRST)
Go to Supabase → SQL Editor → New Query → Copy this entire block and execute:

```sql
-- Create lead_forms table to store form configurations
CREATE TABLE IF NOT EXISTS lead_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  perk_id UUID UNIQUE NOT NULL REFERENCES perks(id) ON DELETE CASCADE,
  form_fields JSONB NOT NULL DEFAULT '[]',
  submit_button_text VARCHAR(255) DEFAULT 'Submit',
  success_message TEXT DEFAULT 'Thank you for your interest! We will contact you soon.',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create leads table to store submitted lead data
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  perk_id UUID NOT NULL REFERENCES perks(id) ON DELETE CASCADE,
  lead_form_id UUID REFERENCES lead_forms(id) ON DELETE CASCADE,
  form_data JSONB NOT NULL,
  email_address VARCHAR(255),
  submission_timestamp TIMESTAMP DEFAULT NOW(),
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add lead_form_id column to perks table if it doesn't exist
ALTER TABLE perks ADD COLUMN IF NOT EXISTS lead_form_id UUID REFERENCES lead_forms(id) ON DELETE SET NULL;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_lead_forms_perk_id ON lead_forms(perk_id);
CREATE INDEX IF NOT EXISTS idx_leads_perk_id ON leads(perk_id);
CREATE INDEX IF NOT EXISTS idx_leads_form_id ON leads(lead_form_id);
CREATE INDEX IF NOT EXISTS idx_leads_submission_timestamp ON leads(submission_timestamp DESC);

-- Enable RLS for lead_forms table
ALTER TABLE lead_forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for lead_forms" ON lead_forms
  USING (true)
  WITH CHECK (true);

-- Enable RLS for leads table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for leads" ON leads
  USING (true)
  WITH CHECK (true);
```

**Expected Output:** Query successful. No rows returned.

---

### Step 2: Verify Tables Created
Run these individually to verify:

```sql
-- Check if lead_forms table exists
SELECT * FROM lead_forms;
```
Should return: **0 rows** (empty table)

```sql
-- Check if leads table exists
SELECT * FROM leads;
```
Should return: **0 rows** (empty table)

---

### Step 3: After Creating a Perk with Lead Form
Run this to see your saved form configuration:

```sql
SELECT 
  id,
  perk_id,
  form_fields,
  submit_button_text,
  success_message,
  created_at
FROM lead_forms
ORDER BY created_at DESC;
```

**Expected Output:**
```
id                      | perk_id               | form_fields
------------------------|-----------------------|--------------------
550e8400-e29b...       | 660e8400-e29b...      | [{"id":"1","name":"full_name",...}]
```

---

### Step 4: After Submitting a Lead Form
Run this to see submitted leads:

```sql
SELECT 
  id,
  perk_id,
  lead_form_id,
  form_data,
  email_address,
  email_sent,
  submission_timestamp
FROM leads
ORDER BY submission_timestamp DESC
LIMIT 10;
```

**Expected Output:**
```
id                      | perk_id               | form_data
------------------------|-----------------------|--------------------------------------------
550e8400-e29b...       | 660e8400-e29b...      | {"full_name":"John Doe","email":"john@..."}
```

---

### Step 5: Check Email Status
```sql
-- See which leads had emails sent successfully
SELECT 
  id,
  email_address,
  email_sent,
  email_sent_at,
  submission_timestamp
FROM leads
ORDER BY submission_timestamp DESC
LIMIT 10;
```

---

### Step 6: Count Submissions per Perk
```sql
SELECT 
  perks.name as perk_name,
  COUNT(leads.id) as lead_count,
  MAX(leads.submission_timestamp) as last_submission
FROM leads
JOIN perks ON leads.perk_id = perks.id
GROUP BY perks.id, perks.name
ORDER BY lead_count DESC;
```

---

### Step 7: Advanced - See Form Data Details
```sql
-- Expand the JSONB form_data to see individual field values
SELECT 
  leads.id,
  perks.name as perk_name,
  leads.form_data->>'full_name' as full_name,
  leads.form_data->>'email' as email,
  leads.form_data->>'phone' as phone,
  leads.email_sent,
  leads.submission_timestamp
FROM leads
JOIN perks ON leads.perk_id = perks.id
ORDER BY leads.submission_timestamp DESC
LIMIT 10;
```

---

## Troubleshooting Queries

### Check if Tables Exist
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_name IN ('lead_forms', 'leads');
```
Should return 2 rows

### Check Column Names
```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'lead_forms';
```

### Check RLS Policies
```sql
SELECT policyname, tablename, qual
FROM pg_policies
WHERE tablename IN ('lead_forms', 'leads');
```

### Check Indexes
```sql
SELECT indexname, tablename
FROM pg_indexes
WHERE tablename IN ('lead_forms', 'leads');
```

### Test Insert into lead_forms
```sql
-- Replace with actual perk_id from your perks table
INSERT INTO lead_forms (perk_id, form_fields)
VALUES (
  (SELECT id FROM perks LIMIT 1),
  '[{"id":"1","name":"email","label":"Email","type":"email","placeholder":"you@company.com","required":true}]'
)
RETURNING *;
```

### Test Insert into leads
```sql
-- Replace perk_id and lead_form_id with real values
INSERT INTO leads (perk_id, lead_form_id, form_data, email_address)
VALUES (
  (SELECT perk_id FROM lead_forms LIMIT 1),
  (SELECT id FROM lead_forms LIMIT 1),
  '{"email":"test@example.com","name":"Test User"}',
  'test@example.com'
)
RETURNING *;
```

---

## Environment Variables Verification

### Check if .env.local is loaded
```bash
# In project root, check file exists
ls -la .env.local

# Should show:
# -rw-r--r--  user  group  size  date  .env.local
```

### Required Variables
```bash
# Make sure these are all set in .env.local
echo $NEXT_PUBLIC_SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY
echo $GMAIL_USER
echo $GMAIL_PASSWORD
```

If any return empty, update .env.local and restart dev server:
```bash
npm run dev
```

---

## Data Flow Test Matrix

| Step | Action | Where to Check | Expected Result |
|------|--------|-----------------|-----------------|
| 1 | Execute SQL schema | Supabase Tables section | `lead_forms` and `leads` appear |
| 2 | Create perk with lead form | SQL: `SELECT * FROM lead_forms` | 1 row with form_fields JSONB |
| 3 | Submit lead form | SQL: `SELECT * FROM leads` | 1 row with form_data JSONB |
| 4 | Check email sent | SQL: `SELECT email_sent FROM leads` | true or false |
| 5 | View in admin | /admin/leads page | Lead appears in table |
| 6 | Check email received | Gmail inbox | Email from nodemailer in INBOX |

---

## Common Error Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "relation 'lead_forms' does not exist" | SQL not executed | Run the schema SQL in Supabase |
| "permission denied for schema public" | RLS policy issue | Check CREATE POLICY statements ran |
| "violates foreign key constraint" | Invalid perk_id | Use valid perk UUID from perks table |
| "email_address is required" | Missing email in form_data | Ensure email field in form |
| "No email sending" | Gmail credentials wrong | Use app password (16 chars), not regular password |

---

## Summary

**Phase 1 (Database):** ⏳ **MUST DO**
- [ ] Copy full SQL block above
- [ ] Go to Supabase SQL Editor
- [ ] Paste and execute
- [ ] Verify tables with verification queries

**Phase 2 (Environment):** ✅ **ALREADY SET UP**
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] GMAIL_USER
- [ ] GMAIL_PASSWORD

**Phase 3 (Testing):** ✅ **READY TO TEST**
- [ ] App is running and compiling successfully
- [ ] All API routes are deployed
- [ ] All UI components are ready
- [ ] Just waiting for database tables to exist!

**Next Step: Execute the SQL schema now!**
