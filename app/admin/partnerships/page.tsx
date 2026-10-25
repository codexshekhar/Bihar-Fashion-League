export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/auth/actions";
import { format } from "date-fns";

export default async function AdminPartnershipsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const admin = await isAdmin();
  if (!admin) redirect("/admin/login?error=Unauthorized");

  const supabase = await createClient();
  const { data: partnerships, error } = await supabase
    .from("partnership_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif text-[#171717]">Partnership Inquiries</h1>
        <p className="text-[#66645F] mt-1">Manage partnership and sponsorship inquiries</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          Error loading partnerships: {error.message}
        </div>
      )}

      <div className="bg-white rounded-lg border border-[#E5E2DC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F7F0] border-b border-[#E5E2DC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Interest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DC]">
              {partnerships?.map((p: any) => (
                <tr key={p.id} className="hover:bg-[#F8F7F0] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#171717]">{p.contact_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#66645F]">{p.organization || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#66645F]">{p.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#66645F]">{p.interest}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#66645F]">
                    {p.created_at ? format(new Date(p.created_at), "MMM dd, yyyy") : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!partnerships || partnerships.length === 0) && (
            <div className="text-center py-12 text-[#66645F]">
              No partnership inquiries found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
