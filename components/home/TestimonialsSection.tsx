"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TESTIMONIALS_DATA } from "./testimonials";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialModal } from "./TestimonialModal";

export function TestimonialsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const selectedTestimonial = TESTIMONIALS_DATA.find((t) => t.id === activeId);

  const handlePlay = (id: string) => {
    setActiveId(id);
    setModalOpen(true);
  };

  if (TESTIMONIALS_DATA.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 lg:py-32 bg-[#171717] overflow-hidden">
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Decorative gold accent line */}
      <div className="absolute left-0 top-1/2 w-full h-[1px] bg-[#B5B5B5]/20 -z-10" />

      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-xs tracking-[0.32em] uppercase text-[#B5B5B5] mb-4">
            Real Stories · Real Experiences
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F8F7F0] mb-5 leading-tight">
            The Experience Speaks.
          </h2>
          <p className="text-base sm:text-lg text-[#B5B5B5] leading-relaxed max-w-2xl mx-auto">
            Every walk has a story. Hear from the people who bring Bihar Fashion League to life.
          </p>
        </div>

        {/* Desktop grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
            TESTIMONIALS_DATA.length <= 3 && "max-w-[1100px] mx-auto"
          )}
        >
          {TESTIMONIALS_DATA.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={activeId === testimonial.id}
              onPlay={() => handlePlay(testimonial.id)}
            />
          ))}
        </div>

        {/* Mobile: horizontal scroll hint */}
        <div className="mt-8 lg:hidden text-center">
          <p className="text-xs tracking-[0.28em] uppercase text-[#66645F]">
            Swipe to explore more stories
          </p>
        </div>
      </div>

      <TestimonialModal
        testimonial={selectedTestimonial ?? TESTIMONIALS_DATA[0]}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
