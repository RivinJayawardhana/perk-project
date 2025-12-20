# Affiliate Link & Coupon Code Implementation

## What was implemented:

### 1. Database Changes
- Added `deal_url` column to perks table via migration file: `add-deal-url-column.sql`
- Run this SQL on your Supabase database

### 2. Admin Features (Add/Edit Perk)
- Both AddPerk and EditPerk components now save the `deal_url` field
- This field stores either:
  - **Affiliate Link**: Full URL to the affiliate/referral link
  - **Coupon Code**: The coupon code or code URL

### 3. Frontend Perks Page
- **Affiliate Links**: Click "Get Deal" button → Link opens in a NEW TAB automatically
  - Shows toast: "Affiliate link opened in a new tab"
  
- **Coupon Codes**: Click "Get Deal" button → Modal appears with:
  - The coupon code displayed prominently
  - "Copy Code" button to copy to clipboard (with feedback)
  - "Open Link" button (if code is a URL, opens it)
  - "Close" button to dismiss modal

### 4. Error Handling
- If no `deal_url` is set for a perk, shows error message instead of breaking

## How to Use:

### Setting up a Perk with Affiliate Link:
1. Go to Admin → Add/Edit Perk
2. Select "🔗 Direct Link" under "How to Claim" section
3. Enter the full affiliate URL in the "URL or Coupon" field
4. Save the perk

### Setting up a Perk with Coupon Code:
1. Go to Admin → Add/Edit Perk
2. Select "🎟️ Coupon Code" under "How to Claim" section
3. Enter the coupon code in the "URL or Coupon" field (e.g., "FOUNDER50" or "https://example.com/redeem?code=FOUNDER50")
4. Save the perk

## SQL Migration Required:
```sql
ALTER TABLE perks ADD COLUMN IF NOT EXISTS deal_url TEXT;
```

Run this command in your Supabase dashboard under the SQL Editor to add the new column.

## Features:
✅ Affiliate links open in new tab with confirmation
✅ Coupon codes show in beautiful modal
✅ Copy-to-clipboard functionality for coupon codes
✅ URL detection for coupon codes (if it's a link, can open it)
✅ Error messages if deal_url is missing
✅ Fully typed with TypeScript
