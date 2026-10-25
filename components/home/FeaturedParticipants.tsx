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
    <div className="relative group">
      <div className="relative aspect-[3/4] overflow-hidden mb-6">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#66645F] mb-2">{category}</p>
          <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#171717] mb-1">
            {name}
          </h3>
          <p className="text-sm text-[#66645F]">{title}</p>
        </div>
      </div>
    </div>
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
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 lg:mb-16">
          <div>
            <p className="text-sm tracking-[0.28em] uppercase text-[#66645F] mb-4">
              Celebrating the Faces and Designers of BFL
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#171717] mb-4">
              Talent Shaping Bihar&apos;s Fashion Community
            </h2>
            <p className="text-base leading-relaxed text-[#66645F] max-w-[620px]">
              Discover the talent, creativity, and individuality shaping Bihar&apos;s fashion community.
            </p>
          </div>
          <Button asChild variant="ghost" className="h-11 px-7 text-[#171717] hover:bg-[#171717]/5 text-sm tracking-wide">
            <Link href="/gallery">
              View Gallery <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {participants.length > 0 ? (
            participants.map((p) => <ParticipantCard key={p.id} {...p} />)
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-base text-[#66645F]">
                Participant highlights will be announced soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

