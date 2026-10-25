import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section, SectionHeader } from "@/components/ui/section";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Events | Bihar Fashion League",
  description: "Upcoming and past events from Bihar Fashion League - fashion weeks, runway shows, and designer showcases.",
};

interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  slug: string;
  registrationOpen: boolean;
}

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Bihar Fashion Week 2024",
    date: "November 15-17, 2024",
    venue: "Patna, Bihar",
    description: "Bihar's premier fashion week featuring emerging designers, runway models, and showstoppers.",
    imageUrl: "/images/BFL_2025_16.jpeg",
    imageAlt: "Bihar Fashion Week 2024",
    slug: "bihar-fashion-week-2024",
    registrationOpen: true,
  },
  {
    id: "2",
    title: "Designer Showcase Spring 2024",
    date: "March 10-12, 2024",
    venue: "Patna, Bihar",
    description: "A curated showcase of spring collections from emerging Bihar-based designers.",
    imageUrl: "/images/BFL_2025_16.jpeg",
    imageAlt: "Designer Showcase Spring 2024",
    slug: "designer-showcase-spring-2024",
    registrationOpen: false,
  },
];

export default function EventsPage() {
  return (
    <main className="relative bg-white">
      <Header />
      
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/images/BFL_2025_16.jpeg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-40 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Events</h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
            Upcoming shows, past editions, and everything in between.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Upcoming Events"
            description="Stay updated on what's happening at Bihar Fashion League."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {MOCK_EVENTS.filter(e => e.registrationOpen).map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
          
          <SectionHeader
            title="Past Editions"
            description="A look back at previous Bihar Fashion League events."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_EVENTS.filter(e => !e.registrationOpen).map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}

function EventCard({ event }: { event: any }) {
  return (
    <Link href={`/events/${event.slug}`} className="block group">
      <div className="overflow-hidden rounded-3xl border border-border bg-white hover:shadow-xl transition-[color,background-color,border-color] duration-300">
        <div className="h-64 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.imageAlt}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <span className="text-xs font-medium text-primary uppercase tracking-wider mb-2 block">
            {event.registrationOpen ? "Upcoming" : "Past Edition"}
          </span>
          <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.venue}</span>
            </div>
          </div>
          {event.registrationOpen && (
            <Button size="sm" mt-4 className="w-full">
              Register Now
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}
