import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export function AboutSection({
  title = "About Bihar Fashion League",
  subtitle,
  content,
  imageUrl,
  imageAlt,
}: AboutSectionProps) {
  return (
    <section className="relative py-32 lg:py-48 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 items-start">
          <div className="relative group">
            <div
              className="h-[600px] lg:h-[700px] w-full rounded-[3rem] overflow-hidden border border-black/10"
              style={{
                backgroundImage: `url(${imageUrl || '/images/BFL_2025_13.jpeg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute bottom-16 left-0 w-1 h-[200px] bg-black/40" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter mb-8">
              {title}
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-2xl">
              {content || "Bihar Fashion League is a premier fashion platform dedicated to discovering, nurturing, and showcasing emerging fashion talent across Bihar and beyond."}
            </p>
            <div className="flex items-center gap-8">
              <Button asChild size="lg">
                <Link href="/about">
                  Discover Our Story <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <a
                href="#"
                className="text-sm font-medium text-primary hover:text-primary/80 relative"
              >
                View editorial <span className="absolute -inset-px block bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-black/20" />
    </section>
  );
}
