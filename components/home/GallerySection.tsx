"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface GalleryImageProps {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export function GalleryCard({
  id,
  src,
  alt,
  category,
}: GalleryImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Link href={`/gallery?category=${encodeURIComponent(category)}`} className="block group">
        <div className="relative aspect-[4/5] overflow-hidden mb-6">
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-center group-hover:scale-[1.05] transition-transform duration-1000"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-6 left-6 z-10">
            <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-light tracking-widest uppercase">
              {category}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function GallerySection({
  images = [],
}: {
  images?: Array<GalleryImageProps>;
}) {
  return (
    <section className="relative py-32 lg:py-48 bg-[#FAFAF9] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row justify-between items-end lg:items-start gap-12 mb-24"
        >
          <div>
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase">
              Portfolio
            </span>
            <h2 className="text-6xl lg:text-7xl font-bold tracking-tighter mb-6 font-serif leading-[0.9]">
              Gallery
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
              Moments from the runway and beyond.
            </p>
          </div>
          <Link href="/gallery" className="text-sm font-medium text-primary hover:text-primary/80 group flex items-center gap-3 tracking-wide">
            View All Gallery <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {images.length > 0 ? (
            images.map((img) => <GalleryCard key={img.id} {...img} />)
          ) : (
            <div className="col-span-full text-center py-32">
              <p className="text-lg text-muted-foreground font-light">
                Gallery images will be available soon.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/5" />
    </section>
  );
}

