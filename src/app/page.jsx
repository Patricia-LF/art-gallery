import { client } from "@/sanity/lib/client";
import { ARTWORKS_QUERY } from "@/sanity/lib/queries";
import ArtworkCard from "@/components/ArtworkCard";

export const revalidate = 60; // refetch at most once a minute

export default async function Home() {
  const artworks = await client.fetch(ARTWORKS_QUERY);

  return (
    <main className="container">
      <header className="site-header">
        <h1>My Artwork</h1>
        <p>by Patricia Loayza Frykberg</p>
      </header>

      <section className="gallery">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork._id} artwork={artwork} />
        ))}
      </section>
    </main>
  );
}
