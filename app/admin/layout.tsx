"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const ADMIN_NAV = [
  { name: "Dashboard", href: "/admin", icon: "Shield" },
  { name: "Participants", href: "/admin/participants", icon: "Users" },
  { name: "Events", href: "/admin/events", icon: "Calendar" },
  { name: "Gallery", href: "/admin/gallery", icon: "Image" },
  { name: "News", href: "/admin/news", icon: "FileText" },
  { name: "Inquiries", href: "/admin/inquiries", icon: "Mail" },
  { name: "Registrations", href: "/admin/registrations", icon: "User" },
  { name: "Settings", href: "/admin/settings", icon: "Settings" },
  { name: "Photo Mapping", href: "/admin/photos", icon: "Image" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border bg-white sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/admin" className="text-xl font-bold tracking-tighter text-primary">
            BFL Admin
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild size="sm">
              <Link href="/">View Website</Link>
            </Button>
            <button
              onClick={async () => {
                await fetch("/api/auth/signout", { method: "POST" });
                window.location.href = "/login";
              }}
              className="px-6 py-3 text-sm font-medium text-primary hover:bg-primary/5 rounded-full transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-white">
          <nav className="space-y-1 p-4">
            {ADMIN_NAV.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-muted-foreground hover:bg-gray-50 hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1">
          <main className="p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

function getIcon(name: string) {
  const icons: Record<string, any> = {
    Shield: (props: any) => <span {...props}>S</span>,
    Users: (props: any) => <span {...props}>U</span>,
    Calendar: (props: any) => <span {...props}>C</span>,
    Image: (props: any) => <span {...props}>I</span>,
    FileText: (props: any) => <span {...props}>F</span>,
    Mail: (props: any) => <span {...props}>M</span>,
    User: (props: any) => <span {...props}>R</span>,
    Settings: (props: any) => <span {...props}>G</span>,
  };
  return icons[name] || ((props: any) => <span {...props}>S</span>);
}
