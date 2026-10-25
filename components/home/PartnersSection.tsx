"use client";

import { useEffect, useRef } from "react";

interface SponsorCardProps {
  id: string;
  name: string;
  logoUrl: string;
  logoAlt: string;
  tier: "title" | "event" | "media" | "collaborator";
  website?: string;
}

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

export function PartnersSection({
  sponsors = [],
}: {
  sponsors?: Array<SponsorCardProps>;
}) {
  const gridRef = useReveal();

  return (
    <section>
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 650ms ease, transform 650ms ease;
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .tile-reveal {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 600ms ease, transform 600ms ease;
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
      <div ref={gridRef} className="reveal">
        {sponsors.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
            {sponsors.map((s, index) => (
              <div
                key={s.id}
                className="tile-reveal aspect-square flex items-center justify-center p-3 bg-[#f0f2ff] border border-white transition-all duration-300 hover:bg-[#e8ebff] focus-within:ring-1 focus-within:ring-[#171717]"
                style={{ transitionDelay: `${Math.min(index, 13) * 30}ms` }}
              >
                <img
                  src={s.logoUrl}
                  alt={s.logoAlt || s.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-base text-[#66645F]">
              Partner information will be announced soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
