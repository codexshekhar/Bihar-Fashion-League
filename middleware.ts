import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const hasSupabaseConfig =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "";

export async function middleware(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStore = await cookies();

  // If Supabase is not configured, allow access (development mode)
  if (!hasSupabaseConfig) {
    // Redirect authenticated-looking users away from login
    if (requestUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  const { data: { session } } = await supabase.auth.getSession();

  // Protect admin routes
  if (requestUrl.pathname.startsWith("/admin")) {
    if (!session) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirectTo", requestUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // Redirect authenticated users away from login page
  if (requestUrl.pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
