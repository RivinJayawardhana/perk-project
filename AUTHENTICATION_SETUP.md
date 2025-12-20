# Admin Authentication Setup

This guide explains the authentication system that has been implemented for the admin dashboard.

## Features Implemented

1. **Admin Login** - Secure login page with Supabase authentication
2. **Protected Routes** - All admin routes are protected and require authentication
3. **Change Password** - Admins can change their password from the Settings page
4. **Auto Logout** - Session management with automatic logout on auth state changes
5. **User Menu** - Quick access dropdown menu in the admin sidebar

## How to Create Admin Users

Since you're using Supabase, you need to create admin users in your Supabase project:

1. Go to your **Supabase Dashboard** → **Authentication** → **Users**
2. Click **"Add user"** button
3. Enter an email address and password
4. Click **"Create user"**

The user can now login to the admin dashboard using these credentials.

## Login Flow

1. Navigate to `http://localhost:3000/login` (or unauthenticated users will be redirected here)
2. Enter your Supabase user email and password
3. Click **"Sign In"**
4. You'll be redirected to `/admin` dashboard

## Accessing Features

### Dashboard
- **URL**: `http://localhost:3000/admin`
- **Status**: Protected - requires login
- Access all admin features from here

### Change Password
- **URL**: `http://localhost:3000/admin/settings`
- **How to access**: Click on your user profile in the bottom-left of the admin sidebar, then click "Change Password"
- **Features**:
  - Verify current password
  - Set new password with confirmation
  - Password must be at least 6 characters
  - Shows success message after update
  - Auto-redirects to dashboard after 2 seconds

### Logout
- **How to access**: Click on your user profile in the bottom-left of the admin sidebar, then click "Logout"
- **Behavior**: Clears session and redirects to login page

## Technical Implementation

### Files Created/Modified

**New Files:**
- `/src/contexts/AuthContext.tsx` - Authentication context and provider
- `/src/components/ProtectedRoute.tsx` - Route protection component
- `/src/app/login/page.tsx` - Login page
- `/src/app/admin/layout.tsx` - Admin routes layout with protection
- `/src/app/admin/settings/page.tsx` - Change password page

**Modified Files:**
- `/src/components/ClientProviders.tsx` - Added AuthProvider
- `/src/components/AdminLayout.tsx` - Added user menu with logout and settings
- `/src/app/admin/page.tsx` - Simplified to use layout protection

### Authentication Flow

1. **AuthContext** manages:
   - Current user state
   - Login/logout functionality
   - Password change logic
   - Auth state persistence

2. **ProtectedRoute** component:
   - Checks if user is authenticated
   - Redirects to login if not
   - Shows loading spinner while checking auth status

3. **Admin Layout**:
   - Wraps all admin routes with ProtectedRoute
   - Shows user menu in sidebar
   - Handles logout action

## Important Notes

- All authentication happens via Supabase
- User credentials are stored securely in Supabase
- The admin key and URL in `.env.local` are used for Supabase connection
- Sessions are managed by Supabase SDK
- Password changes are verified against the current password

## Testing the Authentication

1. **Test Login:**
   - Create a test user in Supabase
   - Go to `http://localhost:3000/login`
   - Login with test credentials
   - Verify you're redirected to dashboard

2. **Test Protected Routes:**
   - Logout from the user menu
   - Try to access `http://localhost:3000/admin`
   - Verify you're redirected to login

3. **Test Change Password:**
   - Login with your test user
   - Go to Settings (via user menu → Change Password)
   - Try changing password with wrong current password (should fail)
   - Change password with correct credentials
   - Verify you can login with new password

## Troubleshooting

**"Invalid credentials" error on login:**
- Make sure the user exists in Supabase Authentication
- Check that email and password are correct
- Ensure Supabase is properly configured in `.env.local`

**"Auth context not found" error:**
- Make sure `AuthProvider` is wrapped in `ClientProviders`
- Check that the page is marked as `"use client"`

**Password change fails:**
- Make sure current password is entered correctly
- New password must be at least 6 characters
- Confirm password must match new password

## Next Steps

To add more admin users:
1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add user"
3. Enter credentials and save
4. Share login details securely with admin team members

That's it! The authentication system is now fully integrated and ready to use.
