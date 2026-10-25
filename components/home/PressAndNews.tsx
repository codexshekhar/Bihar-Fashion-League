import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NewsArticleProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  publishedAt: string;
  slug: string;
}

export function NewsCard({
  id,
  title,
  excerpt,
  coverImage,
  coverImageAlt,
  publishedAt,
  slug,
}: NewsArticleProps) {
  return (
    <Link href={`/news/${slug}`} className="block group">
      <div className="relative overflow-hidden border-b border-black/10 pb-12 pt-12 group">
        <div className="relative h-80 lg:h-96 rounded-[2rem] overflow-hidden mb-8 group-hover:scale-[1.02] transition-transform duration-700">
          <img
            src={coverImage}
            alt={coverImageAlt}
            className="h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-6 left-6 z-10">
            <time className="px-3 py-1.5 rounded-full bg-black text-[10px] font-medium text-white uppercase tracking-widest backdrop-blur-sm">
              {new Date(publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {excerpt}
            </p>
          </div>
          <div className="flex-shrink-0">
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PressAndNewsSection({
  articles = [],
}: {
  articles?: Array<NewsArticleProps>;
}) {
  return (
    <section className="relative py-32 lg:py-48 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-end lg:items-start gap-12 mb-20">
          <div>
            <h2 className="text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter mb-6">
              Press &amp; News
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Latest announcements and media coverage.
            </p>
          </div>
          <Link href="/gallery" className="text-sm font-medium text-primary hover:text-primary/80 relative group">
            View All News <ArrowRight className="ml-3 h-5 w-5 text-primary group-hover:text-primary/80 transition-colors" />
          </Link>
        </div>

        <div className="space-y-0">
          {articles.length > 0 ? (
            articles.map((a) => <NewsCard key={a.id} {...a} />)
          ) : (
            <div className="border-b border-black/10 py-24 text-center">
              <p className="text-lg text-muted-foreground">
                No news articles available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/20" />
    </section>
  );
}
