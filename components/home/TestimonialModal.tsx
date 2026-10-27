"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialModalProps {
  testimonial: {
    id: string;
    title: string;
    participantName: string;
    role: string;
    poster: string;
    video: string;
    quote?: string;
    isVerified?: boolean;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TestimonialModal({
  testimonial,
  open,
  onOpenChange,
}: TestimonialModalProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Pause playback when modal closes
  React.useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "relative z-50 w-full max-w-4xl sm:max-w-[900px] rounded-2xl border border-white/10 bg-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
            "flex flex-col sm:flex-row"
          )}
        >
          {/* Video column */}
          <div className="relative flex-1 aspect-video bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-cover object-center"
              controls
              autoPlay
              muted
              playsInline
              poster={testimonial.poster}
            >
              <source src={testimonial.video} type="video/mp4" />
              <p className="absolute inset-0 flex flex-col items-center justify-center text-white">
                Unable to play this video. Please try again later.
              </p>
            </video>

            {/* Poster fallback overlay */}
            {testimonial.poster && (
              <img
                src={testimonial.poster}
                alt={`Poster: ${testimonial.title}`}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-100 transition-opacity duration-300"
                style={{ opacity: videoRef.current?.readyState ? 0 : 1 }}
              />
            )}
          </div>

          {/* Info column */}
          <div className="flex-1 p-8 sm:p-12 bg-[#171717] text-[#F8F7F0] flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F8F7F0] mb-3 leading-tight">
                {testimonial.title}
              </h2>
              <p className="text-sm text-[#B5B5B5] mb-1">{testimonial.participantName}</p>
              <p className="text-xs tracking-[0.24em] uppercase text-[#66645F] mb-6">
                {testimonial.role}
              </p>
            </div>

            {testimonial.quote && testimonial.isVerified && (
                <div className="relative pl-6 italic text-sm sm:text-base text-[#B5B5B5] leading-relaxed border-l-2 border-[#66645F]/50 mb-8">
                  <span className="absolute -left-2 top-0 text-[#66645F]">&ldquo;</span>
                  {testimonial.quote}
                  <span className="absolute -right-1 bottom-0 text-[#66645F]">&rdquo;</span>
                </div>
              )}
            </div>

            {/* Close button row */}
            <div className="flex justify-between items-center pt-6 border-t border-white/10">
              <p className="text-xs tracking-[0.28em] uppercase text-[#66645F]">
                Bihar Fashion League · Official
              </p>
              <Dialog.Close asChild>
                <button
                  className="w-10 h-10 rounded-full bg-[#F8F7F0] flex items-center justify-center text-[#171717] hover:bg-[#B5B5B5] transition-colors"
                  aria-label="Close testimonial video"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
