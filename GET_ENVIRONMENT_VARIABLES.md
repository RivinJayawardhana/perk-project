# Get Missing Environment Variables

## 1. SUPABASE_SERVICE_ROLE_KEY

**Steps:**
1. Go to https://supabase.com/dashboard
2. Select your project: **rdkohvwljwbncximfpmq**
3. Click **Settings** (bottom left)
4. Click **API** tab
5. Look for **Service Role** section
6. Copy the full key (starts with `eyJ...`)
7. Paste in `.env.local` as: `SUPABASE_SERVICE_ROLE_KEY=eyJ...`

**In .env.local:**
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
```

---

## 2. GMAIL_USER and GMAIL_PASSWORD

**Steps for Gmail App Password:**
1. Go to https://myaccount.google.com
2. Click **Security** (left menu)
3. Enable **2-Step Verification** (if not already done)
4. After 2FA is enabled, you'll see **App passwords**
5. Click **App passwords**
6. Select Device: **Windows Computer** (or your device)
7. Select App: **Mail**
8. Click **Generate**
9. Google shows a 16-character password
10. Copy it exactly (with spaces like: `xxxx xxxx xxxx xxxx`)

**In .env.local:**
```
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

**Example:**
```
GMAIL_USER=myproject@gmail.com
GMAIL_PASSWORD=abcd efgh ijkl mnop
```

⚠️ **IMPORTANT:**
- Use **Gmail app password** (16 chars), NOT your regular Gmail password
- Include the spaces in the app password
- Keep these secret, don't share them

---

## 3. BREVO_API_KEY

**Steps:**
1. Go to https://app.brevo.com (login with your Brevo account)
2. Click **Settings** (bottom left)
3. Click **Account** tab
4. Scroll to **API Keys** section
5. Click **Create a new API key** or copy your existing one
6. Copy the API key (starts with `xkeysib-`)
7. Paste in `.env.local` as: `BREVO_API_KEY=xkeysib-...`

**In .env.local:**
```
BREVO_API_KEY=xkeysib-your-api-key-here
```

**Purpose:** Newsletter subscription collection. Users can subscribe to emails via the footer subscribe form, and emails are added to your Brevo account.

⚠️ **IMPORTANT:**
- Keep this API key secret, don't share it
- Users can now subscribe to newsletters via the footer form
- Subscriptions are sent to your Brevo account (list ID 2)

---

## After Updating .env.local

1. Save `.env.local`
2. Stop dev server (Ctrl+C)
3. Restart: `npm run dev`
4. Try creating perk with lead form again

---

## Where to Find Each Variable

| Variable | Source |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Already set |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Already set |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API |
| `GMAIL_USER` | Your Gmail address |
| `GMAIL_PASSWORD` | Google Account → Security → App passwords |
| `BREVO_API_KEY` | Brevo Dashboard → Settings → Account → API Keys |

Once all are filled in:
- Lead forms will save to database
- Newsletter subscriptions will collect emails to Brevo
