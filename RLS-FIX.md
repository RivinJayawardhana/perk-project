# Fix: Row Level Security Policies

## The Issue
You're getting 400 errors when trying to POST to `/api/categories` (and other endpoints) because the Row Level Security (RLS) policies only allow **READ** access, not **WRITE** access.

Error message:
```
"new row violates row-level security policy for table \"categories\""
```

## The Solution

In your Supabase dashboard, go to the **SQL Editor** and run the SQL from `fix-rls-policies.sql`:

### Quick Steps:

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to: **SQL Editor** (left sidebar)
3. Click: **New Query**
4. Copy and paste the contents of: `fix-rls-policies.sql`
5. Click: **Run** button
6. You should see: "Query executed successfully"

### Alternatively, copy this SQL and run it:

```sql
-- Drop old policies that don't allow writes
DROP POLICY IF EXISTS "Perks are public" ON perks;
DROP POLICY IF EXISTS "Categories are public" ON categories;
DROP POLICY IF EXISTS "Subcategories are public" ON subcategories;
DROP POLICY IF EXISTS "Journal posts are public" ON journal_posts;
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;
DROP POLICY IF EXISTS "Page content is public" ON page_content;

-- Re-create policies with full CRUD access
CREATE POLICY "Perks are public (SELECT)" ON perks FOR SELECT USING (true);
CREATE POLICY "Anyone can create perks (INSERT)" ON perks FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update perks (UPDATE)" ON perks FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete perks (DELETE)" ON perks FOR DELETE USING (true);

CREATE POLICY "Categories are public (SELECT)" ON categories FOR SELECT USING (true);
CREATE POLICY "Anyone can create categories (INSERT)" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update categories (UPDATE)" ON categories FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete categories (DELETE)" ON categories FOR DELETE USING (true);

CREATE POLICY "Subcategories are public (SELECT)" ON subcategories FOR SELECT USING (true);
CREATE POLICY "Anyone can create subcategories (INSERT)" ON subcategories FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update subcategories (UPDATE)" ON subcategories FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete subcategories (DELETE)" ON subcategories FOR DELETE USING (true);

CREATE POLICY "Journal posts are public (SELECT)" ON journal_posts FOR SELECT USING (true);
CREATE POLICY "Anyone can create journal posts (INSERT)" ON journal_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update journal posts (UPDATE)" ON journal_posts FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete journal posts (DELETE)" ON journal_posts FOR DELETE USING (true);

CREATE POLICY "Anyone can submit contact form (INSERT)" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Contact submissions are readable (SELECT)" ON contact_submissions FOR SELECT USING (true);

CREATE POLICY "Page content is public (SELECT)" ON page_content FOR SELECT USING (true);
CREATE POLICY "Anyone can update page content (UPDATE)" ON page_content FOR UPDATE USING (true);
CREATE POLICY "Anyone can create page content (INSERT)" ON page_content FOR INSERT WITH CHECK (true);
```

## Test It

After running the SQL, try creating a category again:

```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Category"}' 2>&1
```

You should get a response with the created category instead of a 400 error!

## Next Steps

✅ Run the fix-rls-policies.sql in Supabase SQL Editor
✅ Try creating a category from the admin panel
✅ Try creating a perk with a category
✅ All CRUD operations should now work

**Note**: These RLS policies allow **anyone** to create/edit/delete data. For production, you should implement proper authentication and restrict access to authenticated users only.
