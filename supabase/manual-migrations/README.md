# Manual Migration Instructions for Supabase SQL Editor

Project: Bihar Fashion League (fgthcklnapafbtydmvbe)
URL: https://fgthcklnapafbtydmvbe.supabase.co

Since CLI linking is not possible in this environment due to permissions, apply migrations manually via the Supabase Dashboard SQL Editor in order.

## Execution order
1. `01_migrations_consolidated.sql` - Contains all migrations from `supabase/migrations/` in chronological order (idempotent where possible)

## Steps
1. Open https://supabase.com/dashboard/project/fgthcklnapafbtydmvbe/sql/new
2. Copy contents of `01_migrations_consolidated.sql`
3. Run the query
4. Verify in Table Editor and Authentication/Policies
5. Test form submissions with safe test data

## Notes
- No CLI access tokens, service-role keys, or secrets are included.
- Uses `IF NOT EXISTS` / idempotent patterns where safe.
- RLS is enabled with restrictive default policies (no public SELECT).
