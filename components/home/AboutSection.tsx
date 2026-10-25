"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutSectionProps {
  imageUrl?: string;
  imageAlt?: string;
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

export function AboutSection({
  imageUrl = "/images/BFL_2025_13.jpeg",
  imageAlt = "Bihar Fashion League runway moment",
}: AboutSectionProps) {
  const sectionRef = useReveal();

  return (
    <section className="relative py-12 lg:py-16 bg-[#F8F7F0]">
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
        .reveal-stagger > * {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 650ms ease, transform 650ms ease;
        }
        .reveal-stagger.reveal-visible > *:nth-child(1) {
          transition-delay: 80ms;
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger.reveal-visible > *:nth-child(2) {
          transition-delay: 160ms;
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger.reveal-visible > *:nth-child(3) {
          transition-delay: 240ms;
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger.reveal-visible > *:nth-child(4) {
          transition-delay: 320ms;
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .reveal-stagger > * {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={1200}
              height={1600}
              className="w-full h-auto object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-5">OUR STORY</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#171717] mb-6">
              About Bihar Fashion League
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#66645F] mb-8 max-w-[520px]">
              Bihar Fashion League is a premier fashion platform dedicated to discovering, nurturing, and showcasing emerging fashion talent across Bihar and beyond.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <Button asChild className="h-11 px-7 bg-[#171717] text-white hover:bg-[#171717]/90 text-sm tracking-wide">
                <Link href="/about">
                  Discover Our Story <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="h-11 px-7 text-[#171717] hover:bg-[#171717]/5 text-sm tracking-wide">
                <Link href="/gallery">
                  View Gallery
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
