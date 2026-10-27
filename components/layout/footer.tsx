"use client";

import Link from "next/link";
import { Camera, Mail, ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "EXPLORE",
    items: [
      { name: "About", href: "/about" },
      { name: "Gallery", href: "/gallery" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "GET INVOLVED",
    items: [
      { name: "Register", href: "https://forms.gle/GxQmh5UVjoWSktYz6", target: "_blank" },
      { name: "Partner With BFL", href: "/partners" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "LEGAL",
    items: [
      { name: "Privacy Policy", href: "/legal/privacy" },
      { name: "Terms & Conditions", href: "/legal/terms" },
      { name: "Photo & Video Consent", href: "/legal/consent" },
    ],
  },
];

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/biharfashionleague", icon: <Camera className="h-4 w-4" /> },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/biharfashionleague/", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M19 0h-14C9.471 0 8 1.472 8 3.018v18H6V10h2V7.391C8 5.564 9.562 4 11.534 4c1.966 0 2.363 1.557 2.363 2.39v2.61h3V10h3v8h2V3.018C22 1.472 20.528 0 19 0z"/>
      <path d="M7 16c0-.552-.447-1-1-1s-1 .448-1 1c0 .552.447 1 1 1s1-.448 1-1m11 0c0-.552-.447-1-1-1s-1 .448-1 1c0 .552.447 1 1 1s1-.448 1-1m-10-9h-2v2h2v-2zm-4-2h2v2h-2V5z"/>
    </svg>
  ) },
  { name: "Email", href: "mailto:piyush@biharfashionleague.com", icon: <Mail className="h-4 w-4" /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#111111] text-white">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-14 lg:py-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-6" aria-label="Bihar Fashion League home">
              <img
                src="/images/BFl-logo/bfl-logo-white.png"
                alt="Bihar Fashion League official logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-[#B5B5B5] max-w-sm mb-6">
              Bihar Fashion League showcases emerging fashion talent and runway participants across Bihar and beyond, creating opportunities in fashion, design, and creative careers.
            </p>
            <div className="space-y-2 text-sm text-[#B5B5B5] mb-6">
              <a href="mailto:piyush@biharfashionleague.com" className="hover:text-white transition-colors">
                piyush@biharfashionleague.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 flex items-center justify-center border border-white/10 text-[#B5B5B5] hover:text-white hover:border-white/30 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-medium tracking-[0.28em] uppercase text-white mb-6">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={item.target}
                      rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                      className="text-sm text-[#B5B5B5] hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#B5B5B5] text-center md:text-left">
            &copy; {currentYear} Bihar Fashion League. All rights reserved.
          </p>
          <a
            href="https://www.astracodex.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 hover:text-white transition-colors"
          >
            <span className="text-xs text-[#B5B5B5] group-hover:text-white transition-colors">
              Designed &amp; Developed by
            </span>
            <img
              src="/images/astracodex_white_Logo.png"
              alt="AstraCodex Technologies logo"
              className="h-8 w-auto object-contain"
            />
            <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>
      </div>
    </footer>
  );
}
