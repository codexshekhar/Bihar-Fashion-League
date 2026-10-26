import { createBrowserClient } from "@supabase/ssr";

function getSupabaseAnonKey(): string {
  // Support both naming conventions: ANON_KEY (legacy) and PUBLISHABLE_KEY (new)
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabaseAnonKey()!,
  );
}
