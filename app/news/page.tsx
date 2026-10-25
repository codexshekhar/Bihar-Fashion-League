import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section, SectionHeader } from "@/components/ui/section";
import Image from "next/image";

export const metadata = {
  title: "News & Press | Bihar Fashion League",
  description: "Latest announcements, event updates, and press coverage from Bihar Fashion League.",
};

interface Article {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  publishedAt: string;
  slug: string;
  author: string;
  category: string;
}

const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Bihar Fashion Week 2024 Announces Emerging Designer Lineup",
    excerpt: "Discover the designers showcasing their collections at this year's Bihar Fashion Week, representing the next generation of regional fashion talent.",
    coverImage: "/images/BFL_2025_16.jpeg",
    coverImageAlt: "Bihar Fashion Week 2024",
    publishedAt: "October 20, 2024",
    slug: "bihar-fashion-week-2024-designer-lineup",
    author: "BFL Editorial Team",
    category: "Announcement",
  },
  {
    id: "2",
    title: "Behind the Scenes: Model Castings for Fashion Week 2024",
    excerpt: "A look at the model casting process and the emerging talent selected to walk the runway at Bihar Fashion Week.",
    coverImage: "/images/BFL_2025_13.jpeg",
    coverImageAlt: "Model castings",
    publishedAt: "October 15, 2024",
    slug: "behind-scenes-model-castings",
    author: "BFL Editorial Team",
    category: "Feature",
  },
  {
    id: "3",
    title: "Press Coverage: Bihar's Growing Fashion Scene",
    excerpt: "Media outlets across the region are taking notice of Bihar Fashion League's impact on the local fashion ecosystem.",
    coverImage: "/images/BFL_2025_17.jpeg",
    coverImageAlt: "Press coverage",
    publishedAt: "October 10, 2024",
    slug: "press-coverage-bihar-fashion",
    author: "BFL Editorial Team",
    category: "Press",
  },
];

export default function NewsPage() {
  return (
    <main className="relative bg-white">
      <Header />
      
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/images/BFL_2025_16.jpeg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-40 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">News &amp; Press</h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
            Latest announcements, event updates, and media coverage.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Latest Stories"
            description="Stay updated with Bihar Fashion League news and press coverage."
          />
          <div className="grid lg:grid-cols-3 gap-8">
            {MOCK_ARTICLES.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}

function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/news/${article.slug}`} className="block group">
      <div className="overflow-hidden rounded-3xl border border-border bg-white hover:shadow-xl transition-[color,background-color,border-color] duration-300">
        <div className="h-48 overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.coverImageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">{article.category}</span>
            <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">{article.author}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-primary hover:underline">Read more</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
