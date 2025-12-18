# 🚀 Quick Start: Get Your App Running

## 1️⃣ Get Supabase Credentials (2 minutes)

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Sign Up" 
3. Create new project named "perk-project"
4. Wait for project initialization
5. Go to Settings → API → Copy:
   - `NEXT_PUBLIC_SUPABASE_URL` (Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon key)

## 2️⃣ Update Environment File (1 minute)

Open `/Users/Rivin/Desktop/perk-project/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

Replace with your actual credentials from Supabase.

## 3️⃣ Create Database Tables (2 minutes)

1. In Supabase Dashboard → SQL Editor
2. Click "New query"
3. Copy entire contents of `supabase-schema.sql` from project root
4. Paste into SQL editor
5. Click "Run"
6. Wait for success message

## 4️⃣ Start Development Server (1 minute)

```bash
cd /Users/Rivin/Desktop/perk-project
npm run dev
```

Visit: **http://localhost:3000**

## 5️⃣ Access Admin Panel

Go to: **http://localhost:3000/admin**

### Admin Routes:
- `/admin/perks` - View/manage all perks
- `/admin/perks/new` - Create new perk
- `/admin/categories` - Manage categories
- `/admin/journal` - Manage blog posts

## ✅ Test It Works

1. Go to admin panel: `/admin/categories`
2. Click "+ Add Category"
3. Type "Test Category"
4. Click "Add"
5. Should see success toast and category appears in table
6. Go to `/admin/perks/new`
7. Fill form and click "Publish Perk"
8. Check `/admin/perks` to see your perk

## 🎯 What You Can Do Now

✅ Create/Edit/Delete perks
✅ Manage categories  
✅ Upload perk images
✅ Set discounts & expiry dates
✅ Track all data in Supabase

## 📱 Next Features to Add

- [ ] Authentication (Admin login)
- [ ] Subcategories  
- [ ] Image storage in Supabase
- [ ] Bulk import
- [ ] Analytics
- [ ] Email notifications

---

**Questions?** Check `INTEGRATION_COMPLETE.md` or `SUPABASE_SETUP.md`
