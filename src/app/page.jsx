import { client } from "@/sanity/lib/client";
import { PAINTINGS_QUERY } from "@/sanity/lib/queries";
import PaintingCard from "@/components/PaintingCard";

export const revalidate = 60; // refetch at most once a minute

export default async function Home() {
  const paintings = await client.fetch(PAINTINGS_QUERY);

  return (
    <main className="container">
      <header className="site-header">
        <h1>Paintings</h1>
        <p>by Patricia Loayza Frykberg</p>
      </header>

      <section className="gallery">
        {paintings.map((painting) => (
          <PaintingCard key={painting._id} painting={painting} />
        ))}
      </section>
    </main>
  );
}
