"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PHOTO_MAPPING_MANIFEST, getPendingReviewPhotos } from "@/lib/photo-mapping";
import { SectionHeader } from "@/components/ui/section";

interface ParticipantCardProps {
  photo: typeof PHOTO_MAPPING_MANIFEST[number];
}

function ParticipantCard({ photo }: ParticipantCardProps) {
  const isPortrait = photo.aspectRatio === "2:3";
  return (
    <Link
      href="/admin/photos"
      className="group block"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border bg-white group hover:border-primary/50 transition-colors">
        <div className={`relative overflow-hidden mb-4 ${isPortrait ? "h-[520px]" : "h-64"}`}>
          <img
            src={photo.filePath}
            alt={photo.altText}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="outline" className="text-[10px] bg-white/90 border-transparent">
              {photo.originalFilename}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 z-10">
            <Badge variant={photo.publicationApproved ? "default" : "outline"} className="text-[10px]">
              {photo.publicationApproved ? "Approved" : "Pending Review"}
            </Badge>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
              {photo.role}
            </Badge>
            <span className="text-[10px] text-muted-foreground">
              {photo.width}×{photo.height}
            </span>
          </div>
          {photo.displayName ? (
            <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors font-serif">
              {photo.displayName}
            </h3>
          ) : (
            <h3 className="text-lg font-medium text-muted-foreground font-serif">
              Unverified Participant
            </h3>
          )}
          {photo.eventName && (
            <p className="text-sm text-muted-foreground">{photo.eventName}</p>
          )}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-primary font-medium">Review mapping →</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ParticipantsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "portrait" | "landscape">("all");

  const filtered = PHOTO_MAPPING_MANIFEST.filter((photo) => {
    if (filterStatus === "portrait" && photo.aspectRatio !== "2:3") return false;
    if (filterStatus === "landscape" && photo.aspectRatio !== "3:2") return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        photo.originalFilename.toLowerCase().includes(term) ||
        (photo.displayName && photo.displayName.toLowerCase().includes(term)) ||
        (photo.eventName && photo.eventName.toLowerCase().includes(term))
      );
    }
    return true;
  });

  const pendingPhotos = getPendingReviewPhotos();

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-end lg:items-start gap-6 mb-12">
          <div>
            <SectionHeader
              title="Participant Portraits"
              description="Portrait photography available for verification and profile mapping."
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by filename..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative w-64">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-sm"
              >
                <option value="all">All Orientations</option>
                <option value="portrait">Portrait (2:3)</option>
                <option value="landscape">Landscape (3:2)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo) => (
            <ParticipantCard key={photo.imageId} photo={photo} />
          ))}
        </div>

        <div className="mt-12 bg-gray-50 p-8 rounded-2xl border border-border">
          <h3 className="text-lg font-bold mb-4">Photo Verification Workflow</h3>
          <p className="text-sm text-muted-foreground mb-6">
            All {PHOTO_MAPPING_MANIFEST.length} official BFL photographs are currently pending identity verification.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-4 bg-white rounded-xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Total Images</p>
              <p className="text-xl font-bold">{PHOTO_MAPPING_MANIFEST.length}</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Pending Review</p>
              <p className="text-xl font-bold text-yellow-600">{pendingPhotos.length}</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Approved for Publication</p>
              <p className="text-xl font-bold text-green-600">0</p>
            </div>
          </div>
          <div className="mt-6">
            <Button asChild size="sm">
              <Link href="/admin/photos">
                Review Photo Mappings <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
