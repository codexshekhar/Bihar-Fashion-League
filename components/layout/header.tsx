"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, LogOut, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Partners", href: "/partners" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check auth status on mount
  useEffect(() => {
    let mounted = true;
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/session");
        if (mounted && res.ok) {
          const data = await res.json();
          setIsAuthenticated(!!data.session || !!data.supabaseNotConfigured);
        }
      } catch {}
    }
    checkAuth();
    return () => { mounted = false; };
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } catch {}
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[color,background-color,border-color] duration-300",
        scrolled ? "bg-white border-b border-black/10" : "bg-transparent",
      )}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-3xl font-bold tracking-tighter text-primary"
          >
            <span className="relative">
              <span className="absolute -inset-px block bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              BFL
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-base font-medium tracking-tight transition-colors",
                  pathname === item.href ? "text-primary" : "text-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Button asChild size="sm" className="px-6 py-3 text-sm font-medium tracking-tight">
                  <Link href="/admin">Admin Dashboard</Link>
                </Button>
                <button
                  onClick={handleSignOut}
                  className="px-6 py-3 text-sm font-medium tracking-tight text-primary hover:bg-primary/5 rounded-full transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Button asChild size="sm" className="px-6 py-3 text-sm font-medium tracking-tight">
                  <Link href="/register">Register Now</Link>
                </Button>
                <button
                  onClick={() => router.push("/login")}
                  className="px-6 py-3 text-sm font-medium tracking-tight text-primary hover:bg-primary/5 rounded-full transition-colors"
                >
                  Admin Login
                </button>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 text-foreground hover:text-primary"
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm">
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground hover:text-primary"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-24 px-6 space-y-12">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-bold tracking-tighter block hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full px-8 py-4">
                  <Link href="/admin">Admin Dashboard</Link>
                </Button>
                <button
                  onClick={handleSignOut}
                  className="w-full px-8 py-4 text-sm font-medium tracking-tight text-primary hover:bg-primary/5 rounded-full transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-8">
                <Button asChild size="lg" className="w-full px-8 py-4">
                  <Link href="/register">Register Now</Link>
                </Button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/login");
                  }}
                  className="w-full px-8 py-4 text-sm font-medium tracking-tight text-primary hover:bg-primary/5 rounded-full transition-colors"
                >
                  Admin Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
