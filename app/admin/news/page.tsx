"use client";
export const dynamic = "force-dynamic";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

export default function AdminNewsPage() {
  return (
    <section className="bg-white min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">News &amp; Articles</h1>
            <p className="text-muted-foreground">Manage news articles and press releases.</p>
          </div>
          <Button className="px-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Article
          </Button>
        </div>

        <div className="space-y-4">
          <ArticleRow
            title="Bihar Fashion Week 2024 Designer Lineup"
            category="Announcement"
            status="published"
            date="Oct 20, 2024"
          />
          <ArticleRow
            title="Behind the Scenes: Model Castings"
            category="Feature"
            status="published"
            date="Oct 15, 2024"
          />
          <ArticleRow
            title="Draft Article Example"
            category="Press"
            status="draft"
            date="Oct 10, 2024"
          />
        </div>
      </div>
    </section>
  );
}

function ArticleRow({ title, category, status, date }: any) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {category} · {date}
        </p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
      }`}>
        {status}
      </span>
      <div className="flex items-center gap-2 ml-4">
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <FileText className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
