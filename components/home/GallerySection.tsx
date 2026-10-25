"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

const GALLERY_PREVIEW = [
  "/images/Gallery/BFL_2025_1.jpeg",
  "/images/Gallery/BFL_2025_2.jpeg",
  "/images/Gallery/BFL_2025_3.jpeg",
  "/images/Gallery/BFL_2025_4.jpeg",
  "/images/Gallery/BFL_2025_5.jpeg",
  "/images/Gallery/BFL_2025_6.jpeg",
  "/images/Gallery/BFL_2025_7.jpeg",
  "/images/Gallery/BFL_2025_8.jpeg",
];

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

export function GallerySection() {
  const headerRef = useReveal();
  const gridRef = useReveal();

  return (
    <section className="relative py-16 lg:py-24 bg-[#F8F7F0]">
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
          .tile-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="reveal flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 lg:mb-12">
          <div>
            <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-4">Portfolio</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] mb-3">Gallery</h2>
            <p className="text-base text-[#66645F] max-w-2xl">
              Moments from the runway and beyond.
            </p>
          </div>
          <Link href="/gallery" className="text-sm text-[#171717] hover:opacity-80 flex items-center gap-2">
            View All Gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div ref={gridRef} className="reveal grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          <div className="tile-reveal md:col-span-7 relative aspect-[16/10] overflow-hidden">
            <Image
              src={GALLERY_PREVIEW[0]}
              alt="Bihar Fashion League runway moment"
              fill
              className="object-cover object-center hover:scale-[1.02] transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 60vw"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-4 lg:gap-6">
            {GALLERY_PREVIEW.slice(1, 5).map((src, idx) => (
              <div key={idx} className="tile-reveal relative aspect-square overflow-hidden" style={{ transitionDelay: `${(idx + 1) * 60}ms` }}>
                <Image
                  src={src}
                  alt={`Bihar Fashion League gallery moment ${idx + 2}`}
                  fill
                  className="object-cover object-center hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="md:col-span-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {GALLERY_PREVIEW.slice(5).map((src, idx) => (
              <div key={idx} className="tile-reveal relative aspect-[4/5] overflow-hidden" style={{ transitionDelay: `${(idx + 5) * 60}ms` }}>
                <Image
                  src={src}
                  alt={`Bihar Fashion League gallery moment ${idx + 6}`}
                  fill
                  className="object-cover object-center hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

