import { defineQuery } from "next-sanity";

// Shared fields for every image: alt text, size and blur placeholder
const imageProjection = `{
  _key,
  alt,
  asset->{ _id, metadata{ lqip, dimensions{ width, height } } }
}`;

export const ARTWORKS_QUERY = defineQuery(`
  *[_type == "artwork" && defined(slug.current)] | order(year desc){
    _id,
    title,
    "slug": slug.current,
    category,
    year,
    image${imageProjection}
  }
`);

export const ARTWORK_QUERY = defineQuery(`
  *[_type == "artwork" && slug.current == $slug][0]{
    title,
    category,
    year,
    medium,
    camera,
    material,
    software,
    dimensions,
    description,
    image${imageProjection},
    moreImages[]${imageProjection}
  }
`);

// Every artwork's category and image, used to build the category cards
export const CATEGORY_COVERS_QUERY = defineQuery(`
  *[_type == "artwork" && defined(slug.current)]
    | order(coalesce(featured, false) desc, year desc){
      category,
      image${imageProjection}
    }
`);

// All artworks in one category
export const ARTWORKS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "artwork" && category == $category && defined(slug.current)] | order(year desc){
    _id,
    title,
    "slug": slug.current,
    year,
    image${imageProjection}
  }
`);
