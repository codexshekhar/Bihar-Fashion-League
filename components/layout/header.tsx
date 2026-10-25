"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Partners", href: "/partners" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#F8F7F0]/95 backdrop-blur-sm border-b border-[#E5E2DC]"
          : "bg-[#F8F7F0]/80 backdrop-blur-[2px]",
      )}
    >
      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-[72px] items-center justify-between gap-8">
          <Link
            href="/"
            className="flex items-center text-xl sm:text-2xl font-bold tracking-tight text-[#171717] shrink-0"
          >
            BFL
          </Link>

          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 flex-1 justify-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium tracking-tight transition-colors hover:text-[#171717]",
                  pathname === item.href
                    ? "text-[#171717]"
                    : "text-[#66645F]",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Button asChild size="sm" className="h-9 px-6 text-sm font-medium bg-[#171717] text-white hover:bg-[#171717]/90">
              <Link href="/register/model/apply">Register Now</Link>
            </Button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              className="p-2 text-[#171717] hover:text-[#171717]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]/20 rounded-md"
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-[#F8F7F0]">
          <div className="absolute top-4 right-4 sm:right-6">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#171717] hover:text-[#171717]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]/20 rounded-md"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="mt-20 px-6 space-y-5 h-[calc(100vh-6rem)] overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-2xl sm:text-3xl font-serif font-semibold tracking-tight block transition-colors",
                  pathname === item.href ? "text-[#171717]" : "text-[#66645F]",
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-6">
              <Button asChild size="lg" className="w-full h-12 bg-[#171717] text-white hover:bg-[#171717]/90">
                <Link href="/register/model/apply" onClick={() => setIsOpen(false)}>Register Now</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
