"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { AboutSection } from "@/components/home/AboutSection";
import { FashionCategoriesSection } from "@/components/home/FashionCategories";
import { UpcomingEventSection } from "@/components/home/UpcomingEvent";
import { PartnersSection } from "@/components/home/PartnersSection";
import { GallerySection } from "@/components/home/GallerySection";
import { PressAndNewsSection } from "@/components/home/PressAndNews";
import { CollabCtaSection } from "@/components/home/CollabCta";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturedParticipantsSection } from "@/components/home/FeaturedParticipants";

export default function HomePage() {
  return (
    <main className="relative bg-[#F8F7F0]">
      <Header />

      <section className="relative pt-32 sm:pt-36 lg:pt-44 pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 xl:col-span-5">
              <span className="inline-flex items-center mb-6 px-4 py-1 text-xs tracking-[0.28em] uppercase text-[#66645F]">
                Bihar Fashion League
              </span>
              <h1 className="font-serif text-[clamp(2.8rem,6.5vw,5.6rem)] leading-[0.95] tracking-tight text-[#171717] mb-6">
                Where Bihar&apos;s Next Generation of Fashion Begins
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[#66645F] max-w-[520px] mb-9">
                Bihar Fashion League showcases emerging runway talent, celebrates creative voices, and opens doors to fashion, design, and opportunity across Bihar and beyond.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <Button asChild className="h-11 px-7 bg-[#171717] text-white hover:bg-[#171717]/90 text-sm tracking-wide">
                <Link href="/register/model">
                  Register Now
                </Link>
              </Button>
                <Button asChild variant="ghost" className="h-11 px-7 text-[#171717] hover:bg-[#171717]/5 text-sm tracking-wide">
                  <Link href="/gallery">
                    Explore BFL <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6 xl:col-span-7 relative">
              <div className="relative h-[420px] sm:h-[520px] lg:h-[620px]">
                <div className="absolute top-0 right-0 w-[78%] sm:w-[72%] h-[78%] sm:h-[74%] shadow-[0_40px_80px_-60px_rgba(23,23,23,0.9)]">
                  <Image
                    src="/images/BFL_2025_12.jpeg"
                    alt="BFL runway moment"
                    fill
                    className="object-cover object-[center_20%]"
                    sizes="(max-width: 1024px) 90vw, 55vw"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-[58%] sm:w-[52%] h-[58%] sm:h-[56%] shadow-[0_40px_80px_-60px_rgba(23,23,23,0.9)]">
                  <Image
                    src="/images/BFL_2025_5.jpeg"
                    alt="BFL model on runway"
                    fill
                    className="object-cover object-[center_25%]"
                    sizes="(max-width: 1024px) 70vw, 40vw"
                  />
                </div>
                <div className="hidden md:block absolute top-[16%] left-[24%] w-[36%] h-[44%] shadow-[0_40px_80px_-60px_rgba(23,23,23,0.9)]">
                  <Image
                    src="/images/BFL_2025_9.jpeg"
                    alt="BFL backstage moment"
                    fill
                    className="object-cover object-[center_25%]"
                    sizes="(max-width: 1024px) 40vw, 30vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm tracking-[0.28em] uppercase text-[#66645F] mb-3">Our Partners</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#171717]">Sponsors &amp; Partners</h2>
            <p className="mt-3 text-base text-[#66645F]">Brands that share our vision for fashion in Bihar.</p>
          </div>
          <PartnersSection sponsors={[]} />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/BFL_2025_10.jpeg"
                  alt="BFL runway highlights"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm tracking-[0.28em] uppercase text-[#66645F] mb-4">Runway Highlights</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#171717] mb-5">Moments from the BFL Runway</h2>
              <p className="text-base leading-relaxed text-[#66645F] mb-8 max-w-[420px]">
                A look back at standout looks, emerging talent, and the energy that defines Bihar Fashion League.
              </p>
              <Button asChild className="h-11 px-7 bg-[#171717] text-white hover:bg-[#171717]/90 text-sm tracking-wide">
                <Link href="/gallery">
                  Watch Highlights <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedParticipantsSection participants={[]} />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/BFL_2025_11.jpeg"
                alt="BFL runway"
                fill
                className="object-cover object-[center_30%]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative z-10 text-center py-16 sm:py-20 lg:py-28 px-4">
              <p className="text-sm tracking-[0.28em] uppercase text-white/80 mb-4">Join Us</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Your Runway Journey Starts Here</h2>
              <p className="text-base sm:text-lg text-white/85 max-w-[620px] mx-auto mb-8">
                Eligible participants can register for Bihar Fashion League and take their first step onto the runway.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button asChild className="h-11 px-7 bg-white text-[#171717] hover:bg-white/90 text-sm tracking-wide">
                  <Link href="/register/model">
                    Register Now
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="h-11 px-7 text-white hover:bg-white/10 text-sm tracking-wide">
                  <Link href="/events">
                    Explore the Event <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mb-3">Follow BFL</h2>
            <p className="text-base text-[#66645F] max-w-2xl mx-auto">
              Stay connected with Bihar Fashion League on Instagram for the latest runway moments, backstage stories, and announcements.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="relative aspect-square overflow-hidden bg-[#E5E2DC] group">
                <Image
                  src={`/images/BFL_2025_${i}.jpeg`}
                  alt={`BFL Instagram gallery image ${i}`}
                  fill
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                  loading="lazy"
                />
                <a
                  href="https://www.instagram.com/biharfashionleague"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="ghost" className="h-11 px-7 text-[#171717] hover:bg-[#171717]/5 text-sm tracking-wide">
              <Link href="https://www.instagram.com/biharfashionleague" target="_blank" rel="noopener noreferrer">
                View on Instagram <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <AboutSection />
      <FashionCategoriesSection />
      <UpcomingEventSection />
      <GallerySection />
      <PressAndNewsSection />
      <CollabCtaSection />
      <FaqSection />

      <Footer />
    </main>
  );
}
