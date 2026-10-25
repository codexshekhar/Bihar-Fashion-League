"use client";

import Link from "next/link";
import { signOut } from "@/lib/auth/actions";
import { LogOut } from "lucide-react";
import { User } from "@supabase/supabase-js";

export function AdminHeader({ user }: { user: User }) {
  return (
    <header className="bg-white border-b border-[#E5E2DC] h-16 fixed w-full top-0 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center">
          <Link href="/admin" className="text-xl font-serif font-semibold text-[#171717]">
            BFL Admin
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#66645F] hidden sm:block">{user.email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-[#66645F] hover:text-[#171717] transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Sign Out</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
