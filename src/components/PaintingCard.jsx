import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default function PaintingCard({ painting }) {
  const { title, slug, year, image } = painting;
  const { width, height } = image.asset.metadata.dimensions;

  return (
    <Link href={`/paintings/${slug}`} className="card">
      <Image
        src={urlFor(image).width(800).url()}
        alt={image.alt || title}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={image.asset.metadata.lqip}
        sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
      />
      <div className="card-info">
        <h2>{title}</h2>
        {year && <span>{year}</span>}
      </div>
    </Link>
  );
}
