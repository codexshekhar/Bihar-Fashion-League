"use client";

interface SponsorCardProps {
  id: string;
  name: string;
  logoUrl: string;
  logoAlt: string;
  tier: "title" | "event" | "media" | "collaborator";
  website?: string;
}

export function PartnersSection({
  sponsors = [],
}: {
  sponsors?: Array<SponsorCardProps>;
}) {
  if (sponsors.length === 0) {
    return null;
  }

  const items = [...sponsors, ...sponsors];

  return (
    <section className="w-full">
      <style jsx global>{`
        @keyframes bfl-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .bfl-marquee-track {
          animation: bfl-marquee 40s linear infinite;
        }
        .bfl-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .bfl-marquee-track {
            animation: none !important;
            transform: none !important;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
      <div className="relative overflow-hidden w-full h-[70px] sm:h-[80px] md:h-[95px] bg-[#F8F7F0]">
        <div className="bfl-marquee-track flex items-center gap-10 sm:gap-14 md:gap-16 h-full w-max">
          {items.map((s, index) => (
            <div
              key={`${s.id}-${index}`}
              className="flex items-center justify-center h-full px-4"
              aria-hidden={index >= sponsors.length}
            >
              <img
                src={s.logoUrl}
                alt={index >= sponsors.length ? "" : (s.logoAlt || s.name)}
                className="h-8 sm:h-10 md:h-12 max-w-[140px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
