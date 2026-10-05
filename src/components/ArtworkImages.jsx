"use client";

import { useState } from "react";
import Image from "next/image";

export default function ArtworkImages({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  return (
    <div className="artwork-images">
      <div
        className="artwork-main"
        style={{ "--ratio": active.width / active.height }}
      >
        <Image
          key={active.key}
          src={active.src}
          alt={active.alt}
          width={active.width}
          height={active.height}
          placeholder="blur"
          blurDataURL={active.lqip}
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
          className="artwork-main-image"
        />
      </div>

      {/* Only show thumbnails when there is more than one image */}
      {images.length > 1 && (
        <ul className="thumbnails">
          {images.map((image, index) => (
            <li key={image.key}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-current={index === activeIndex}
                className="thumbnail"
              >
                <Image src={image.thumb} alt="" width={100} height={100} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
