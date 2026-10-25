import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CollabCtaSection() {
  return (
    <section className="relative py-32 lg:py-48 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[3rem] overflow-hidden border border-black/10">
          <div
            className="absolute inset-0 bg-[url('/images/BFL_2025_16.jpeg')] bg-cover bg-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent/40" />
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
            <h2 className="text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter text-white mb-8">
              Let's Create Something Extraordinary.
            </h2>
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-12">
              We invite fashion brands, designers, photographers, sponsors, and creative partners
              to collaborate with Bihar Fashion League.
            </p>
            <Button size="lg" asChild>
              <Link href="/partners">
                Become a Partner <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/20" />
      </div>
    </section>
  );
}
