"use client";

import { useState, useTransition } from "react";
import { signIn } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, AlertTriangle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function AdminLoginClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const urlError = searchParams?.get("error") || undefined;
  const redirectTo = searchParams?.get("redirectTo") || undefined;

  const displayError = error || urlError;

  async function handleSubmit(formData: FormData) {
    setError(undefined);
    startTransition(async () => {
      try {
        await signIn(formData);
      } catch (e: any) {
        // Next.js redirects throw errors - let them propagate for redirects
        if (e?.digest?.startsWith('NEXT_REDIRECT')) {
          throw e;
        }
        setError(e?.message || "An unexpected error occurred. Please try again.");
      }
    });
  }

  return (
    <main className="min-h-screen bg-[#F8F7F0] flex items-center justify-center">
      <section className="w-full max-w-md px-6 py-12 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-serif font-semibold text-[#171717]">BFL Admin</h1>
          <h2 className="text-3xl font-serif tracking-tight mt-4 text-[#171717]">Sign In</h2>
          <p className="text-[#66645F] mt-2">
            Administrator access to manage Bihar Fashion League
          </p>
        </div>

        {displayError && (
          <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 flex items-center gap-3">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{displayError}</span>
          </div>
        )}

        <form action={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg border border-[#E5E2DC] shadow-sm">
          {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[#171717]">
              Email
            </label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#66645F]" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                disabled={isPending}
                placeholder="admin@example.com"
                className="flex-1"
                autoComplete="email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-[#171717]">
              Password
            </label>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#66645F]" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                disabled={isPending}
                placeholder="••••••••"
                className="flex-1"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-[#66645F] hover:text-[#171717]"
                aria-label="Toggle password visibility"
                disabled={isPending}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full h-11 bg-[#171717] text-white hover:bg-[#171717]/90"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </section>
    </main>
  );
}
