"use client";
export const dynamic = "force-dynamic";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Shield, Plus } from "lucide-react";

export default function AdminSponsorsPage() {
  return (
    <section className="bg-white min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sponsors &amp; Partners</h1>
            <p className="text-muted-foreground">Manage sponsor profiles and tiers.</p>
          </div>
          <Button className="px-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Sponsor
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SponsorCard name="Example Sponsor (Dev)" tier="title" logo="" />
          <SponsorCard name="Brand Partner (Dev)" tier="event" logo="" />
          <SponsorCard name="Media Outlet (Dev)" tier="media" logo="" />
        </div>
      </div>
    </section>
  );
}

function SponsorCard({ name, tier, logo }: any) {
  const tierColors: Record<string, string> = {
    title: "bg-primary text-primary-foreground",
    event: "bg-secondary text-secondary-foreground",
    media: "bg-primary text-primary-foreground",
    collaborator: "bg-muted text-muted-foreground",
  };
  return (
    <div className="rounded-2xl border border-border bg-white p-6 hover:shadow-md transition-shadow">
      <div className="h-20 rounded-xl border border-border flex items-center justify-center mb-4 text-gray-400 text-sm">
        {logo ? <img src={logo} alt={name} className="h-full w-auto object-contain max-h-full" /> : "Logo"}
      </div>
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${tierColors[tier]}`}>
        {tier}
      </span>
    </div>
  );
}
