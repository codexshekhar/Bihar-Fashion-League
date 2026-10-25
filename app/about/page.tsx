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

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const founderRef = useReveal();
  const valuesRef = useReveal();
  const philosophyRef = useReveal();
  const benefitsRef = useReveal();
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
          <div ref={heroRef} className="relative overflow-hidden min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center justify-center text-center">
            <div className="absolute inset-0">
              <img
                src="/images/BFL_2025_12.jpeg"
                alt="Bihar Fashion League runway"
                className="h-full w-full object-cover object-[center_30%]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/55" />
            </div>
            <div className="relative z-10 px-4 max-w-3xl">
              <p className="hero-fade text-xs tracking-[0.32em] uppercase text-white/80 mb-5">
                ABOUT BIHAR FASHION LEAGUE
              </p>
              <h1 className="hero-fade hero-fade-delay-1 font-serif text-[clamp(2.8rem,7vw,5.2rem)] leading-[0.95] text-white mb-6">
                The Story Behind BFL
              </h1>
              <p className="hero-fade hero-fade-delay-2 text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                An authentic platform for Bihar&apos;s fashion talent to showcase their creativity and access real opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div ref={founderRef} className="reveal grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="image-mask relative aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/BFL_2025_13.jpeg"
                    alt="Piyush Pratik - Bihar Fashion League Founder"
                    className="h-full w-full object-cover object-[center_20%]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-5">OUR FOUNDER&apos;S VISION</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#171717] mb-6">
                Our Founder&apos;s Vision
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-[#66645F]">
                <p>
                  After spending a decade walking national runways and working alongside industry leaders,
                  BFL founder <strong className="text-[#171717]">Piyush Pratik</strong> turned his vision toward his
                  home state.
                </p>
                <p>
                  He saw incredible raw talent in Bihar, but he also saw an ecosystem plagued by shortcuts and
                  illegitimate pageants. Deciding it was time to change the narrative, Piyush built the Bihar Fashion
                  League—a platform grounded in integrity, professional standards, and real opportunity.
                </p>
                <p>
                  BFL isn&apos;t just an event; it&apos;s a movement to give Bihar&apos;s aspiring models and designers the authentic
                  national stage they deserve.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild className="h-11 px-7 bg-[#171717] text-white hover:bg-[#171717]/90 text-sm tracking-wide">
                  <Link href="/register/model">
                    Register as a Model <ArrowRight className="ml-2 h-4 w-4" />
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
            <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-4">OUR MISSION</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717]">Mission &amp; Values</h2>
          </div>
          <div ref={valuesRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="relative py-8 border-t border-[#E5E2DC]">
              <span className="text-xs tracking-[0.28em] uppercase text-[#66645F] mb-4 block">01</span>
              <h3 className="font-serif text-2xl text-[#171717] mb-3">Integrity First</h3>
              <p className="text-base leading-relaxed text-[#66645F]">
                No shortcuts, no illegitimate pageants. BFL operates with transparency and professional standards at every level.
              </p>
            </div>
            <div className="relative py-8 border-t border-[#E5E2DC]">
              <span className="text-xs tracking-[0.28em] uppercase text-[#66645F] mb-4 block">02</span>
              <h3 className="font-serif text-2xl text-[#171717] mb-3">Real Opportunity</h3>
              <p className="text-base leading-relaxed text-[#66645F]">
                Giving Bihar&apos;s aspiring models and designers an authentic national stage they can trust.
              </p>
            </div>
            <div className="relative py-8 border-t border-[#E5E2DC]">
              <span className="text-xs tracking-[0.28em] uppercase text-[#66645F] mb-4 block">03</span>
              <h3 className="font-serif text-2xl text-[#171717] mb-3">Professional Standards</h3>
              <p className="text-base leading-relaxed text-[#66645F]">
                Built on a decade of national runway experience and industry leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div ref={philosophyRef} className="reveal grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-5">OUR PHILOSOPHY</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#171717] mb-6">
                Our Philosophy
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-[#66645F]">
                <p>
                  Fashion is more than clothing—it is expression, identity, and culture. At Bihar Fashion League, we
                  believe in creating spaces where emerging voices can be seen and celebrated.
                </p>
                <p>
                  From the first sketch to the final walk down the runway, we support every step of the creative journey
                  with integrity, inclusivity, and artistic excellence.
                </p>
              </div>
              <div className="mt-8">
              <Button asChild variant="ghost" className="h-11 px-7 text-[#171717] hover:bg-[#171717]/5 text-sm tracking-wide">
                <Link href="/gallery">
                  Explore Gallery <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="image-mask relative aspect-[16/10] overflow-hidden">
                <img
                  src="/images/BFL_2025_16.jpeg"
                  alt="Bihar Fashion League runway moment"
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
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-4">VALUE</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] mb-4">
              Value for Participants and Partners
            </h2>
            <p className="text-base text-[#66645F] max-w-2xl mx-auto">
              What Bihar Fashion League offers to those who join our platform.
            </p>
          </div>
          <div ref={benefitsRef} className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <div className="border-t border-[#E5E2DC] pt-8">
              <h3 className="font-serif text-2xl text-[#171717] mb-6">For Participants</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-base text-[#66645F]">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#171717] flex-shrink-0" />
                  <span>Professional runway exposure on an authentic national stage</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#66645F]">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#171717] flex-shrink-0" />
                  <span>Portfolio development opportunities</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#66645F]">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#171717] flex-shrink-0" />
                  <span>Connections with designers and industry professionals</span>
                </li>
              </ul>
            </div>
            <div className="border-t border-[#E5E2DC] pt-8">
              <h3 className="font-serif text-2xl text-[#171717] mb-6">For Partners</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-base text-[#66645F]">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#171717] flex-shrink-0" />
                  <span>Brand association with emerging fashion talent</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#66645F]">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#171717] flex-shrink-0" />
                  <span>Audience engagement across fashion events</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#66645F]">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#171717] flex-shrink-0" />
                  <span>Creative collaboration opportunities</span>
                </li>
              </ul>
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
              <div className="absolute inset-0 bg-black/65" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="text-xs tracking-[0.32em] uppercase text-white/80 mb-4">JOIN THE MOVEMENT</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Join the Movement</h2>
              <p className="text-base sm:text-lg text-white/90 mb-9">
                Become part of Bihar Fashion League as a participant, partner, or collaborator.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button asChild className="h-11 px-7 bg-white text-[#171717] hover:bg-white/90 text-sm tracking-wide">
                  <Link href="/register/model">
                    Register as a Model
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="h-11 px-7 text-white hover:bg-white/10 text-sm tracking-wide">
                  <Link href="/partners">
                    Partner With Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
