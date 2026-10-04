import { defineField, defineType } from "sanity";

export const artworkType = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Painting", value: "painting" },
          { title: "Photography", value: "photography" },
          { title: "Sculpture", value: "sculpture" },
          { title: "3D (Blender)", value: "3d" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),

    // Only shown for paintings
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      options: {
        list: ["Oil", "Acrylic", "Watercolor", "Pastel", "Mixed media"],
      },
      hidden: ({ document }) => document?.category !== "painting",
    }),

    // Only shown for photos
    defineField({
      name: "camera",
      title: "Camera",
      type: "string",
      hidden: ({ document }) => document?.category !== "photography",
    }),

    // Only shown for sculptures
    defineField({
      name: "material",
      title: "Material",
      type: "string",
      hidden: ({ document }) => document?.category !== "sculpture",
    }),

    // Only shown for 3D work
    defineField({
      name: "software",
      title: "Software",
      type: "string",
      initialValue: "Blender",
      hidden: ({ document }) => document?.category !== "3d",
    }),

    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: "For example: 40 × 50 cm",
      hidden: ({ document }) =>
        !["painting", "sculpture"].includes(document?.category),
    }),

    // Extra images, useful for sculptures seen from different angles
    defineField({
      name: "moreImages",
      title: "More images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
