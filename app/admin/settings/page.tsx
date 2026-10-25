"use client";
export const dynamic = "force-dynamic";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/label";
import { Image as ImageIcon, Mail, Phone, MapPin, Share2, X } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <section className="bg-white min-h-screen py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Site Settings</h1>

        <form className="space-y-8 bg-white p-8 rounded-2xl border border-border">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Site Name</label>
              <Input defaultValue="Bihar Fashion League" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Site Description</label>
              <Input defaultValue="The next generation of fashion starts here." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Hero Headline</label>
              <Input defaultValue="THE NEXT GENERATION OF FASHION STARTS HERE." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Hero Subheading</label>
              <Textarea defaultValue="Discover emerging talent, runway moments, and the people shaping the future of fashion with Bihar Fashion League." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Contact Email</label>
              <Input type="email" defaultValue="contact@biharfashionleague.in" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Registration Open</label>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                <label className="text-sm text-muted-foreground">Allow public registration applications</label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Social Links</h3>
            <div className="space-y-3">
              <SocialRow label="Instagram" placeholder="https://instagram.com/biharfashionleague" icon={<Share2 className="h-4 w-4" />} />
              <SocialRow label="LinkedIn" placeholder="https://linkedin.com/company/biharfashionleague" icon={<Share2 className="h-4 w-4" />} />
              <SocialRow label="Twitter" placeholder="https://twitter.com/biharfashionleague" icon={<X className="h-4 w-4" />} />
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <Button type="submit" className="w-full">
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function SocialRow({ label, placeholder, icon }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-1.5 rounded-lg bg-gray-100 text-muted-foreground">{icon}</div>
      <label className="text-sm font-medium text-foreground w-20">{label}</label>
      <Input placeholder={placeholder} />
    </div>
  );
}
