import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UpcomingEventSection() {
  return (
    <section className="relative py-12 lg:py-20 bg-[#F8F7F2]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
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
    </section>
  );
}
