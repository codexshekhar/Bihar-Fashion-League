export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/auth/actions";
import Link from "next/link";

export default async function AdminModelsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const admin = await isAdmin();
  if (!admin) redirect("/admin/login?error=Unauthorized");

  const supabase = await createClient();
  const { data: applications, error } = await supabase
    .from("model_applications")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif text-[#171717]">Model Applications</h1>
        <p className="text-[#66645F] mt-1">Manage and review model registration applications</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          Error loading applications: {error.message}
        </div>
      )}

      <div className="bg-white rounded-lg border border-[#E5E2DC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F7F0] border-b border-[#E5E2DC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">App No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#66645F] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DC]">
              {applications?.map((app: any) => (
                <tr key={app.id} className="hover:bg-[#F8F7F0] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#171717]">{app.application_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#171717]">{app.full_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#66645F] capitalize">{app.category === "kids" ? "Kids" : "Other"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#66645F]">{app.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#66645F]">{app.contact_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      {app.application_status || "submitted"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#66645F]">
                    {app.created_at ? new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link href={`/admin/models/${app.id}`} className="text-[#171717] hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!applications || applications.length === 0) && (
            <div className="text-center py-12 text-[#66645F]">
              No applications found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
