import { redirect } from "next/navigation";
import { getSession, getCurrentUser, isAdmin } from "@/lib/auth/actions";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
