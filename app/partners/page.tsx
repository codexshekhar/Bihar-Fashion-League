"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
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

export default function PartnersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useReveal();
  const categoriesRef = useReveal();
  const processRef = useReveal();
  const ctaRef = useReveal();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const el = heroRef.current;
    if (!el) return;
    el.classList.add("hero-revealed");
  }, []);

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
        .reveal-stagger.reveal-visible > *:nth-child(4) {
          transition-delay: 320ms;
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
        .hero-revealed .hero-fade-delay-3 {
          transition-delay: 320ms;
        }
        .image-mask {
          clip-path: inset(12% 12% 12% 12%);
          transition: clip-path 1000ms ease;
        }
        .reveal-visible .image-mask {
          clip-path: inset(0 0 0 0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .reveal-stagger > *,
          .hero-fade,
          .image-mask {
            opacity: 1 !important;
            transform: none !important;
            clip-path: inset(0 0 0 0) !important;
            transition: none !important;
          }
        }
      `}</style>
      <Header />

      <section className="relative pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="relative overflow-hidden min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-center">
            <div className="absolute inset-0">
              <img
                src="/images/BFL_2025_10.jpeg"
                alt="Bihar Fashion League partnership opportunity"
                className="h-full w-full object-cover object-[center_30%]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
            </div>
            <div className="relative z-10 px-6 sm:px-10 lg:px-16 max-w-3xl">
              <p className="hero-fade text-xs tracking-[0.32em] uppercase text-white/80 mb-5">
                PARTNER WITH BIHAR FASHION LEAGUE
              </p>
              <h1 className="hero-fade hero-fade-delay-1 font-serif text-[clamp(2.8rem,7vw,5.4rem)] leading-[0.95] text-white mb-6">
                Build the Future of Fashion With Us
              </h1>
              <p className="hero-fade hero-fade-delay-2 text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mb-9">
                Join Bihar Fashion League in connecting emerging talent, creative communities, and brands through fashion, culture, and unforgettable runway experiences.
              </p>
              <div className="hero-fade hero-fade-delay-3 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <Button asChild className="h-11 px-7 bg-white text-[#171717] hover:bg-white/90 text-sm tracking-wide">
                  <Link href="/contact">
                    Become a Partner
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="h-11 px-7 text-white hover:bg-white/10 text-sm tracking-wide">
                  <Link href="#opportunities">
                    Explore Opportunities <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-4">WHY PARTNER</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] mb-4">
              Why Partner With BFL?
            </h2>
            <p className="text-base text-[#66645F] max-w-2xl mx-auto">
              Connect your brand with emerging fashion talent, creative professionals, and an engaged audience passionate about style and culture.
            </p>
          </div>
          <div ref={benefitsRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="relative py-8 border-t border-[#E5E2DC]">
              <span className="text-xs tracking-[0.28em] uppercase text-[#66645F] mb-4 block">01</span>
              <h3 className="font-serif text-2xl text-[#171717] mb-3">Brand Visibility</h3>
              <p className="text-base leading-relaxed text-[#66645F]">
                Showcase your brand across runway shows, event materials, and digital channels.
              </p>
            </div>
            <div className="relative py-8 border-t border-[#E5E2DC]">
              <span className="text-xs tracking-[0.28em] uppercase text-[#66645F] mb-4 block">02</span>
              <h3 className="font-serif text-2xl text-[#171717] mb-3">Talent Access</h3>
              <p className="text-base leading-relaxed text-[#66645F]">
                Connect with emerging designers, models, and creative professionals.
              </p>
            </div>
            <div className="relative py-8 border-t border-[#E5E2DC]">
              <span className="text-xs tracking-[0.28em] uppercase text-[#66645F] mb-4 block">03</span>
              <h3 className="font-serif text-2xl text-[#171717] mb-3">Community Impact</h3>
              <p className="text-base leading-relaxed text-[#66645F]">
                Support the growth of Bihar&apos;s fashion ecosystem and creative community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="opportunities" className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-4">PARTNERSHIP CATEGORIES</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-base text-[#66645F] max-w-2xl mx-auto">
              Choose the collaboration path that best aligns with your brand and goals.
            </p>
          </div>
          <div ref={categoriesRef} className="reveal grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="group border-t border-[#E5E2DC] pt-6 hover:border-[#171717] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#171717] mb-2">Title Sponsor</h3>
                  <p className="text-base leading-relaxed text-[#66645F] max-w-md">
                    Premier partnership with maximum brand visibility across event touchpoints.
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#66645F] group-hover:text-[#171717] group-hover:translate-x-1 transition-all duration-300 mt-1" />
              </div>
            </div>
            <div className="group border-t border-[#E5E2DC] pt-6 hover:border-[#171717] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#171717] mb-2">Event Partner</h3>
                  <p className="text-base leading-relaxed text-[#66645F] max-w-md">
                    Collaborate on specific shows, showcases, or event segments.
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#66645F] group-hover:text-[#171717] group-hover:translate-x-1 transition-all duration-300 mt-1" />
              </div>
            </div>
            <div className="group border-t border-[#E5E2DC] pt-6 hover:border-[#171717] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#171717] mb-2">Media Partner</h3>
                  <p className="text-base leading-relaxed text-[#66645F] max-w-md">
                    Amplify event coverage through media channels and press outreach.
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#66645F] group-hover:text-[#171717] group-hover:translate-x-1 transition-all duration-300 mt-1" />
              </div>
            </div>
            <div className="group border-t border-[#E5E2DC] pt-6 hover:border-[#171717] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#171717] mb-2">Collaborator</h3>
                  <p className="text-base leading-relaxed text-[#66645F] max-w-md">
                    Creative collaborations with designers, photographers, and artists.
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#66645F] group-hover:text-[#171717] group-hover:translate-x-1 transition-all duration-300 mt-1" />
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Button asChild className="h-11 px-7 bg-[#171717] text-white hover:bg-[#171717]/90 text-sm tracking-wide">
              <Link href="/contact">
                Send Partnership Inquiry <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div ref={processRef} className="reveal grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-5">PARTNERSHIP PROCESS</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#171717] mb-6">
                How It Works
              </h2>
              <p className="text-base leading-relaxed text-[#66645F] mb-8">
                Every collaboration is unique. Specific benefits, deliverables, timelines, and commercial terms are subject to confirmation with BFL.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-xs tracking-[0.28em] uppercase text-[#66645F] mt-1">01</span>
                  <div>
                    <h3 className="font-serif text-xl text-[#171717] mb-1">Share your inquiry</h3>
                    <p className="text-base text-[#66645F]">Tell us about your organization and collaboration goals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-xs tracking-[0.28em] uppercase text-[#66645F] mt-1">02</span>
                  <div>
                    <h3 className="font-serif text-xl text-[#171717] mb-1">Discuss the proposal</h3>
                    <p className="text-base text-[#66645F]">We review and discuss ideas together.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-xs tracking-[0.28em] uppercase text-[#66645F] mt-1">03</span>
                  <div>
                    <h3 className="font-serif text-xl text-[#171717] mb-1">Confirm details</h3>
                    <p className="text-base text-[#66645F]">Finalize partnership details if aligned.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="image-mask relative aspect-[16/10] overflow-hidden">
                <img
                  src="/images/BFL_2025_9.jpeg"
                  alt="Bihar Fashion League event"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div ref={ctaRef} className="reveal relative overflow-hidden text-center py-16 sm:py-20 lg:py-24 px-4">
            <div className="absolute inset-0">
              <img
                src="/images/BFL_2025_11.jpeg"
                alt="Bihar Fashion League runway"
                className="h-full w-full object-cover object-[center_30%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/70" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="text-xs tracking-[0.32em] uppercase text-white/80 mb-4">LET&apos;S COLLABORATE</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Let&apos;s Shape What&apos;s Next</h2>
              <p className="text-base sm:text-lg text-white/90 mb-9">
                Bring your brand, expertise, or creative vision to the Bihar Fashion League community.
              </p>
              <Button asChild className="h-11 px-7 bg-white text-[#171717] hover:bg-white/90 text-sm tracking-wide">
                <Link href="/contact">
                  Send Partnership Inquiry <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
