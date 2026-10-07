import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { ARTWORKS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import { CATEGORIES, getCategory } from "@/lib/categories";
import ArtworkCard from "@/components/ArtworkCard";

export const revalidate = 60;

// Pre-render one page per category at build time
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.value }));
}

export default async function CategoryPage({ params }) {
  const { category: categoryValue } = await params;
  const category = getCategory(categoryValue);

  if (!category) notFound();

  const artworks = await client.fetch(ARTWORKS_BY_CATEGORY_QUERY, {
    category: category.value,
  });

  return (
    <main className="container">
      <Link href="/" className="back-link">
        <img src="/arrow-back.svg"></img> All categories
      </Link>

      <header className="site-header">
        <h1>{category.title}</h1>
      </header>

      {artworks.length > 0 ? (
        <section className="gallery">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork._id} artwork={artwork} />
          ))}
        </section>
      ) : (
        <p className="empty-message">Nothing here yet.</p>
      )}
    </main>
  );
}
