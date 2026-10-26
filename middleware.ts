import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const hasSupabaseConfig =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "";

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const pathname = requestUrl.pathname;

  // Allow access to admin login without authentication - prevent any redirects
  if (pathname === "/admin/login") {
    if (!hasSupabaseConfig) {
      return NextResponse.next();
    }
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      },
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return response;
  }

  if (!hasSupabaseConfig) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    },
  );

  const { data: { session } } = await supabase.auth.getSession();

  // Protect admin routes (excluding /admin/login already handled)
  if (pathname.startsWith("/admin")) {
    if (!session) {
      const redirectUrl = new URL("/admin/login", request.url);
      const redirectTo = pathname + requestUrl.search;
      if (redirectTo && redirectTo !== "/admin/login") {
        redirectUrl.searchParams.set("redirectTo", redirectTo);
      }
      return NextResponse.redirect(redirectUrl);
    }
    return response;
  }

  // Redirect authenticated users away from login page
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
