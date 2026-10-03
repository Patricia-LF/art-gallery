import { defineField, defineType } from "sanity";

export const paintingType = defineType({
  name: "painting",
  title: "Painting",
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
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the painting for screen readers",
        }),
      ],
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      options: {
        list: [
          { title: "Oil", value: "oil" },
          { title: "Acrylic", value: "acrylic" },
          { title: "Watercolor", value: "watercolor" },
          { title: "Pastel", value: "pastel" },
          { title: "Mixed media", value: "mixed-media" },
        ],
      },
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: "For example: 40 × 50 cm",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
  ],
  // How each painting is shown in the Studio list
  preview: {
    select: { title: "title", subtitle: "year", media: "image" },
  },
});
