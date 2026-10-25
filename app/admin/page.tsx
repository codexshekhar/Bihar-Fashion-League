export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/auth/actions";
import Link from "next/link";
import { Users, Mail, Handshake, Clock } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const admin = await isAdmin();
  if (!admin) redirect("/admin/login?error=Unauthorized");

  const supabase = await createClient();

  const [appsRes, enquiriesRes, partnershipsRes] = await Promise.all([
    supabase.from("model_applications").select("*", { count: "exact" }),
    supabase.from("contact_inquiries").select("*", { count: "exact" }),
    supabase.from("partnership_inquiries").select("*", { count: "exact" }),
  ]);

  const totalApps = appsRes.count || 0;
  const totalEnquiries = enquiriesRes.count || 0;
  const totalPartnerships = partnershipsRes.count || 0;

  const recentApps = appsRes.data?.slice(0, 5) || [];
  const recentEnquiries = enquiriesRes.data?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif text-[#171717]">Dashboard</h1>
        <p className="text-[#66645F] mt-1">Overview of BFL applications and enquiries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-[#E5E2DC]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#66645F]">Total Applications</p>
              <p className="text-2xl font-semibold text-[#171717] mt-1">{totalApps}</p>
            </div>
            <Users className="h-8 w-8 text-[#66645F]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E5E2DC]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#66645F]">Contact Enquiries</p>
              <p className="text-2xl font-semibold text-[#171717] mt-1">{totalEnquiries}</p>
            </div>
            <Mail className="h-8 w-8 text-[#66645F]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E5E2DC]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#66645F]">Partnership Inquiries</p>
              <p className="text-2xl font-semibold text-[#171717] mt-1">{totalPartnerships}</p>
            </div>
            <Handshake className="h-8 w-8 text-[#66645F]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-[#E5E2DC]">
          <div className="p-6 border-b border-[#E5E2DC] flex items-center justify-between">
            <h2 className="text-lg font-medium text-[#171717]">Recent Applications</h2>
            <Link href="/admin/models" className="text-sm text-[#171717] hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-[#E5E2DC]">
            {recentApps.length > 0 ? (
              recentApps.map((app: any) => (
                <div key={app.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#171717]">{app.full_name}</p>
                    <p className="text-sm text-[#66645F]">{app.application_number}</p>
                  </div>
                  <Link href={`/admin/models/${app.id}`} className="text-sm text-[#171717] hover:underline">
                    View
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-[#66645F]">No applications yet</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E2DC]">
          <div className="p-6 border-b border-[#E5E2DC] flex items-center justify-between">
            <h2 className="text-lg font-medium text-[#171717]">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm text-[#171717] hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-[#E5E2DC]">
            {recentEnquiries.length > 0 ? (
              recentEnquiries.map((enq: any) => (
                <div key={enq.id} className="p-4">
                  <p className="font-medium text-[#171717]">{enq.name}</p>
                  <p className="text-sm text-[#66645F] truncate">{enq.message}</p>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-[#66645F]">No enquiries yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
