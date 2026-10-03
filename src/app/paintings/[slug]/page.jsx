import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PAINTING_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function PaintingPage({ params }) {
  const { slug } = await params;
  const painting = await client.fetch(PAINTING_QUERY, { slug });

  if (!painting) notFound();

  const { title, year, medium, dimensions, description, image } = painting;
  const { width, height } = image.asset.metadata.dimensions;

  return (
    <main className="container painting-page">
      <Link href="/" className="back-link">
        ← Back to gallery
      </Link>

      <Image
        src={urlFor(image).width(1600).url()}
        alt={image.alt || title}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={image.asset.metadata.lqip}
        sizes="100vw"
        priority
      />

      <div className="painting-details">
        <h1>{title}</h1>
        <p className="meta">
          {[year, medium, dimensions].filter(Boolean).join(" · ")}
        </p>
        {description && <p>{description}</p>}
      </div>
    </main>
  );
}
