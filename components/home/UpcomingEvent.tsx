"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export function UpcomingEventSection() {
  const sectionRef = useReveal();

  return (
    <section className="relative py-12 lg:py-20 bg-[#F8F7F2]">
      <style jsx global>{`
        .reveal {
          opacity: 1;
          transform: none;
          transition: opacity 700ms ease, transform 700ms ease;
        }
        .reveal-animate {
          opacity: 0;
          transform: translateY(24px);
        }
        .reveal-animate.reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger > * {
          opacity: 1;
          transform: none;
        }
        .reveal-stagger-animate > * {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 650ms ease, transform 650ms ease;
        }
        .reveal-stagger-animate.reveal-visible > *:nth-child(1) {
          transition-delay: 80ms;
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger-animate.reveal-visible > *:nth-child(2) {
          transition-delay: 160ms;
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger-animate.reveal-visible > *:nth-child(3) {
          transition-delay: 240ms;
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger-animate.reveal-visible > *:nth-child(4) {
          transition-delay: 320ms;
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger-animate.reveal-visible > *:nth-child(5) {
          transition-delay: 400ms;
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-animate,
          .reveal-stagger-animate > * {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="reveal-animate grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <Image
              src="/images/BFL_2025_16.jpeg"
              alt="Bihar Fashion League event"
              width={600}
              height={750}
              className="w-full h-auto object-contain max-w-[500px] mx-auto lg:mx-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>
          <div>
            <div className="reveal-stagger-animate">
              <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-4">BIHAR FASHION LEAGUE</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#171717] mb-4">
                The Next Chapter of Fashion
              </h2>
              <p className="text-base leading-relaxed text-[#66645F] mb-5 max-w-[460px]">
                Join us for Bihar&apos;s premier fashion event celebrating emerging talent, runway showcases, and creative collaborations.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#171717]/40 text-[#171717] text-xs tracking-[0.28em] uppercase mb-6">
                <Calendar className="h-3.5 w-3.5" />
                DATE &amp; VENUE TO BE ANNOUNCED
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 pb-4 border-b border-[#E5E2DC]">
                  <Calendar className="h-5 w-5 text-[#66645F] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs tracking-[0.28em] uppercase text-[#66645F] mb-1">EVENT DATE</p>
                    <p className="text-base text-[#171717]">To Be Announced</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#66645F] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs tracking-[0.28em] uppercase text-[#66645F] mb-1">VENUE</p>
                    <p className="text-base text-[#171717]">To Be Announced</p>
                  </div>
                </div>
              </div>
              <Button asChild className="h-11 px-7 bg-[#171717] text-white hover:bg-[#171717]/90 text-sm tracking-wide">
                <Link href="/gallery">
                  Explore BFL Gallery <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
