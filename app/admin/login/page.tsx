import Link from "next/link";
import { signIn } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, AlertTriangle } from "lucide-react";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Admin Login | Bihar Fashion League",
  description: "Administrator access to manage Bihar Fashion League content.",
};

export default function AdminLoginPage() {
  // Check for error in URL
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const error = searchParams?.get("error") || undefined;

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <section className="w-full max-w-md px-6 py-12 mx-auto">
        <div className="text-center mb-12">
          <span className="text-xl font-bold tracking-tighter text-primary">BFL Admin</span>
          <h2 className="text-3xl font-bold tracking-tight mt-4">Sign In</h2>
          <p className="text-muted-foreground mt-2">
            Administrator access to manage Bihar Fashion League content.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-destructive/50 bg-destructive/5 text-destructive flex items-center gap-3">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form
          action={signIn}
          className="space-y-6 bg-white p-8 rounded-2xl border border-border shadow-sm"
        >
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-muted-foreground mr-3" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@biharfashionleague.in"
                className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="flex items-center">
              <Lock className="h-4 w-4 text-muted-foreground mr-3" />
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl border border-input bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Demo credentials: admin@example.com / admin123
          </p>
        </form>
      </section>
    </main>
  );
}
