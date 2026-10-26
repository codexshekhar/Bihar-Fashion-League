import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSession, getCurrentUser, isAdmin } from "@/lib/auth/actions";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
  
  // Allow access to login page without auth checks
  if (pathname.includes("/admin/login") || pathname.endsWith("/login")) {
    return <>{children}</>;
  }

  const session = await getSession();
  const user = await getCurrentUser();

  if (!session || !user) {
    redirect("/admin/login");
  }

  const admin = await isAdmin();
  if (!admin) {
    redirect("/admin/login?error=Unauthorized");
  }

  return (
    <div className="min-h-screen bg-[#F8F7F0]">
      <AdminHeader user={user} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 ml-0 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}
