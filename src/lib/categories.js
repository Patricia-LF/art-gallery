// Single source of truth for categories, used by both the schema and the site
export const CATEGORIES = [
  { value: "painting", title: "Paintings" },
  { value: "photography", title: "Photographs" },
  { value: "sculpture", title: "Sculptures" },
  { value: "3d", title: "3D (Blender)" },
];

export function getCategory(value) {
  return CATEGORIES.find((category) => category.value === value);
}
