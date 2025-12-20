# Fix for Perk Creation 400 Error

## Problem
You're getting a 400 error when trying to create perks after implementing the affiliate link and coupon code feature.

## Root Cause
The database column `deal_url` hasn't been created in your Supabase database yet.

## Solution

### Step 1: Run the SQL Migration
Execute this SQL query in your Supabase SQL Editor:

```sql
ALTER TABLE perks ADD COLUMN IF NOT EXISTS deal_url TEXT;
```

**How to do it:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Paste the SQL above
6. Click **Run**

### Step 2: Verify it worked
You should see a message like "Executed successfully" or the column should appear in the perks table schema.

### Step 3: Try Creating a Perk Again
Now you should be able to create perks with affiliate links and coupon codes without errors.

## What This Does
- Adds the `deal_url` column to the perks table
- This column stores either:
  - The affiliate/referral URL (for affiliate links)
  - The coupon code or coupon URL (for coupon codes)

## Temporary Workaround (Already Applied)
The API has been updated to gracefully handle requests even if the column doesn't exist yet. However, you still need to run the migration above to actually store the affiliate links and coupon codes.

## Need Help?
If you still get errors after running the SQL:
1. Check that the column was created in the perks table
2. Ensure you're logged into your Supabase account
3. Verify your database is the correct one
4. Check the Supabase SQL error message for details
