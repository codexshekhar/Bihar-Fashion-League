import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";

interface UpcomingEventSectionProps {
  title?: string;
  date?: string;
  time?: string;
  venue?: string;
  description?: string;
  registrationOpen?: boolean;
  registrationUrl?: string;
}

export function UpcomingEventSection({
  title = "Upcoming Event",
  date,
  time,
  venue,
  description,
  registrationOpen = false,
  registrationUrl = "/register",
}: UpcomingEventSectionProps) {
  if (!date && !title) {
    return (
      <section className="relative py-32 lg:py-48 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter mb-8">
            Bihar Fashion League
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Stay tuned for announcements about our upcoming fashion week event.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-32 lg:py-48 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative h-[700px] rounded-[3rem] overflow-hidden border border-black/10">
              <div
                className="absolute inset-0 bg-[url('/images/BFL_2025_16.jpeg')] bg-cover bg-center group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-[11px] font-medium text-white uppercase tracking-widest mb-10">
              Upcoming Event
            </div>
            <h2 className="text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter mb-8">
              {title}
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-xl">
              {description || "Join us for Bihar's premier fashion event featuring emerging talent, runway shows, and creative collaborations."}
            </p>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">{date}</p>
                  {time && <p className="text-base text-muted-foreground">{time}</p>}
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <p className="text-lg text-muted-foreground">{venue}</p>
              </div>
            </div>
            {registrationOpen && registrationUrl && (
              <Button size="lg" asChild className="mt-8">
                <Link href={registrationUrl}>
                  <Ticket className="mr-3 h-5 w-5" />
                  Register Now
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/20" />
      </div>
    </section>
  );
}
