export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/auth/actions";

export default async function AdminEnquiriesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const admin = await isAdmin();
  if (!admin) redirect("/admin/login?error=Unauthorized");

  const supabase = await createClient();
  const { data: enquiries, error } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif text-[#171717]">Contact Enquiries</h1>
        <p className="text-[#66645F] mt-1">Manage contact form submissions</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          Error loading enquiries: {error.message}
        </div>
      )}

      <div className="bg-white rounded-lg border border-[#E5E2DC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F7F0] border-b border-[#E5E2DC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#66645F] uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DC]">
              {enquiries?.map((enq: any) => (
                <tr key={enq.id} className="hover:bg-[#F8F7F0] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#171717]">{enq.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#66645F]">{enq.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#66645F]">{enq.subject || "-"}</td>
                  <td className="px-6 py-4 text-sm text-[#66645F] max-w-xs truncate">{enq.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#66645F]">
                    {enq.created_at ? new Date(enq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!enquiries || enquiries.length === 0) && (
            <div className="text-center py-12 text-[#66645F]">
              No enquiries found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
