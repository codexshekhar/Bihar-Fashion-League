"use client";
export const dynamic = "force-dynamic";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function AdminRegistrationsPage() {
  return (
    <section className="bg-white min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Registration Applications</h1>
            <p className="text-muted-foreground">Review and manage participant applications.</p>
          </div>
        </div>

        <div className="space-y-4">
          <ApplicationRow name="Aarav Sharma" category="Runway Model" status="pending" />
          <ApplicationRow name="Ishaan Verma" category="Showstopper" status="pending" />
          <ApplicationRow name="Priya Mehta" category="Designer" status="approved" />
        </div>
      </div>
    </section>
  );
}

function ApplicationRow({ name, category, status }: any) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-medium text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{category}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === "pending" ? "bg-yellow-100 text-yellow-700" : status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {status}
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">View</span>
          </Button>
          <Button size="sm" variant="outline" className="h-8 px-3">
            {status === "pending" ? "Review" : "View"}
          </Button>
        </div>
      </div>
    </div>
  );
}
