import { defineQuery } from "next-sanity";

// Shared image projection: includes size and a tiny blur placeholder
const imageFields = `
  image{
    alt,
    asset->{ _id, metadata{ lqip, dimensions{ width, height } } }
  }
`;

export const PAINTINGS_QUERY = defineQuery(`
  *[_type == "painting" && defined(slug.current)] | order(year desc){
    _id,
    title,
    "slug": slug.current,
    year,
    ${imageFields}
  }
`);

export const PAINTING_QUERY = defineQuery(`
  *[_type == "painting" && slug.current == $slug][0]{
    title,
    year,
    medium,
    dimensions,
    description,
    ${imageFields}
  }
`);
