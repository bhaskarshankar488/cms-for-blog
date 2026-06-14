import type { IconSearchResult } from "../types/icon.types";

import icons from "../data/icons.json";

const ICONS: IconSearchResult[] = icons;

export async function searchIcons(query: string): Promise<IconSearchResult[]> {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return ICONS;
  }

  return ICONS.filter(({ icon, label }) => {
    return (
      icon.toLowerCase().includes(normalizedQuery) ||
      label.toLowerCase().includes(normalizedQuery)
    );
  });
}
