import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section, SectionHeader } from "@/components/ui/section";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PHOTO_MAPPING_MANIFEST } from "@/lib/photo-mapping";

export const metadata = {
  title: "Gallery | Bihar Fashion League",
  description: "Runway photography, model portraits, backstage moments, and event highlights from Bihar Fashion League.",
};

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  edition: string;
  width: number;
  height: number;
  approved: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = PHOTO_MAPPING_MANIFEST.map((p) => ({
  id: p.imageId,
  src: p.filePath,
  alt: p.altText,
  category: p.aspectRatio === "2:3" ? "Portraits" : "Runway",
  edition: "BFL 2025",
  width: p.width,
  height: p.height,
  approved: p.publicationApproved,
}));

export default function GalleryPage() {
  return (
    <main className="relative bg-white">
      <Header />
      
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/images/BFL_2025_16.jpeg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-40 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Gallery</h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
            Runway moments, portraits, backstage, and event highlights from Bihar Fashion League.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-12">
            <SectionHeader title="Visual Gallery" description="Curated imagery from Bihar Fashion League events." />
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-gray-50">All</button>
              <button className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-gray-50">Runway</button>
              <button className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-gray-50">Portraits</button>
              <button className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-gray-50">Backstage</button>
              <button className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-gray-50">Event Highlights</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              {GALLERY_ITEMS.filter((i) => i.approved).length} of {GALLERY_ITEMS.length} images approved for publication.
              Unverified images are shown with neutral descriptions only.
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-white group">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className={`object-cover group-hover:scale-105 transition-transform duration-700 ${item.approved ? "opacity-100" : "opacity-60 grayscale"}`}
        loading="lazy"
        priority={item.approved}
      />
      {!item.approved && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-xs font-medium uppercase tracking-wider opacity-80">
              Pending Review
            </span>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-xs font-medium text-white uppercase tracking-wider">
          {item.category}
        </span>
        <span className="text-xs text-white/70 block mt-1">{item.edition}</span>
      </div>
    </div>
  );
}
