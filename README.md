# Painting Gallery

A gallery of my own paintings, built with Next.js and Sanity as a headless CMS.

I built this project to practice Sanity: modelling content with schemas, managing it in an embedded Studio and fetching it with GROQ in a Next.js frontend.

## Features

- Masonry gallery where each painting keeps its original proportions
- A separate page for each painting with year, medium, dimensions and description
- Embedded Sanity Studio at `/studio` for adding and editing paintings
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
painting-gallery/
├── sanity.config.js                  # Studio configuration
├── next.config.mjs                   # Allows images from cdn.sanity.io
├── .env                              # Sanity project ID and dataset (not committed)
└── src/
    ├── app/
    │   ├── page.jsx                  # Home page with the gallery grid
    │   ├── layout.js                 # Root layout
    │   ├── globals.css               # Global styles
    │   ├── paintings/
    │   │   └── [slug]/
    │   │       └── page.jsx          # Page for a single painting
    │   └── studio/
    │       └── [[...tool]]/
    │           └── page.jsx          # Embedded Sanity Studio
    ├── components/
    │   └── PaintingCard.jsx          # Card used in the gallery
    └── sanity/
        ├── lib/
        │   ├── client.js             # Sanity client
        │   ├── image.js              # urlFor() image helper
        │   └── queries.js            # GROQ queries
        └── schemaTypes/
            ├── index.js              # Collects all schema types
            └── paintingType.js       # Painting document schema
```

## Content model

Each painting is a `painting` document with these fields:

| Field         | Type   | Description                                |
| ------------- | ------ | ------------------------------------------ |
| `title`       | string | Name of the painting (required)            |
| `slug`        | slug   | Generated from the title, used in the URL  |
| `image`       | image  | The painting, with hotspot and alt text    |
| `year`        | number | Year it was painted                        |
| `medium`      | string | Oil, acrylic, watercolor, gouache or mixed |
| `dimensions`  | string | For example `40 × 50 cm`                   |
| `description` | text   | A few words about the painting             |

## Getting started

### 1. Clone the repo and install dependencies

```bash
git clone https://github.com/Patricia-LF/painting-gallery.git
cd painting-gallery
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

### 5. Add paintings

Log in to the Studio, create a new **Painting** document, upload an image, generate the slug and click **Publish**. Only published paintings show up in the gallery.

## Author

Patricia Loayza Frykberg
[GitHub](https://github.com/Patricia-LF) · [Portfolio](https://patriciafrykberg.se/portfolio)
