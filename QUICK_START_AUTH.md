# Quick Start: Admin Authentication

## 🚀 Get Started in 2 Minutes

### Step 1: Create Your First Admin User

1. Open your Supabase project dashboard: https://supabase.com/dashboard
2. Go to **Authentication** → **Users**
3. Click **"Add user"**
4. Fill in:
   - Email: `admin@yourcompany.com`
   - Password: Create a strong password
5. Click **"Create user"**

### Step 2: Login to Admin Panel

1. Go to your app: `http://localhost:3000/login`
2. Enter the email and password from Step 1
3. Click **"Sign In"**

That's it! You're now logged into the admin dashboard. ✨

## 📍 Key Routes

| Route | Purpose | Access |
|-------|---------|--------|
| `/login` | Admin login page | Public |
| `/admin` | Dashboard (main) | Protected |
| `/admin/perks` | All perks | Protected |
| `/admin/perks/add` | Add new perk | Protected |
| `/admin/categories` | Manage categories | Protected |
| `/admin/subcategories` | Manage subcategories | Protected |
| `/admin/leads` | View collected leads | Protected |
| `/admin/journal` | Manage journal/blog | Protected |
| `/admin/home` | Edit homepage | Protected |
| `/admin/pages/*` | Edit pages (About, Contact, etc) | Protected |
| `/admin/settings` | Change password | Protected |

## 🔑 User Menu (Bottom-Left Corner)

Click on your profile in the admin sidebar to access:

```
👤 Admin
├─ 🔐 Change Password
└─ 🚪 Logout
```

## 🔐 Change Password

1. Click your profile in admin sidebar
2. Click **"Change Password"**
3. Enter current password
4. Enter new password (min 6 characters)
5. Confirm new password
6. Click **"Update Password"**

## 🗑️ Logout

1. Click your profile in admin sidebar
2. Click **"Logout"**
3. You'll be returned to login page

## ⚡ Important Notes

- **Password minimum**: 6 characters
- **Session**: Automatically managed by Supabase
- **Forgot password**: Create a new user in Supabase dashboard
- **Multiple admins**: Create additional users in Supabase
- **No email verification**: Users created in Supabase are immediately active

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Login fails | Check email/password in Supabase Users |
| Can't access admin | Make sure you're logged in (check /login) |
| Password change fails | Verify current password is correct |
| Stuck on loading | Wait a moment, session is being verified |

## 📚 Full Documentation

For detailed information, see:
- `AUTHENTICATION_SETUP.md` - Complete setup guide
- `AUTH_IMPLEMENTATION.md` - Technical details

---

Happy administering! 🎉
