"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const GALLERY_FILES = [
  "BFL_2025_1.jpeg",
  "BFL_2025_2.jpeg",
  "BFL_2025_3.jpeg",
  "BFL_2025_4.jpeg",
  "BFL_2025_5.jpeg",
  "BFL_2025_6.jpeg",
  "BFL_2025_7.jpeg",
  "BFL_2025_8.jpeg",
  "BFL_2025_9.jpeg",
  "BFL_2025_10.jpeg",
  "BFL_2025_11.jpeg",
  "BFL_2025_12.jpeg",
  "BFL_2025_13.jpeg",
  "BFL_2025_14.jpeg",
  "BFL_2025_15.jpeg",
  "BFL_2025_16.jpeg",
  "BFL_2025_17.jpeg",
  "BFL_2025_18.jpeg",
  "BFL_2025_19.jpeg",
  "BFL_2025_20.jpeg",
  "BFL_2025_21.jpeg",
  "BFL_2025_22.jpeg",
  "BFL_2025_23.jpeg",
  "BFL_2025_24.jpeg",
  "BFL_2025_25.jpeg",
  "BFL_2025_26.jpeg",
  "BFL_2025_27.jpeg",
  "BFL_2025_28.jpeg",
  "BFL_2025_29.jpeg",
  "BFL_2025_30.jpeg",
  "BFL_2025_31.jpeg",
  "BFL_2025_32.jpeg",
  "BFL_2025_33.jpeg",
  "BFL_2025_34.jpeg",
  "BFL_2025_35.jpeg",
  "BFL_2025_36.jpeg",
  "BFL_2025_37.jpeg",
  "BFL_2025_38.jpeg",
  "BFL_2025_39.jpeg",
  "BFL_2025_40.jpeg",
  "IMG_0139.JPG",
  "IMG_4503.PNG",
  "IMG_5040 (1).JPG",
  "IMG_5348.JPG",
  "IMG_5349.JPG",
  "IMG_5350.PNG",
  "WhatsApp GIF 2026-10-27 at 16.41.22.gif",
  "WhatsApp Image 2026-10-27 at 16.50.05.jpeg",
  "WhatsApp Image 2026-10-27 at 16.50.08.jpeg",
];

const GALLERY_ITEMS = GALLERY_FILES.map((file, index) => ({
  id: `gallery-${index + 1}`,
  src: `/images/Gallery/${encodeURIComponent(file)}`,
  alt: `Bihar Fashion League gallery image ${index + 1}`,
}));

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
  };
  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <main className="relative bg-[#F8F7F0]">
      <Header />

      <section className="relative pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center">
            <div className="absolute inset-0">
              <img
                src="/images/BFL_2025_16.jpeg"
                alt="Bihar Fashion League gallery"
                className="h-full w-full object-cover object-[center_30%]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/55" />
            </div>
            <div className="relative z-10 px-6 sm:px-10 lg:px-16 max-w-3xl">
              <p className="text-xs tracking-[0.32em] uppercase text-white/80 mb-5">
                THE ARCHIVE
              </p>
              <h1 className="font-serif text-[clamp(2.8rem,7vw,5.2rem)] leading-[0.95] text-white mb-6">
                The BFL Gallery
              </h1>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
                Relive the runway moments, celebrate the talent, and explore the stories behind Bihar Fashion League.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {GALLERY_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => openLightbox(index)}
                className="mb-4 w-full break-inside-avoid overflow-hidden focus:outline-none focus:ring-1 focus:ring-[#171717]"
                aria-label={item.alt}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white focus:outline-none focus:ring-1 focus:ring-white/60"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white focus:outline-none focus:ring-1 focus:ring-white/60"
            aria-label="Previous"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white focus:outline-none focus:ring-1 focus:ring-white/60"
            aria-label="Next"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
          <div className="relative max-w-[95vw] max-h-[95vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={GALLERY_ITEMS[lightboxIndex].src}
              alt={GALLERY_ITEMS[lightboxIndex].alt}
              width={1600}
              height={2000}
              className="max-w-full max-h-full object-contain"
              priority
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
