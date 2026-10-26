# Bihar Fashion League

A contemporary, premium fashion-week platform for Bihar Fashion League (BFL). Built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- [Next.js](https://nextjs.org/) 16 — App Router, Turbopack
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Supabase](https://supabase.com/) — PostgreSQL, Auth, Storage
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Lucide React](https://lucide.dev/) — icons
- [Zod](https://zod.dev/) — validation
- [React Hook Form](https://react-hook-form.com/) — forms

## Project Structure

```
app/                    # Next.js App Router pages
  page.tsx              # Homepage
  about/page.tsx        # About page
  participants/page.tsx # Participant directory
  participants/[slug]/page.tsx # Participant detail
  events/page.tsx       # Events listing
  events/[slug]/page.tsx # Event detail
  gallery/page.tsx      # Gallery
  partners/page.tsx     # Partners & sponsorship
  news/page.tsx         # News & press
  news/[slug]/page.tsx  # News article
  contact/page.tsx      # Contact
  register/page.tsx     # Registration
  admin/                # Admin dashboard
  api/                  # Server API routes
components/             # Reusable components
  ui/                   # Base UI components (shadcn-style)
  layout/               # Header, Footer, AdminLayout
  home/                 # Homepage sections
lib/                    # Utilities, Supabase clients, validation
supabase/               # Database migrations and seed
public/                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com/) project

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your Supabase credentials in .env.local

# Run the database migration
# Apply supabase/migrations/0001_initial.sql in your Supabase SQL editor

# Optional: seed development data
# Apply supabase/seed.sql in your Supabase SQL editor

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://biharfashionleague.in`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `SESSION_SECRET` | Secret for admin sessions (32+ chars) |

## Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/0001_initial.sql` in the SQL editor
3. Optionally run `supabase/seed.sql` for development examples (clearly labeled)
4. Configure Storage buckets for image uploads
5. Review Row Level Security policies

## Admin Dashboard

Access at `/admin`. The admin dashboard allows managing:
- Participants, Events, Sponsors, Gallery, News
- FAQs, Site Settings, Registration Applications
- Contact and Partnership Inquiries

## Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add the environment variables from `.env.example`
4. Deploy

### Supabase Production

Ensure your Supabase project is in the correct region and RLS policies are enabled.

## Security

- Row Level Security (RLS) is enabled on all tables
- Public users can only read published content
- Admin operations require authentication
- Form submissions use server-side Zod validation
- Service role key is never exposed to the browser

## License

Private — Bihar Fashion League


## Admin Authentication Setup

### 1. Local Configuration
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Configure the required variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` - From Supabase Dashboard → Settings → API
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` OR `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - From Supabase Dashboard → Settings → API (anon/public key). The code accepts either. Never use service-role key in browser.
   - `ADMIN_EMAIL_ALLOWLIST` - Comma-separated emails authorized for admin access (e.g. `piyush@biharfashionleague.com`). Case-insensitive.
   - `SUPABASE_SERVICE_ROLE_KEY` - Server-side only (never commit/expose to browser)
   - `SESSION_SECRET` - Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

`.env.local` is gitignored (see `.gitignore`).

### 2. Supabase Administrator Provisioning
Supabase Auth and admin authorization are separate:
1. Go to [Supabase Dashboard](https://app.supabase.com) → Project → Authentication → Users → Add user
2. Email: `piyush@biharfashionleague.com`
3. Create a strong password securely (do **not** commit passwords to docs/git). Confirm the user's email if required by your auth settings.
4. Ensure the email matches `ADMIN_EMAIL_ALLOWLIST`.

### 3. Vercel Configuration
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add `ADMIN_EMAIL_ALLOWLIST` with comma-separated authorized emails for the appropriate environments (Production/Preview/Development)
3. Ensure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and other required vars are set
4. Redeploy the project

### 4. How Authorization Works
- `lib/auth/actions.ts:isAdmin()` reads `process.env.ADMIN_EMAIL_ALLOWLIST`, splits by comma, trims, lowercases, and checks if the authenticated user's email is included.
- `middleware.ts` protects `/admin/*` routes (redirects unauthenticated to `/admin/login` with safe `redirectTo`), allows `/admin/login` unauthenticated and redirects authenticated users away.
- `app/admin/layout.tsx` enforces server-side checks: requires session + user, checks `isAdmin()`, redirects unauthorized to `/admin/login?error=Unauthorized`.


## Troubleshooting: "Invalid API key" on Admin Login
- Verify `.env.local` has `NEXT_PUBLIC_SUPABASE_URL=https://fgthcklnapafbtydmvbe.supabase.co` and the correct anon/publishable key for that exact project from Supabase Dashboard → Settings → API.
- Supabase may use `eyJ...` (legacy JWT anon) or `sb_publishable_...` (publishable). Use the key that matches your project's API settings — do not guess.
- Ensure the key is used by browser/server clients via `@supabase/ssr` (we use `NEXT_PUBLIC_SUPABASE_ANON_KEY` only). Never use `SUPABASE_SERVICE_ROLE_KEY` on the client.
- After changing env vars locally, restart the Next.js dev server. On Vercel, redeploy after updating env vars.
- If the error persists, confirm the key hasn't been rotated/regenerated for project `fgthcklnapafbtydmvbe`.
