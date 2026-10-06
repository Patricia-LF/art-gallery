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

// Only return category-specific fields that belong to this category
export const ARTWORK_QUERY = defineQuery(`
  *[_type == "artwork" && slug.current == $slug][0]{
    title,
    category,
    year,
    description,
    "medium": select(category == "painting" => medium),
    "camera": select(category == "photography" => camera),
    "material": select(category == "sculpture" => material),
    "software": select(category == "3d" => software),
    "dimensions": select(category in ["painting", "sculpture"] => dimensions),
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
