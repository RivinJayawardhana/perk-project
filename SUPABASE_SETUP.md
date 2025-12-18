# Supabase Backend Integration Guide

## Completed Setup Steps ✅

### 1. Dependencies Installed
- `@supabase/supabase-js` - Supabase JavaScript client

### 2. Environment Variables
Created `.env.local` with placeholders for:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### 3. Supabase Client
Created `src/lib/supabase.ts` - Central client instance for all database operations

### 4. Database Schema
Created `supabase-schema.sql` with:
- **perks** - Main deals/perks table
- **categories** - Deal categories
- **subcategories** - Category subdivisions
- **journal_posts** - Blog posts
- **contact_submissions** - Contact form submissions
- **page_content** - Dynamic page content (home, about, etc.)

Includes:
- Primary keys and foreign keys
- Indexes for performance
- Row Level Security (RLS) policies
- Timestamps for tracking changes

### 5. API Routes Created

#### Perks Management
- `GET /api/perks` - Fetch all perks
- `POST /api/perks` - Create new perk
- `GET /api/perks/[id]` - Fetch single perk
- `PUT /api/perks/[id]` - Update perk
- `DELETE /api/perks/[id]` - Delete perk

#### Categories Management
- `GET /api/categories` - Fetch all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category
- `GET /api/categories/[categoryId]/subcategories` - Fetch subcategories
- `POST /api/categories/[categoryId]/subcategories` - Create subcategory

#### Journal Posts
- `GET /api/journal` - Fetch all posts
- `POST /api/journal` - Create post
- `GET /api/journal/[id]` - Fetch single post
- `PUT /api/journal/[id]` - Update post
- `DELETE /api/journal/[id]` - Delete post

#### Contact & Pages
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Fetch submissions (admin)
- `GET /api/pages/[pageName]` - Fetch page content
- `PUT /api/pages/[pageName]` - Update page content

### 6. Custom React Query Hooks

Created reusable hooks for all operations:

#### usePerks.ts
- `usePerks()` - Fetch all perks
- `usePerk(id)` - Fetch single perk
- `useCreatePerk()` - Create perk
- `useUpdatePerk(id)` - Update perk
- `useDeletePerk()` - Delete perk

#### useCategories.ts
- `useCategories()` - Fetch all categories
- `useCreateCategory()` - Create category
- `useUpdateCategory(id)` - Update category
- `useDeleteCategory()` - Delete category
- `useSubcategories(categoryId)` - Fetch subcategories
- `useCreateSubcategory(categoryId)` - Create subcategory

#### useJournal.ts
- `useJournalPosts()` - Fetch all posts
- `useJournalPost(id)` - Fetch single post
- `useCreateJournalPost()` - Create post
- `useUpdateJournalPost(id)` - Update post
- `useDeleteJournalPost()` - Delete post

#### useContact.ts
- `useSubmitContact()` - Submit contact form

#### usePageContent.ts
- `usePageContent(pageName)` - Fetch page content
- `useUpdatePageContent(pageName)` - Update page content

## Next Steps - Manual Configuration Required

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login
3. Create new project
4. Note your project URL and anonymous key

### 2. Set Up Database Schema
1. Go to Supabase Dashboard → SQL Editor
2. Create new query
3. Copy contents of `supabase-schema.sql`
4. Execute the SQL

### 3. Update Environment Variables
Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### 4. Enable Storage (for images)
In Supabase Dashboard:
1. Go to Storage
2. Create new bucket named `perks-images`
3. Make it public
4. Set RLS policies to allow public read

### 5. Test Connection
Run your app:
```bash
npm run dev
```

Test API endpoints:
```bash
# Test perks endpoint
curl http://localhost:3000/api/perks
```

## Using Hooks in Components

### Example: Display All Perks
```typescript
'use client'

import { usePerks } from '@/hooks/usePerks'

export default function PerksPage() {
  const { data: perks, isLoading, error } = usePerks()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {perks?.map(perk => (
        <div key={perk.id}>{perk.name}</div>
      ))}
    </div>
  )
}
```

### Example: Create Perk (Admin)
```typescript
'use client'

import { useCreatePerk } from '@/hooks/usePerks'

export default function AddPerkForm() {
  const { mutate: createPerk, isPending } = useCreatePerk()

  const handleSubmit = (formData) => {
    createPerk(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Perk'}
      </button>
    </form>
  )
}
```

## Security Notes

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Public read access for public pages
- ✅ Contact submissions allow public insert
- ✅ Consider adding authentication for admin operations
- ✅ Future: Add admin role checking in RLS policies

## Common Issues

### Connection Error
- Verify environment variables are correctly set
- Check Supabase project is active
- Ensure project URL and key match

### CORS Issues
- Next.js API routes bypass CORS automatically
- Client-side requests go through API routes

### RLS Policy Errors
- Make sure RLS policies are created correctly
- Check Supabase dashboard for policy details

## File Structure
```
src/
  lib/
    supabase.ts          # Supabase client
  app/
    api/
      perks/
        route.ts         # List/Create perks
        [id]/route.ts    # Get/Update/Delete perk
      categories/
        route.ts         # List/Create categories
        [id]/route.ts    # Update/Delete category
        [categoryId]/
          subcategories/
            route.ts     # Subcategories CRUD
      journal/
        route.ts         # Journal posts CRUD
        [id]/route.ts    # Single post operations
      contact/
        route.ts         # Contact form submission
      pages/
        [pageName]/
          route.ts       # Page content management
  hooks/
    usePerks.ts          # Perks queries & mutations
    useCategories.ts     # Categories queries & mutations
    useJournal.ts        # Journal queries & mutations
    useContact.ts        # Contact form mutation
    usePageContent.ts    # Page content queries & mutations
```
