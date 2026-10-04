import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ARTWORK_QUERY } from "@/sanity/lib/queries";
import ArtworkImages from "@/components/ArtworkImages";

export const revalidate = 60;

export default async function ArtworkPage({ params }) {
  const { slug } = await params;
  const artwork = await client.fetch(ARTWORK_QUERY, { slug });

  if (!artwork) notFound();

  const { title, year, description, image, moreImages } = artwork;

  // Main image first, then any extra images
  const images = [image, ...(moreImages ?? [])].map((img, index) => ({
    key: img._key ?? `image-${index}`,
    src: urlFor(img).width(1600).url(),
    thumb: urlFor(img).width(200).height(200).url(), // square crop using the hotspot
    alt: img.alt || title,
    width: img.asset.metadata.dimensions.width,
    height: img.asset.metadata.dimensions.height,
    lqip: img.asset.metadata.lqip,
  }));

  // Category-specific details, empty values are filtered out
  const details = [
    year,
    artwork.medium,
    artwork.camera,
    artwork.material,
    artwork.software,
    artwork.dimensions,
  ].filter(Boolean);

  return (
    <main className="container artwork-page">
      <Link href="/" className="back-link">
        ← Back to gallery
      </Link>

      <ArtworkImages images={images} />

      <div className="artwork-details">
        <h1>{title}</h1>
        {details.length > 0 && <p className="meta">{details.join(" · ")}</p>}
        {description && <p>{description}</p>}
      </div>
    </main>
  );
}
