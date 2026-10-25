"use client";
export const dynamic = "force-dynamic";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, MapPin } from "lucide-react";

export default function AdminEventsPage() {
  return (
    <section className="bg-white min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Events</h1>
            <p className="text-muted-foreground">Manage events and editions.</p>
          </div>
          <Button className="px-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCard
            title="Bihar Fashion Week 2024"
            date="Nov 15-17, 2024"
            venue="Muzaffarpur, Bihar"
            status="published"
            image=""
          />
          <EventCard
            title="Designer Showcase Spring 2024"
            date="Mar 10-12, 2024"
            venue="Muzaffarpur, Bihar"
            status="archived"
            image=""
          />
        </div>
      </div>
    </section>
  );
}

function EventCard({ title, date, venue, status, image }: any) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 hover:shadow-md transition-shadow">
      <div className="h-48 rounded-xl overflow-hidden mb-4 border border-border">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
            Event Image
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="space-y-2 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{venue}</span>
        </div>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
      }`}>
        {status}
      </span>
    </div>
  );
}
