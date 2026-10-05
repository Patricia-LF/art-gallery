import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default function CategoryCard({ category }) {
  const { value, title, count, covers } = category;

  return (
    <Link href={`/category/${value}`} className="category-card">
      <div className="card-stack">
        {covers.map((cover, index) => (
          <div key={cover.asset._id} className="stack-image">
            <Image
              src={urlFor(cover).width(600).height(750).url()} // portrait crop using the hotspot
              alt=""
              fill
              placeholder="blur"
              blurDataURL={cover.asset.metadata.lqip}
              sizes="(max-width: 600px) 80vw, (max-width: 1000px) 40vw, 20vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="category-card-info">
        <h2>{title}</h2>
        <span>
          {count} {count === 1 ? "work" : "works"}
        </span>
      </div>
    </Link>
  );
}
