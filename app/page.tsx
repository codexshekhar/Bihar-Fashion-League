"use client";

import Link from "next/link";
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
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="relative bg-[#FAFAF9]">
      <Header />
      
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0 bg-[url('/images/BFL_2025_12.jpeg')] bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              <span className="inline-block mb-12 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/15 text-white/90 text-sm font-light tracking-[0.3em] uppercase">
                Bihar Fashion League
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="mb-8 text-[clamp(3.5rem,10vw,9rem)] font-bold tracking-tighter text-white leading-[0.85] font-serif"
            >
              THE NEXT GENERATION OF FASHION STARTS HERE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="mb-16 text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed font-light"
            >
              Discover emerging talent, runway moments, and the people shaping the future of fashion with Bihar Fashion League.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 px-12 py-7 text-base font-medium tracking-wide transition-all duration-300">
                Explore BFL <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-12 py-7 text-base font-medium tracking-wide backdrop-blur-sm transition-all duration-300">
                Register Now
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center"
          >
            <ArrowRight className="w-4 h-4 text-white rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 bg-white border-t border-black/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-6">Follow BFL</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay connected with Bihar Fashion League on Instagram for the latest runway moments,
              backstage stories, and announcements.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 group">
                <Image
                  src={`/images/BFL_2025_${i}.jpeg`}
                  alt={`BFL Instagram gallery image ${i}`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 16vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <a
                  href="https://www.instagram.com/biharfashionleague"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="px-8 py-3 text-sm font-medium tracking-wide">
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
      <PartnersSection />
      <GallerySection />
      <PressAndNewsSection />
      <CollabCtaSection />
      <FaqSection />
      
      <Footer />
    </main>
  );
}
