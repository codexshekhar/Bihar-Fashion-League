import { Suspense } from "react";
import AdminLoginClient from "./login-client";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F8F7F0] flex items-center justify-center" />}>
      <AdminLoginClient />
    </Suspense>
  );
}
