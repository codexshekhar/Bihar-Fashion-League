"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { PHOTO_MAPPING_MANIFEST } from "@/lib/photo-mapping";

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

const GALLERY_ITEMS: GalleryItem[] = PHOTO_MAPPING_MANIFEST.filter((p) => p.publicationApproved).map((p) => ({
  id: p.imageId,
  src: p.filePath,
  alt: p.altText,
  category: p.aspectRatio === "2:3" ? "Portraits" : p.aspectRatio === "16:9" || p.aspectRatio === "4:3" ? "Event Highlights" : "Runway",
  edition: "BFL 2025",
  width: p.width,
  height: p.height,
  approved: true,
}));

const CATEGORIES = ["All", "Runway", "Portraits", "Backstage", "Event Highlights"];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      element.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function GalleryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useReveal();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const el = heroRef.current;
    if (!el) return;
    el.classList.add("hero-revealed");
  }, []);

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

  const filteredItems = activeCategory === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  const approvedCount = GALLERY_ITEMS.length;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };
  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
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
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 700ms ease, transform 700ms ease;
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-fade {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 900ms ease, transform 900ms ease;
        }
        .hero-revealed .hero-fade {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-revealed .hero-fade-delay-1 {
          transition-delay: 120ms;
        }
        .hero-revealed .hero-fade-delay-2 {
          transition-delay: 220ms;
        }
        .tile-reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 650ms ease, transform 650ms ease;
        }
        .reveal-visible .tile-reveal {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .hero-fade,
          .tile-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
      <Header />

      <section className="relative pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="relative overflow-hidden min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center">
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
              <p className="hero-fade text-xs tracking-[0.32em] uppercase text-white/80 mb-5">
                BIHAR FASHION LEAGUE · THE ARCHIVE
              </p>
              <h1 className="hero-fade hero-fade-delay-1 font-serif text-[clamp(2.8rem,7vw,5.2rem)] leading-[0.95] text-white mb-6">
                Moments That Define the Runway
              </h1>
              <p className="hero-fade hero-fade-delay-2 text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
                Explore the people, performances, and behind-the-scenes moments that bring Bihar Fashion League to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 lg:mb-12">
            <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-4">THE VISUAL ARCHIVE</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] mb-4">Visual Gallery</h2>
            <p className="text-base text-[#66645F] max-w-2xl">
              A curated collection of moments from Bihar Fashion League events.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm transition-colors border ${
                  activeCategory === category
                    ? "bg-[#171717] text-white border-[#171717]"
                    : "bg-transparent text-[#66645F] border-[#E5E2DC] hover:text-[#171717] hover:border-[#171717]/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16 border-t border-[#E5E2DC]">
              <h3 className="font-serif text-2xl text-[#171717] mb-2">New Moments Coming Soon</h3>
              <p className="text-base text-[#66645F]">We&apos;re preparing more moments from Bihar Fashion League for the gallery.</p>
            </div>
          ) : (
            <>
              <div ref={gridRef} className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {filteredItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => openLightbox(index)}
                    className="tile-reveal relative aspect-[3/4] overflow-hidden group focus:outline-none focus:ring-1 focus:ring-[#171717]"
                    style={{ transitionDelay: `${Math.min(index % 8, 7) * 60}ms` }}
                    aria-label={item.alt}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-xs text-white/90 uppercase tracking-wider">{item.category}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-10 text-center">
                <p className="text-sm text-[#66645F]">{approvedCount} approved moments from BFL 2025</p>
              </div>
            </>
          )}
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
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
