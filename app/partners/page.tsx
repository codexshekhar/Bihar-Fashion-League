import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Partners | Bihar Fashion League",
  description: "Partner with Bihar Fashion League - sponsorship and collaboration opportunities for brands and designers.",
};

export default function PartnersPage() {
  return (
    <main className="relative bg-white">
      <Header />
      
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/images/BFL_2025_16.jpeg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-40 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Partner With BFL</h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
            Collaborate with us to shape the future of fashion in Bihar.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Why Partner With BFL?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Bihar Fashion League connects your brand with emerging fashion talent, creative professionals, and an engaged audience passionate about style and culture.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-primary">★</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Brand Visibility</h3>
                    <p className="text-sm text-muted-foreground">Showcase your brand across runway shows, event materials, and digital channels.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-primary">★</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Talent Access</h3>
                    <p className="text-sm text-muted-foreground">Connect with emerging designers, models, and creative professionals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-primary">★</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Community Impact</h3>
                    <p className="text-sm text-muted-foreground">Support the growth of Bihar's fashion ecosystem and creative community.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-8 rounded-2xl border border-border bg-white">
                <h3 className="text-xl font-bold mb-4">Partnership Categories</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-border">
                    <h4 className="font-bold mb-1">Title Sponsor</h4>
                    <p className="text-sm text-muted-foreground">Premier partnership with maximum brand visibility across all event touchpoints.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border">
                    <h4 className="font-bold mb-1">Event Partner</h4>
                    <p className="text-sm text-muted-foreground">Collaborate on specific shows, showcases, or event segments.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border">
                    <h4 className="font-bold mb-1">Media Partner</h4>
                    <p className="text-sm text-muted-foreground">Amplify event coverage through media channels and press outreach.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border">
                    <h4 className="font-bold mb-1">Collaborator</h4>
                    <p className="text-sm text-muted-foreground">Creative collaborations with designers, photographers, and artists.</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="w-full" asChild>
                <Link href="/contact">Send Partnership Inquiry</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
