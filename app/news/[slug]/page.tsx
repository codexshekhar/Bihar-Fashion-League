import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Bihar Fashion Week 2024 Designer Lineup | Bihar Fashion League",
  description: "Discover the designers showcasing at Bihar Fashion Week 2024.",
};

export default function NewsDetailPage() {
  return (
    <main className="relative bg-white">
      <Header />
      
      <article className="relative bg-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/BFL_2025_16.jpeg')] bg-cover bg-center opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent/40" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium mb-6">
                Announcement
              </span>
              <h1 className="text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Bihar Fashion Week 2024 Announces Emerging Designer Lineup
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl">
                Discover the designers showcasing their collections at this year's Bihar Fashion Week, representing the next generation of regional fashion talent.
              </p>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <span>October 20, 2024</span>
                <span>·</span>
                <span>BFL Editorial Team</span>
              </div>
            </div>
          </div>
        </section>

        <Section>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p className="text-lg font-semibold text-foreground mb-6">
                Bihar Fashion League is proud to announce the designer lineup for Bihar Fashion Week 2024, taking place November 15-17 in Patna.
              </p>
              <p>
                This year's edition features emerging designers from across Bihar, each bringing a unique perspective to contemporary fashion. From sustainable textiles to modern silhouettes, the collections represent the diversity and creativity of the region's fashion ecosystem.
              </p>
              <p>
                The runway shows will be accompanied by special performances, showstopper appearances, and curated installations celebrating Bihar's rich textile heritage reimagined for a modern audience.
              </p>
              <p>
                Tickets and registration information will be available soon. Follow Bihar Fashion League for updates on participating designers, schedule announcements, and event details.
              </p>
            </div>
            
            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="text-2xl font-bold mb-6">Related Stories</h2>
              <div className="space-y-4">
                <Link href="/news/behind-scenes-model-castings" className="block">
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">
                      <Image src="/images/BFL_2025_13.jpeg" alt="Related" className="h-20 w-24 object-cover rounded-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Behind the Scenes: Model Castings</p>
                      <p className="text-xs font-medium text-primary">October 15, 2024</p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Section>

        <Link href="/news" className="block mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Button variant="outline" asChild>
            <Link href="/news">
              <ArrowRight className="-mr-1 h-4 w-4" />
              Back to News
            </Link>
          </Button>
        </Link>
      </article>

      <Footer />
    </main>
  );
}
