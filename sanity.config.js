"use client";

import { schemaTypes } from "@/sanity/schemaTypes";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export default defineConfig({
  title: "My studio",

  basePath: "/studio",
  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
