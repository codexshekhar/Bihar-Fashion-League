import { NextResponse, type NextRequest } from "next/server";
import { LAUNCH_TIMESTAMP } from "@/lib/launch-gate";

const EXEMPT_EXACT = ["/favicon.ico", "/robots.txt", "/sitemap.xml"];
const EXEMPT_PREFIXES = ["/api/", "/_next/", "/launch", "/admin/login", "/images/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const now = Date.now();

  const isExempt =
    EXEMPT_EXACT.includes(pathname) ||
    EXEMPT_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // Before launch: redirect all non-exempt page routes to countdown
  if (now < LAUNCH_TIMESTAMP && !isExempt) {
    return NextResponse.redirect(new URL("/launch", request.url));
  }

  // After launch: existing auth redirect logic
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
