"use client";
export const dynamic = "force-dynamic";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Mail, Shield } from "lucide-react";

export default function AdminInquiriesPage() {
  return (
    <section className="bg-white min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
            <p className="text-muted-foreground">Manage contact and partnership inquiries.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InquiryCard
            title="Contact Inquiries"
            icon={<Mail className="h-5 w-5" />}
            count="3"
            recent="fabric-house@example.com"
          />
          <InquiryCard
            title="Partnership Inquiries"
            icon={<Shield className="h-5 w-5" />}
            count="2"
            recent="lens-studio@example.com"
          />
        </div>
      </div>
    </section>
  );
}

function InquiryCard({ title, icon, count, recent }: any) {
  return (
    <div className="rounded-2xl border border-border bg-white p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gray-100 text-muted-foreground">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="text-3xl font-bold mb-2">{count}</div>
      <p className="text-sm text-muted-foreground">Latest: {recent}</p>
    </div>
  );
}
