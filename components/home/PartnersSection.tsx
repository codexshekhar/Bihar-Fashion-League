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
  title: { label: "Headline Sponsor" },
  event: { label: "Official Event Partner" },
  media: { label: "Media Partner" },
  collaborator: { label: "Associate Partner" },
};

export function SponsorCard({
  id,
  name,
  logoUrl,
  logoAlt,
  tier,
  website,
}: SponsorCardProps) {
  const config = tierConfig[tier] || { label: tier };
  const content = (
    <div className="flex items-center justify-between py-6 border-b border-[#E5E2DC] group">
      <div className="flex items-center gap-6">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={logoAlt || name}
            className="h-12 w-auto max-w-[160px] object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        ) : null}
        <div>
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#66645F] block mb-1">
            {config.label}
          </span>
          <p className="text-base font-medium text-[#171717]">{name}</p>
        </div>
      </div>
      {website ? <ArrowRight className="h-4 w-4 text-[#66645F] group-hover:text-[#171717] transition-colors" /> : null}
    </div>
  );

  if (website) {
    return (
      <Link href={website} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }
  return <div>{content}</div>;
}

export function PartnersSection({
  sponsors = [],
}: {
  sponsors?: Array<SponsorCardProps>;
}) {
  return (
    <section className="relative">
      <div className="space-y-0">
        {sponsors.length > 0 ? (
          sponsors.map((s) => <SponsorCard key={s.id} {...s} />)
        ) : (
          <div className="py-10 text-center border-b border-[#E5E2DC]">
            <p className="text-base text-[#66645F]">
              Sponsor and partner information will be announced soon.
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="ghost" className="h-11 px-7 text-[#171717] hover:bg-[#171717]/5 text-sm tracking-wide">
          <Link href="/partners">
            Partner With BFL <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
