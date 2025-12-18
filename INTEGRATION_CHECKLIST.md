# Supabase Integration Checklist

## ✅ Completed
- [x] Installed @supabase/supabase-js package
- [x] Created .env.local with placeholders
- [x] Created Supabase client instance (src/lib/supabase.ts)
- [x] Generated database schema SQL (supabase-schema.sql)
- [x] Created API routes for all CRUD operations
- [x] Created custom React Query hooks

## 📋 Still TODO

### 1. Supabase Project Setup (5 minutes)
- [ ] Create account at https://supabase.com
- [ ] Create new project
- [ ] Get project URL
- [ ] Get anonymous key
- [ ] Copy credentials to .env.local

### 2. Database Setup (5 minutes)
- [ ] Open Supabase SQL Editor
- [ ] Run SQL from supabase-schema.sql
- [ ] Verify all tables created
- [ ] Check RLS policies are enabled

### 3. Environment Configuration (2 minutes)
- [ ] Update NEXT_PUBLIC_SUPABASE_URL in .env.local
- [ ] Update NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
- [ ] Restart dev server: `npm run dev`

### 4. Test Connection (5 minutes)
- [ ] Test /api/perks endpoint
- [ ] Check Supabase studio for data
- [ ] Test creating data via API

### 5. Optional - Storage Setup (5 minutes)
- [ ] Create "perks-images" bucket in Storage
- [ ] Make bucket public
- [ ] Set RLS policies for uploads

### 6. Integrate with Existing Components
- [ ] Update AllPerks.tsx to use usePerks hook
- [ ] Update AddPerk.tsx to use useCreatePerk
- [ ] Update Categories.tsx to use useCategories
- [ ] Update Journal components with useJournal hook
- [ ] Update contact form with useSubmitContact

## API Endpoints Ready to Use

### Perks
```
GET    /api/perks
POST   /api/perks
GET    /api/perks/[id]
PUT    /api/perks/[id]
DELETE /api/perks/[id]
```

### Categories
```
GET    /api/categories
POST   /api/categories
PUT    /api/categories/[id]
DELETE /api/categories/[id]
GET    /api/categories/[categoryId]/subcategories
POST   /api/categories/[categoryId]/subcategories
```

### Journal
```
GET    /api/journal
POST   /api/journal
GET    /api/journal/[id]
PUT    /api/journal/[id]
DELETE /api/journal/[id]
```

### Contact & Pages
```
POST   /api/contact
GET    /api/contact (admin view)
GET    /api/pages/[pageName]
PUT    /api/pages/[pageName]
```

## Hooks Ready to Use

### In your components:
```typescript
import { usePerks, useCreatePerk, useUpdatePerk, useDeletePerk } from '@/hooks/usePerks'
import { useCategories, useCreateCategory, useSubcategories } from '@/hooks/useCategories'
import { useJournalPosts, useCreateJournalPost } from '@/hooks/useJournal'
import { useSubmitContact } from '@/hooks/useContact'
import { usePageContent, useUpdatePageContent } from '@/hooks/usePageContent'
```

## Quick Test Command
```bash
# After starting dev server
curl http://localhost:3000/api/perks
curl http://localhost:3000/api/categories
curl http://localhost:3000/api/journal
```

## Next Action
Go to https://supabase.com and create your first project! 🚀
