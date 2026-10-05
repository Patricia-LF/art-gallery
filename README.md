# Art Gallery

A gallery of my own artwork – paintings, photography, sculpture and 3D work made in Blender – built with Next.js and Sanity as a headless CMS.

I built this project to practice Sanity: modelling content with schemas, managing it in an embedded Studio and fetching it with GROQ in a Next.js frontend.

## Features

- Masonry gallery where each artwork keeps its original proportions
- Four categories: painting, photography, sculpture and 3D (Blender)
- Category-specific fields in the Studio, for example medium for paintings, camera for photos and software for 3D work
- A separate page for each artwork with year, details and description
- Several images per artwork, with clickable thumbnails to switch between them
- Embedded Sanity Studio at `/studio` for adding and editing artworks
- Optimized images from the Sanity CDN with a blurred placeholder while loading
- Alt text on every image for screen readers

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [Sanity](https://www.sanity.io) with `next-sanity`
- [`@sanity/image-url`](https://www.sanity.io/docs/image-url) for image URLs
- GROQ for queries
- Plain CSS

## Project structure

```
art-gallery/
├── sanity.config.js                  # Studio configuration
├── next.config.mjs                   # Allows images from cdn.sanity.io
├── .env                              # Sanity project ID and dataset (not committed)
├── LICENSE                           # MIT license for the source code
└── src/
    ├── app/
    │   ├── page.jsx                  # Home page with the gallery grid
    │   ├── layout.js                 # Root layout
    │   ├── globals.css               # Global styles
    │   ├── artworks/
    │   │   └── [slug]/
    │   │       └── page.jsx          # Page for a single artwork
    │   └── studio/
    │       └── [[...tool]]/
    │           └── page.jsx          # Embedded Sanity Studio
    ├── components/
    │   ├── ArtworkCard.jsx           # Card used in the gallery grid
    │   └── ArtworkImages.jsx         # Main image and thumbnails on the artwork page
    └── sanity/
        ├── lib/
        │   ├── client.js             # Sanity client
        │   ├── image.js              # urlFor() image helper
        │   └── queries.js            # GROQ queries
        └── schemaTypes/
            ├── index.js              # Collects all schema types
            └── artworkType.js        # Artwork document schema
```

## Content model

Each artwork is an `artwork` document. Some fields only show up in the Studio for the categories they belong to.

| Field         | Type   | Shown for           | Description                                |
| ------------- | ------ | ------------------- | ------------------------------------------ |
| `title`       | string | All                 | Name of the artwork (required)             |
| `slug`        | slug   | All                 | Generated from the title, used in the URL  |
| `category`    | string | All                 | Painting, photography, sculpture or 3D     |
| `image`       | image  | All                 | Main image, with hotspot and alt text      |
| `year`        | number | All                 | Year it was made                           |
| `medium`      | string | Painting            | Oil, acrylic, watercolor, gouache or mixed |
| `camera`      | string | Photography         | Camera used                                |
| `material`    | string | Sculpture           | For example clay, wood or stone            |
| `software`    | string | 3D                  | Defaults to Blender                        |
| `dimensions`  | string | Painting, sculpture | For example `40 × 50 cm`                   |
| `moreImages`  | array  | All                 | Extra images, such as details or angles    |
| `description` | text   | All                 | A few words about the artwork              |

## Getting started

### 1. Clone the repo and install dependencies

```bash
git clone https://github.com/Patricia-LF/art-gallery.git
cd art-gallery
npm install
```

### 2. Set up a Sanity project

Create a project at [sanity.io/manage](https://www.sanity.io/manage) if you don't have one. Then add `http://localhost:3000` under **API → CORS origins** with **Allow credentials** checked.

### 3. Add environment variables

Create a `.env` file in the project root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
```

You'll find the project ID on your project page at sanity.io/manage.

### 4. Start the development server

```bash
npm run dev
```

- Gallery: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

### 5. Add artworks

Log in to the Studio and create a new **Artwork** document. Choose a category, upload a main image, generate the slug and fill in the fields that show up for that category. Add extra images under **More images** if you like, then click **Publish**. Only published artworks show up in the gallery.

## License

The source code is licensed under the [MIT License](LICENSE).

All artworks shown on the site (paintings, photographs, sculptures and 3D work) are © Patricia Loayza Frykberg. All rights reserved. They may not be used, copied or distributed without permission.
