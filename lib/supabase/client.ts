import { createBrowserClient } from "@supabase/ssr";

function getSupabaseAnonKey(): string {
  // Prefer legacy ANON_KEY (JWT format) as it's the established key for this project.
  // Fall back to PUBLISHABLE_KEY if ANON_KEY is not set.
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabaseAnonKey()!,
  );
}
