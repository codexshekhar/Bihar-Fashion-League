import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Bihar Fashion Week 2024 | Bihar Fashion League",
  description: "Bihar Fashion Week 2024 - emerging designers, runway models, and showstoppers.",
};

export default function EventDetailPage() {
  return (
    <main className="relative bg-white">
      <Header />
      
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/images/BFL_2025_16.jpeg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-40 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Bihar Fashion Week 2024</h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
            November 15-17, 2024 · Patna, Bihar
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">About the Event</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Bihar Fashion Week 2024 brings together emerging designers, runway models, showstoppers, and creative talent for three days of fashion, art, and celebration.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Experience curated runway shows, designer showcases, and special performances celebrating the creativity of Bihar's fashion community.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Date</p>
                    <p className="text-muted-foreground">November 15-17, 2024</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Venue</p>
                    <p className="text-muted-foreground">Patna, Bihar</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[600px] rounded-3xl overflow-hidden border border-border shadow-2xl">
              <Image
                src="/images/BFL_2025_16.jpeg"
                alt="Bihar Fashion Week 2024 runway"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <Button size="lg" asChild>
              <Link href="/register/model">
                Register Now
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}

import { Calendar, MapPin } from "lucide-react";
