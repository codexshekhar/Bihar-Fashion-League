"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: {
    id: string;
    title: string;
    participantName: string;
    role: string;
    poster: string;
    quote?: string;
    isVerified?: boolean;
  };
  onPlay: () => void;
  isActive?: boolean;
}

export function TestimonialCard({
  testimonial,
  onPlay,
  isActive = false,
}: TestimonialCardProps) {
  const { poster, participantName, role, title, quote, isVerified } = testimonial;

  return (
    <article
      onClick={onPlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlay();
        }
      }}
      className={cn(
        "group relative rounded-xl overflow-hidden border border-[#E5E2DC] bg-[#F8F7F0] transition-all duration-300",
        isActive
          ? "ring-2 ring-[#171717] shadow-[0_20px_40px_-10px_rgba(23,23,23,0.15)]"
          : "hover:shadow-[0_12px_32px_-8px_rgba(23,23,23,0.1)] hover:border-[#171717]/30"
      )}
    >
      {/* Poster thumbnail */}
      <div className="relative aspect-video w-full bg-[#E5E2DC]">
        <Image
          src={poster}
          alt={`Testimonial poster: ${title}`}
          fill
          className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          loading="lazy"
          priority={isActive}
        />
        {/* Play overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors",
            isActive && "bg-black/50"
          )}
        >
          <button
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F8F7F0] flex items-center justify-center text-[#171717] hover:bg-[#B5B5B5] transition-colors shadow-lg"
          >
            <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1" />
            <span className="sr-only">Play testimonial video</span>
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="font-serif text-lg sm:text-xl text-[#171717] leading-tight mb-1">
          {title}
        </h3>
        <p className="text-sm text-[#171717]/80 mb-3">{participantName}</p>
        <p className="text-xs tracking-[0.24em] uppercase text-[#66645F] mb-3">
          {role}
        </p>
        {quote && isVerified && (
          <div className="relative pl-6 italic text-sm text-[#66645F] leading-relaxed border-l-2 border-[#B5B5B5]">
            <span className="absolute -left-2 top-0 text-[#B5B5B5]">“</span>
            {quote}
            <span className="absolute -right-1 bottom-0 text-[#B5B5B5]">”</span>
          </div>
        )}
      </div>
    </article>
  );
}
