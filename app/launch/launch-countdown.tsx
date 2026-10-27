"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LAUNCH_TIMESTAMP = new Date("2026-10-27T18:00:00+05:30").getTime();

export default function LaunchCountdown() {
  const [remaining, setRemaining] = useState<number>(
    Math.max(0, LAUNCH_TIMESTAMP - Date.now())
  );

  useEffect(() => {
    if (remaining <= 0) {
      window.location.href = "/";
      return;
    }

    const timer = setInterval(() => {
      const now = Math.max(0, LAUNCH_TIMESTAMP - Date.now());
      setRemaining(now);
      if (now <= 0) {
        clearInterval(timer);
        window.location.href = "/";
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  function pad(n: number): string {
    return String(n).padStart(2, "0");
  }

  return (
    <div className="min-h-screen bg-[#171717] text-[#F8F7F0] flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-12">
        <div className="relative inline-block mb-2">
          <Link href="/" aria-label="Bihar Fashion League home">
            <Image
              src="/images/BFl-logo/bfl-logo-white.png"
              alt="Bihar Fashion League"
              width={200}
              height={80}
              className="object-contain drop-shadow-[0_0_16px_rgba(0,0,0,0.4)]"
              loading="eager"
            />
          </Link>
        </div>

        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-semibold tracking-tighter uppercase text-[#F8F7F0] leading-tight">
          BIHAR FASHION LEAGUE
        </h1>

        <p className="text-[#B5B5B5] tracking-[0.32em] uppercase text-sm font-medium">
          A New Era of Fashion Begins
        </p>

        <div className="space-y-6">
          <p className="text-[#B5B5B5] text-sm tracking-widest uppercase">
            LAUNCHING TODAY AT 6:00 PM IST
          </p>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <div className="text-center min-w-[70px]">
              <span className="text-[clamp(2rem,5vw,4rem)] font-serif font-bold text-[#F8F7F0]">
                {days}
              </span>
              <span className="text-xs text-[#66645F] tracking-widest uppercase block mt-1">
                Days
              </span>
            </div>
            <div className="text-center min-w-[70px]">
              <span className="text-[clamp(2rem,5vw,4rem)] font-serif font-bold text-[#F8F7F0]">
                {pad(hours)}
              </span>
              <span className="text-xs text-[#66645F] tracking-widest uppercase block mt-1">
                Hours
              </span>
            </div>
            <div className="text-center min-w-[70px]">
              <span className="text-[clamp(2rem,5vw,4rem)] font-serif font-bold text-[#F8F7F0]">
                {pad(minutes)}
              </span>
              <span className="text-xs text-[#66645F] tracking-widest uppercase block mt-1">
                Minutes
              </span>
            </div>
            <div className="text-center min-w-[70px]">
              <span className="text-[clamp(2rem,5vw,4rem)] font-serif font-bold text-[#F8F7F0]">
                {pad(seconds)}
              </span>
              <span className="text-xs text-[#66645F] tracking-widest uppercase block mt-1">
                Seconds
              </span>
            </div>
          </div>

          <div className="relative h-[1px] bg-[#66645F]/30 w-full my-8 mx-auto max-w-[400px]">
            <div className="absolute inset-0 h-full bg-[#F8F7F0] animate-sweep" />
          </div>

          <p className="text-[#66645F] text-xs tracking-wider uppercase">
            Be the first to witness Bihar&rsquo;s newest fashion platform.
          </p>
        </div>
      </div>
    </div>
  );
}
