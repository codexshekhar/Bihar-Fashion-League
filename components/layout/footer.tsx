"use client";

import Link from "next/link";
import { Camera, Mail } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "BFL",
    items: [
      { name: "About", href: "/about" },
      { name: "Events", href: "/events" },
      { name: "Gallery", href: "/gallery" },
      { name: "News", href: "/news" },
    ],
  },
  {
    title: "Participate",
    items: [
      { name: "Register", href: "/register" },
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
  { name: "Instagram", href: "https://www.instagram.com/biharfashionleague", icon: <Camera className="h-5 w-5" /> },
  { name: "Email", href: "mailto:piyush@biharfashionleague.com", icon: <Mail className="h-5 w-5" /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-32 pb-20 border-t border-black/10 bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-20">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 text-4xl font-bold tracking-tighter text-primary block mb-10"
            >
              <span className="relative">
                <span className="absolute -inset-px block bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                BFL
              </span>
            </Link>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
              Bihar Fashion League showcases emerging fashion talent and runway participants across Bihar and beyond.
            </p>
          </div>
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-bold tracking-widest uppercase text-primary mb-8">
                {group.title}
              </h3>
              <ul className="space-y-6">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-lg text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-black/10 pt-20 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Bihar Fashion League. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
