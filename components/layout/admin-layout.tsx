"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, LogOut, Shield, Users, Calendar, Image, FileText, Mail, Settings, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const ADMIN_NAV = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Participants", href: "/admin/participants", icon: Users },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Sponsors", href: "/admin/sponsors", icon: Shield },
  { name: "Gallery", href: "/admin/gallery", icon: Image },
  { name: "News", href: "/admin/news", icon: FileText },
  { name: "Inquiries", href: "/admin/inquiries", icon: Mail },
  { name: "Registrations", href: "/admin/registrations", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border bg-white sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/admin" className="text-xl font-bold tracking-tighter text-primary">
            BFL Admin
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">View Website</Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={() => { localStorage.removeItem("bfl_admin_token"); window.location.href = "/admin/login"; }}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`
            hidden md:flex w-64 flex-col border-r border-border bg-white
            ${isOpen ? "block" : "hidden"}
          `}
        >
          <nav className="space-y-1 p-4">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1">
          <div className="md:hidden px-4 py-4">
<button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted-foreground hover:text-primary"
              aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
          <main className="p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
