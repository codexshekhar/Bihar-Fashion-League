import { NextResponse } from "next/server";

function getSupabaseAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = getSupabaseAnonKey();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const anonKeyLegacy = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  const keyInfo = (key: string | undefined) => {
    if (!key) return "MISSING";
    if (key.startsWith("sb_publishable_")) return `PRESENT (sb_publishable_...)`;
    if (key.startsWith("eyJ")) return `PRESENT (JWT...)`;
    return `PRESENT (unknown format)`;
  };
  
  const urlInfo = (url: string | undefined) => {
    if (!url) return "MISSING";
    try {
      const u = new URL(url);
      return `PRESENT (host: ${u.hostname})`;
    } catch {
      return `PRESENT (invalid URL)`;
    }
  };
  
  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: urlInfo(supabaseUrl),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: keyInfo(anonKeyLegacy),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: keyInfo(publishableKey),
    SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey ? "PRESENT" : "MISSING",
    effectiveAnonKey: keyInfo(anonKey),
    effectiveUrl: urlInfo(supabaseUrl),
    expectedProjectHost: "fgthcklnapafbtydmvbe.supabase.co",
    keyPreference: "ANON_KEY > PUBLISHABLE_KEY",
    timestamp: new Date().toISOString(),
  });
}
