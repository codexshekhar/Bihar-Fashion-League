"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  {
    id: "kids",
    name: "Kids Fashion",
    title: "Little Stars, Big Dreams",
    description: "A celebration of confidence, creativity, and joyful self-expression, giving young participants an opportunity to experience the excitement of the runway.",
    imageUrl: "/images/BFL_2025_5.jpeg",
    imageAlt: "Kids fashion at Bihar Fashion League",
  },
  {
    id: "teen",
    name: "Teen Fashion",
    title: "Discover Your Signature",
    description: "A space for emerging young talent to explore personal style, build confidence, and express individuality through fashion.",
    imageUrl: "/images/BFL_2025_9.jpeg",
    imageAlt: "Teen fashion at Bihar Fashion League",
  },
  {
    id: "adult",
    name: "Adult Fashion",
    title: "Own the Runway",
    description: "Celebrate individuality, stage presence, and personal style through a memorable runway experience.",
    imageUrl: "/images/BFL_2025_12.jpeg",
    imageAlt: "Adult fashion at Bihar Fashion League",
  },
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

export function FashionCategoriesSection() {
  const headerRef = useReveal();
  const gridRef = useReveal();
  const pointsRef = useReveal();
  const ctaRef = useReveal();

  return (
    <section className="relative py-16 lg:py-24 bg-[#F8F7F0] overflow-hidden">
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
          transform: translateY(20px);
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
        <div ref={headerRef} className="reveal text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-4">DISCOVER YOUR STYLE</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] mb-5">Fashion Categories</h2>
          <p className="text-base sm:text-lg text-[#66645F] leading-relaxed mb-4">
            Every runway tells a different story. Explore the styles, expressions, and creative possibilities that bring Bihar Fashion League to life.
          </p>
          <p className="text-base text-[#66645F] leading-relaxed">
            From contemporary fashion and confident runway walks to creative concepts and emerging talent, BFL celebrates individuality, self-expression, and the art of presentation.
          </p>
        </div>

        <div ref={gridRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16 lg:mb-24">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <Image
                  src={category.imageUrl}
                  alt={category.imageAlt}
                  fill
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-[#66645F] mb-2">{category.name}</p>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] mb-3">{category.title}</h3>
                <p className="text-base leading-relaxed text-[#66645F]">{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div ref={pointsRef} className="reveal mb-16 lg:mb-24">
          <div className="max-w-3xl mb-10">
            <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-4">MORE THAN A RUNWAY</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mb-5">More Than a Runway</h2>
            <p className="text-base leading-relaxed text-[#66645F]">
              Fashion is about more than what you wear. It is about confidence, creativity, and the way you present yourself to the world. Bihar Fashion League brings together aspiring talent, fashion enthusiasts, and creative communities to celebrate personal expression and stage presence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="border-t border-[#E5E2DC] pt-6">
              <h3 className="font-serif text-xl text-[#171717] mb-2">Confidence</h3>
              <p className="text-base text-[#66645F]">Build comfort and presence in front of an audience.</p>
            </div>
            <div className="border-t border-[#E5E2DC] pt-6">
              <h3 className="font-serif text-xl text-[#171717] mb-2">Creativity</h3>
              <p className="text-base text-[#66645F]">Explore personal style and fashion expression.</p>
            </div>
            <div className="border-t border-[#E5E2DC] pt-6">
              <h3 className="font-serif text-xl text-[#171717] mb-2">Community</h3>
              <p className="text-base text-[#66645F]">Connect with people who share an interest in fashion and performance.</p>
            </div>
          </div>
        </div>

        <div ref={ctaRef} className="reveal text-center border-t border-[#E5E2DC] pt-12 lg:pt-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mb-4">Ready to Take Your First Step?</h2>
          <p className="text-base text-[#66645F] mb-8 max-w-xl mx-auto">
            Explore the registration process and find the category that best matches your profile.
          </p>
          <Button asChild className="h-11 px-7 bg-[#171717] text-white hover:bg-[#171717]/90 text-sm tracking-wide">
<Link href="https://forms.gle/GxQmh5UVjoWSktYz6" target="_blank" rel="noopener noreferrer">Register Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
