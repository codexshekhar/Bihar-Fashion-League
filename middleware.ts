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
  const pathname = requestUrl.pathname;

  // Allow access to admin login without authentication
  if (pathname === "/admin/login") {
    if (!hasSupabaseConfig) {
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
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // If Supabase is not configured, allow access (development mode)
  if (!hasSupabaseConfig) {
    if (pathname === "/login") {
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

  // Protect admin routes (excluding /admin/login already handled)
  if (pathname.startsWith("/admin")) {
    if (!session) {
      const redirectUrl = new URL("/admin/login", request.url);
      const redirectTo = requestUrl.pathname + requestUrl.search;
      if (redirectTo && redirectTo !== "/admin/login") {
        redirectUrl.searchParams.set("redirectTo", redirectTo);
      }
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // Redirect authenticated users away from login page
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
