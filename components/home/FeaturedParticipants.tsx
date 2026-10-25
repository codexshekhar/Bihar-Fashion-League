import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ParticipantCardProps {
  id: string;
  name: string;
  title: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  slug: string;
}

export function ParticipantCard({
  id,
  name,
  title,
  category,
  imageUrl,
  imageAlt,
  slug,
}: ParticipantCardProps) {
  return (
    <Link href={`/participants/${slug}`} className="block">
      <div className="relative group">
        <div className="relative h-[400px] lg:h-[500px] overflow-hidden mb-8">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover object-center group-hover:scale-[1.05] transition-transform duration-1000"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-6 left-6 z-10">
            <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-light tracking-widest uppercase">
              {category}
            </span>
          </div>
        </div>
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter mb-2 group-hover:text-primary transition-colors font-serif">
              {name}
            </h3>
            <p className="text-base text-muted-foreground font-light">{title}</p>
          </div>
          <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}

export function FeaturedParticipantsSection({
  participants = [],
}: {
  participants?: Array<{
    id: string;
    name: string;
    title: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
    slug: string;
  }>;
}) {
  return (
    <section className="relative py-32 lg:py-48 bg-[#FAFAF9] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-end lg:items-start gap-12 mb-24">
          <div>
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase">
              Featured Talent
            </span>
            <h2 className="text-6xl lg:text-7xl font-bold tracking-tighter mb-6 font-serif leading-[0.9]">
              Participants
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
              Meet the talent shaping Bihar's fashion future.
            </p>
          </div>
          <Button asChild size="lg" className="px-10 py-6 text-base tracking-wide">
            <Link href="/participants">
              View All Participants <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {participants.length > 0 ? (
            participants.map((p) => (
              <ParticipantCard key={p.id} {...p} />
            ))
          ) : (
            <div className="col-span-full text-center py-32">
              <p className="text-lg text-muted-foreground font-light">
                No featured participants available. Check back soon.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/5" />
    </section>
  );
}

