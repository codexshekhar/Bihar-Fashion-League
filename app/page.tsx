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

      <section className="py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#171717] mb-3">Our Brand Partners</h2>
            <p className="text-base text-[#66645F]">Brands that share our vision for fashion in Bihar.</p>
          </div>
          <PartnersSection
            sponsors={[
              { id: "idt", name: "IDT", logoUrl: "/images/Sponsers/IDT%20Logo%20White.png", logoAlt: "IDT", tier: "title" },
              { id: "sla", name: "SLA", logoUrl: "/images/Sponsers/SLA%20LOGO%20WITH%20TM.png", logoAlt: "SLA", tier: "event" },
              { id: "s1", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.46.jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s2", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.46%20(1).jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s3", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.47.jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s4", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.47%20(1).jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s5", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.48.jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s6", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.49.jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s7", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.49%20(1).jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s8", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.50.jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s9", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.50%20(1).jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s10", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.51.jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s11", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.51%20(1).jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s12", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.52.jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s13", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.52%20(1).jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s14", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.53.jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s15", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.53%20(1).jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s16", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.54.jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s17", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.54%20(1).jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s18", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.55.jpeg", logoAlt: "Sponsor", tier: "collaborator" },
              { id: "s19", name: "Sponsor", logoUrl: "/images/Sponsers/WhatsApp%20Image%202026-10-25%20at%2023.18.55%20(1).jpeg", logoAlt: "Sponsor", tier: "collaborator" },
            ]}
          />
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

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-4">TALENT</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] mb-4">Talent Shaping Bihar&apos;s Fashion Community</h2>
          <p className="text-base text-[#66645F] max-w-2xl mx-auto">
            Discover the creativity, individuality, and ambition shaping Bihar&apos;s fashion community.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/BFL_2025_11.jpeg"
                alt="Bihar Fashion League runway"
                fill
                className="object-cover object-[center_30%]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/55" />
            </div>
            <div className="relative z-10 text-center py-16 sm:py-20 lg:py-24 px-4">
              <p className="text-sm tracking-[0.28em] uppercase text-white/80 mb-4">Join Us</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4">Your Runway Journey Starts Here</h2>
              <p className="text-base sm:text-lg text-white/90 max-w-[620px] mx-auto mb-8">
                Explore the registration process and take your first step toward the runway.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button asChild className="h-11 px-7 bg-[#171717] text-white hover:bg-[#171717]/90 text-sm tracking-wide">
                  <Link href="/register/model/apply">
                    Register Now
                  </Link>
                </Button>
                <Button asChild className="h-11 px-7 bg-[#171717] text-white hover:bg-[#171717]/90 text-sm tracking-wide">
                  <Link href="/gallery">
                    Explore Gallery <ArrowRight className="ml-2 h-4 w-4" />
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
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mb-3">Gallery</h2>
            <p className="text-base text-[#66645F] max-w-2xl mx-auto">
              Relive the runway moments, celebrate the talent, and explore the stories behind Bihar Fashion League.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {["1","2","3","4","5","6","7","8","9","10","11","12"].map((i) => (
              <Link key={i} href="/gallery" className="relative aspect-square overflow-hidden bg-[#E5E2DC] group">
                <Image
                  src={`/images/Gallery/BFL_2025_${i}.jpeg`}
                  alt={`BFL gallery image ${i}`}
                  fill
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="ghost" className="h-11 px-7 text-[#171717] hover:bg-[#171717]/5 text-sm tracking-wide">
              <Link href="/gallery">
                View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <AboutSection />
      <FashionCategoriesSection />
      <UpcomingEventSection />
      <FashionCategoriesSection />
      <FaqSection />

      <Footer />
    </main>
  );
}
