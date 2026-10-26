import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never redirect the admin login page - always allow it to render
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (pathname.startsWith("/admin")) {
    // Let the route/layout handle auth; middleware should not redirect to cause loops
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/login", "/admin/:path*", "/login"],
};
