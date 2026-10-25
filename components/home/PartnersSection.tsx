import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SponsorCardProps {
  id: string;
  name: string;
  logoUrl: string;
  logoAlt: string;
  tier: "title" | "event" | "media" | "collaborator";
  website?: string;
}

const tierConfig: Record<string, { label: string }> = {
  title: { label: "Title Sponsor" },
  event: { label: "Event Partner" },
  media: { label: "Media Partner" },
  collaborator: { label: "Collaborator" },
};

export function SponsorCard({
  id,
  name,
  logoUrl,
  logoAlt,
  tier,
  website,
}: SponsorCardProps) {
  const config = tierConfig[tier];
  return (
    <Link href={website || "#"} className="block group">
      <div className="border-b border-black/10 py-8 group-hover:border-primary/30 transition-colors">
        <div className="flex items-center gap-8">
          <img
            src={logoUrl}
            alt={logoAlt}
            className="h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-[filter] duration-700"
            loading="lazy"
          />
          <div className="flex-1 border-l border-black/10 pl-8">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest block mb-2">
              {config.label}
            </span>
            <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
}

export function PartnersSection({
  sponsors = [],
}: {
  sponsors?: Array<SponsorCardProps>;
}) {
  return (
    <section className="relative py-32 lg:py-48 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-start text-center lg:text-start max-w-3xl mx-auto mb-24">
          <h2 className="text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter mb-8">
            Partners &amp; Sponsors
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Collaborating with brands that share our vision for fashion.
          </p>
        </div>

        <div className="space-y-0">
          {sponsors.length > 0 ? (
            sponsors.map((s) => <SponsorCard key={s.id} {...s} />)
          ) : (
            <div className="border-b border-black/10 py-24 text-center">
              <p className="text-lg text-muted-foreground">
                Sponsor information will be announced soon.
              </p>
            </div>
          )}
        </div>

        <div className="mt-24 flex justify-center">
          <Button asChild size="lg">
            <Link href="/partners">
              Partner With BFL
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/20" />
    </section>
  );
}
