"use client";
export const dynamic = "force-dynamic";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Plus } from "lucide-react";

export default function AdminGalleryPage() {
  return (
    <section className="bg-white min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
            <p className="text-muted-foreground">Manage gallery images and categories.</p>
          </div>
          <Button className="px-4">
            <Plus className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <GalleryItemCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItemCard() {
  return (
    <div className="relative aspect-square rounded-xl border border-border overflow-hidden group">
      <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        Image
      </div>
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  );
}
