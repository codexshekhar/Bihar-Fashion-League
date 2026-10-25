import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Bihar Fashion League",
  description: "The story behind Bihar Fashion League - founded by Piyush Pratik to bring integrity and authentic opportunity to Bihar's fashion ecosystem.",
};

export default function AboutPage() {
  return (
    <main className="relative bg-white">
      <Header />

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/images/BFL_2025_12.jpeg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-48 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">The Story Behind BFL</h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
            An authentic platform for Bihar's fashion talent, built on integrity and real opportunity.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 items-center">
            <div className="order-last lg:order-first">
              <div className="relative h-[500px] rounded-3xl overflow-hidden border border-border shadow-2xl">
                <img
                  src="/images/BFL_2025_13.jpeg"
                  alt="Piyush Pratik - Bihar Fashion League Founder"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute -inset-px flex items-center justify-center rounded-[3rem] border border-black/10 pointer-events-none" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6 font-serif">Our Founder's Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                After spending a decade walking national runways and working alongside industry leaders,
                BFL founder <strong className="text-foreground">Piyush Pratik</strong> turned his vision toward his
                home state.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                He saw incredible raw talent in Bihar, but he also saw an ecosystem plagued by shortcuts and
                illegitimate pageants. Deciding it was time to change the narrative, Piyush built the Bihar Fashion
                League—a platform grounded in integrity, professional standards, and real opportunity.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                BFL isn't just an event; it's a movement to give Bihar's aspiring models and designers the authentic
                national stage they deserve.
              </p>
              <Button asChild size="lg" className="px-10 py-4">
                <Link href="/register/model">
                  Register as a Model <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Our Mission"
          description="Why Bihar Fashion League exists."
        />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-border bg-white">
            <h3 className="text-xl font-bold mb-4">Integrity First</h3>
            <p className="text-muted-foreground leading-relaxed">
              No shortcuts, no illegitimate pageants. BFL operates with transparency and professional standards at every level.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-border bg-white">
            <h3 className="text-xl font-bold mb-4">Real Opportunity</h3>
            <p className="text-muted-foreground leading-relaxed">
              Giving Bihar's aspiring models and designers an authentic national stage they can trust.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-border bg-white">
            <h3 className="text-xl font-bold mb-4">Professional Standards</h3>
            <p className="text-muted-foreground leading-relaxed">
              Built on a decade of national runway experience and industry leadership.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6 font-serif">Our Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Fashion is more than clothing—it is expression, identity, and culture. At Bihar Fashion League, we
                believe in creating spaces where emerging voices can be seen and celebrated.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                From the first sketch to the final walk down the runway, we support every step of the creative journey
                with integrity, inclusivity, and artistic excellence.
              </p>
              <Button asChild>
                <Link href="/participants">
                  Explore Participants <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-first lg:order-last">
              <div className="relative h-[500px] rounded-3xl overflow-hidden border border-border">
                <img
                  src="/images/BFL_2025_16.jpeg"
                  alt="Bihar Fashion League runway moment"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Value for Participants and Partners"
          description="What Bihar Fashion League offers to those who join our platform."
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-border">
              <h3 className="text-xl font-bold mb-4">For Participants</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary">●</span>
                  <span>Professional runway exposure on an authentic national stage</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">●</span>
                  <span>Portfolio development opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">●</span>
                  <span>Connections with designers and industry professionals</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-border">
              <h3 className="text-xl font-bold mb-4">For Partners</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary">●</span>
                  <span>Brand association with emerging fashion talent</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">●</span>
                  <span>Audience engagement across fashion events</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">●</span>
                  <span>Creative collaboration opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <div className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6 font-serif">Join the Movement</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Become part of Bihar Fashion League as a participant, partner, or collaborator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register/model">
                Register as a Model
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/partners">
                Partner With Us
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
