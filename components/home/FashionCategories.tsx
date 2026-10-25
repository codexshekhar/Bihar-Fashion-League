import Link from "next/link";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export function CategoryCard({
  id,
  name,
  description,
  imageUrl,
  imageAlt,
}: CategoryCardProps) {
  return (
    <Link href={`/categories/${id}`} className="block group">
      <div className="relative h-[500px] lg:h-[600px] overflow-hidden border-b border-black/10 pb-16 pt-16 group">
        <div
          className="absolute inset-0 bg-cover bg-center rounded-[2rem] overflow-hidden group-hover:scale-[1.03] transition-transform duration-700"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-8 left-8 z-10">
          <span className="text-[11px] font-medium text-white uppercase tracking-widest bg-black/60 px-4 py-2 backdrop-blur-sm rounded-full">
            {name}
          </span>
        </div>
      </div>
      <div className="mt-12">
        <h3 className="text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
          {description}
        </p>
      </div>
    </Link>
  );
}

export function FashionCategoriesSection({
  categories = [],
}: {
  categories?: Array<{
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
  }>;
}) {
  return (
    <section className="relative py-32 lg:py-48 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-start text-center lg:text-start max-w-3xl mx-auto mb-24">
          <h2 className="text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter mb-8">
            Fashion Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {categories.length > 0 ? (
            categories.map((c) => <CategoryCard key={c.id} {...c} />)
          ) : (
            <div className="col-span-full text-center py-24">
              <p className="text-lg text-muted-foreground">
                Fashion categories will be announced soon.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/20" />
    </section>
  );
}
