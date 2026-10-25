"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Trash2, Edit2, Eye, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminParticipantsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [participants, setParticipants] = useState([
    { id: "1", name: "Aarav Sharma", title: "Runway Model", category: "Runway Models", status: "published", image: "" },
    { id: "2", name: "Ishaan Verma", title: "Showstopper", category: "Showstoppers", status: "published", image: "" },
    { id: "3", name: "Priya Mehta", title: "Featured Talent", category: "Designer Showcases", status: "draft", image: "" },
  ]);

  const filtered = participants.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="bg-white min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Participants</h1>
            <p className="text-muted-foreground">Manage participant profiles and visibility.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setIsDialogOpen(true)} className="px-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Participant
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search participants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative w-64">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-sm font-medium text-muted-foreground">
                <th className="pb-4">Profile</th>
                <th className="pb-4">Name</th>
                <th className="pb-4">Title</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border hover:bg-gray-50/50 transition-colors">
                  <td className="py-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 overflow-hidden">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">?</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 font-medium text-foreground">{p.name}</td>
                  <td className="py-4 text-muted-foreground">{p.title}</td>
                  <td className="py-4 text-muted-foreground">{p.category}</td>
                  <td className="py-4">
                    <Badge variant={p.status === "published" ? "default" : "outline"}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-right">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => {}}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => {}}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => {}}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
