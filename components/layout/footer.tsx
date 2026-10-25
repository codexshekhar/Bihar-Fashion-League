"use client";

import Link from "next/link";
import { Camera, Mail } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "BFL",
    items: [
      { name: "About", href: "/about" },
      { name: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Participate",
    items: [
      { name: "Register", href: "/register/model" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Partner",
    items: [
      { name: "Partner With BFL", href: "/partners" },
    ],
  },
  {
    title: "Legal",
    items: [
      { name: "Privacy Policy", href: "/legal/privacy" },
      { name: "Terms & Conditions", href: "/legal/terms" },
      { name: "Photo & Video Consent", href: "/legal/consent" },
    ],
  },
];

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/biharfashionleague", icon: <Camera className="h-4 w-4" /> },
  { name: "Email", href: "mailto:piyush@biharfashionleague.com", icon: <Mail className="h-4 w-4" /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-16 pb-10 bg-[#242424] text-white">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-12">
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="text-2xl font-bold tracking-tight block mb-6">
              BFL
            </Link>
            <p className="text-sm leading-relaxed text-white/70 max-w-sm mb-6">
              Bihar Fashion League showcases emerging fashion talent and runway participants across Bihar and beyond, creating opportunities in fashion, design, and creative careers.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <p>Email: piyush@biharfashionleague.com</p>
            </div>
            <div className="flex items-center gap-4 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-medium tracking-[0.28em] uppercase text-white/90 mb-5">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/60">
            &copy; {currentYear} Bihar Fashion League. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <Link href="/legal/consent" className="hover:text-white transition-colors">Photo &amp; Video Consent</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
