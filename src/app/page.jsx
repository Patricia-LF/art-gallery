import { client } from "@/sanity/lib/client";
import { CATEGORY_COVERS_QUERY } from "@/sanity/lib/queries";
import { CATEGORIES } from "@/lib/categories";
import CategoryCard from "@/components/CategoryCard";

export const revalidate = 60;

export default async function Home() {
  const artworks = await client.fetch(CATEGORY_COVERS_QUERY);

  // Three images from each category becomes the cover, empty categories are hidden
  const categories = CATEGORIES.map((category) => {
    const items = artworks.filter(
      (artwork) => artwork.category === category.value,
    );
    return {
      ...category,
      count: items.length,
      covers: items.slice(0, 3).map((item) => item.image), // newest three
    };
  }).filter((category) => category.count > 0);

  return (
    <main className="container">
      <header className="site-header">
        <h1>Art Gallery</h1>
        <p>by Patricia Loayza Frykberg</p>
      </header>

      <section className="category-grid">
        {categories.map((category) => (
          <CategoryCard key={category.value} category={category} />
        ))}
      </section>
    </main>
  );
}
