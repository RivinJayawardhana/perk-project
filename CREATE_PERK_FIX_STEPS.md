# Steps to Fix Perk Creation Issue

## Step 1: Run the SQL Migration (CRITICAL)
This is the MOST IMPORTANT step. Without this, perks cannot be created.

### In Supabase Dashboard:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste this SQL:
```sql
ALTER TABLE perks ADD COLUMN IF NOT EXISTS deal_url TEXT;
```
6. Click **Run**
7. You should see "Success" message

**DO NOT PROCEED UNTIL THIS IS DONE**

---

## Step 2: Restart Your Development Server

In your terminal:
1. Stop the server (Ctrl+C if running)
2. Run:
```bash
npm run dev
```

Wait for it to say "ready on http://localhost:3001"

---

## Step 3: Try Creating a Perk

1. Go to http://localhost:3001/admin
2. Click "Perks" → "Add Perk"
3. Fill in the form:
   - Company Name: "Test Company"
   - Category: Select any category
   - Perk Title: "Test Perk"
   - Deal Badge: "$50 off"
   - Valid Until: Pick a date
   - How to Claim: Choose affiliate link or coupon
   - For affiliate: Enter a URL like "https://example.com"
   - For coupon: Enter a code like "SAVE50"
4. Click "Create Perk"

---

## If Still Getting 400 Error

Check the browser console (F12 → Console tab) and server logs for the exact error message. This will help identify what's wrong.

Common issues:
- Missing required fields (all marked with *)
- Invalid category selection
- Empty deal_url for selected type

---

## What the Fix Does

✅ **API now safely handles perk creation** - Only sends fields that exist in database
✅ **deal_url field is optional** - Perks can be created without it until migration runs
✅ **Better error logging** - Console will show exact Supabase errors for debugging

**But you MUST run the SQL migration above for the feature to fully work!**
