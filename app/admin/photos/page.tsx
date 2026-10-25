"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Check, Edit2, Image, Flag, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PhotoRole =
  | "Official Participant"
  | "Runway Model"
  | "Showstopper"
  | "Featured Model"
  | "Event Highlight"
  | "Backstage"
  | "Fashion Editorial"
  | "Unassigned";

type VerificationStatus = "needs_review" | "pending_admin" | "verified" | "rejected";

interface PhotoMapping {
  imageId: string;
  originalFilename: string;
  filePath: string;
  format: string;
  width: number;
  height: number;
  aspectRatio: string;
  fileSizeBytes: number;
  displayName: string | null;
  role: PhotoRole;
  eventName: string | null;
  altText: string;
  caption: string | null;
  verificationStatus: VerificationStatus;
  publicationApproved: boolean;
  reviewedBy: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

const ROLE_OPTIONS: PhotoRole[] = [
  "Official Participant",
  "Runway Model",
  "Showstopper",
  "Featured Model",
  "Event Highlight",
  "Backstage",
  "Fashion Editorial",
  "Unassigned",
];

const STATUS_OPTIONS: VerificationStatus[] = [
  "needs_review",
  "pending_admin",
  "verified",
  "rejected",
];

export default function PhotoContactSheetPage() {
  const [photos, setPhotos] = useState<PhotoMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PhotoMapping | null>(null);
  const [filterStatus, setFilterStatus] = useState<VerificationStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    try {
      const res = await fetch("/api/photos/list");
      const data = await res.json();
      setPhotos(data.photos || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function updatePhoto(id: string, updates: Partial<PhotoMapping>) {
    try {
      const res = await fetch("/api/photos/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId: id, updates }),
      });
      if (res.ok) {
        const data = await res.json();
        setPhotos((prev) => prev.map((p) => (p.imageId === id ? data.mapping : p)));
        setEditing(null);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const filtered = photos.filter((p) => {
    if (filterStatus !== "all" && p.verificationStatus !== filterStatus) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        p.originalFilename.toLowerCase().includes(term) ||
        (p.displayName && p.displayName.toLowerCase().includes(term)) ||
        (p.eventName && p.eventName.toLowerCase().includes(term))
      );
    }
    return true;
  });

  const statusConfig: Record<VerificationStatus, { label: string; color: string }> = {
    needs_review: { label: "Needs Review", color: "bg-yellow-100 text-yellow-800" },
    pending_admin: { label: "Pending Admin", color: "bg-blue-100 text-blue-800" },
    verified: { label: "Verified", color: "bg-green-100 text-green-800" },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
  };

  if (loading) {
    return (
      <main className="bg-white min-h-screen py-20">
        <Header />
        <div className="mx-auto max-w-7xl px-4 flex justify-center">
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading photo contact sheet...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative bg-white min-h-screen">
      <Header />

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end lg:items-start gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">Photo Contact Sheet</h1>
              <p className="text-muted-foreground">
                Review and map all {photos.length} official BFL photographs. Unverified images
                are excluded from public publication.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-64">
                <Input
                  placeholder="Search filename, name, or event..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 rounded-xl border border-input bg-background text-sm"
              >
                <option value="all">All Statuses</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {MODAL_STATUS_CONFIG[s].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-muted-foreground">No photos match the current filters.</p>
              </div>
            ) : (
              filtered.map((photo) => (
                <PhotoCard
                  key={photo.imageId}
                  photo={photo}
                  onEdit={setEditing}
                  onUpdate={updatePhoto}
                  statusConfig={statusConfig}
                />
              ))
            )}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {photos.filter((p) => p.verificationStatus === "verified" && p.publicationApproved).length} of {photos.length} images approved for publication
            </div>
          </div>
        </div>
      </Section>

      {editing && (
        <PhotoEditModal
          photo={editing}
          onClose={() => setEditing(null)}
          onUpdate={(id, updates) => updatePhoto(id, updates)}
        />
      )}

      <Footer />
    </main>
  );
}

interface PhotoCardProps {
  photo: PhotoMapping;
  onEdit: (photo: PhotoMapping) => void;
  onUpdate: (id: string, updates: Partial<PhotoMapping>) => void;
  statusConfig: Record<VerificationStatus, { label: string; color: string }>;
}

function PhotoCard({
  photo,
  onEdit,
  onUpdate,
  statusConfig,
}: PhotoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="border border-border group hover:border-primary/50 transition-colors cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onEdit(photo)}
    >
      <CardHeader className="p-4 pb-2">
        <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-gray-100 mb-3">
          <img
            src={photo.filePath}
            alt={photo.altText}
            className="h-full w-full object-cover object-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="text-[10px] bg-white/90 border-transparent">
              {photo.originalFilename}
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge variant="outline" className="text-[10px] bg-white/90 border-transparent">
              {photo.width}×{photo.height}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-medium text-muted-foreground truncate" title={photo.originalFilename}>
            {photo.originalFilename}
          </span>
          <Badge variant={photo.publicationApproved ? "default" : "outline"} className="text-[10px]">
            {photo.publicationApproved ? "Approved" : "Private"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-1">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-[10px]">
            {photo.role}
          </Badge>
          <Badge
            variant={photo.verificationStatus === "verified" ? "default" : photo.verificationStatus === "rejected" ? "destructive" : "outline"}
            className="text-[10px]"
          >
            {MODAL_STATUS_CONFIG[photo.verificationStatus].label}
          </Badge>
        </div>
        {photo.displayName && (
          <p className="text-[11px] font-medium text-foreground truncate" title={photo.displayName}>
            {photo.displayName}
          </p>
        )}
        {photo.eventName && (
          <p className="text-[10px] text-muted-foreground truncate" title={photo.eventName}>
            {photo.eventName}
          </p>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Edit2 className="h-5 w-5 text-white" />
        </div>
      </CardContent>
    </Card>
  );
}

interface PhotoEditModalProps {
  photo: PhotoMapping;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<PhotoMapping>) => void;
}

const MODAL_STATUS_CONFIG: Record<VerificationStatus, { label: string; color: string }> = {
  needs_review: { label: "Needs Review", color: "bg-yellow-100 text-yellow-800" },
  pending_admin: { label: "Pending Admin", color: "bg-blue-100 text-blue-800" },
  verified: { label: "Verified", color: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
};

function PhotoEditModal({
  photo,
  onClose,
  onUpdate,
}: PhotoEditModalProps) {
  const [formData, setFormData] = useState({
    displayName: photo.displayName || "",
    role: photo.role,
    eventName: photo.eventName || "",
    altText: photo.altText,
    caption: photo.caption || "",
    verificationStatus: photo.verificationStatus,
    publicationApproved: photo.publicationApproved,
    notes: photo.notes || "",
  });

  async function handleSave() {
    const updates: Partial<PhotoMapping> = {
      displayName: formData.displayName || null,
      role: formData.role,
      eventName: formData.eventName || null,
      altText: formData.altText,
      caption: formData.caption || null,
      verificationStatus: formData.verificationStatus,
      publicationApproved: formData.publicationApproved,
      notes: formData.notes || null,
    };
    await onUpdate(photo.imageId, updates);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle>Edit Photo Mapping</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-gray-100">
              <img
                src={photo.filePath}
                alt={photo.altText}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Original Filename
                </label>
                <p className="text-sm text-muted-foreground break-all">{photo.originalFilename}</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Dimensions / Size
                </label>
                <p className="text-sm text-muted-foreground">
                  {photo.width} × {photo.height} • {(photo.fileSizeBytes / 1024).toFixed(1)} KB
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Current Status
                </label>
                <Badge
                  variant={photo.verificationStatus === "verified" ? "default" : photo.verificationStatus === "rejected" ? "destructive" : "outline"}
                >
                  {MODAL_STATUS_CONFIG[photo.verificationStatus].label}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Display Name
              </label>
              <Input
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                placeholder="Leave blank if not a named person"
              />
              <p className="text-[10px] text-muted-foreground">
                Only enter a verified name. Leave blank for unassigned/event images.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as PhotoRole })}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-sm"
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Event Name
              </label>
              <Input
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                placeholder="e.g. Bihar Fashion Week 2024"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Alt Text
              </label>
              <Input
                value={formData.altText}
                onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                placeholder="Descriptive alt text"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Caption
              </label>
              <Input
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                placeholder="Optional caption"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Verification Status
              </label>
              <select
                value={formData.verificationStatus}
                onChange={(e) => setFormData({ ...formData, verificationStatus: e.target.value as VerificationStatus })}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-sm"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {MODAL_STATUS_CONFIG[s].label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.publicationApproved}
                onChange={(e) => setFormData({ ...formData, publicationApproved: e.target.checked })}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label className="text-sm text-muted-foreground">
                Approve for publication
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Admin Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded-xl border border-input bg-background text-sm"
                placeholder="Internal notes..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save Mapping <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
