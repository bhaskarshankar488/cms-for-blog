import type { IconSearchResult } from "../types/icon.types";

export async function searchIcons(
  query: string
): Promise<IconSearchResult[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const response = await fetch(
    `https://api.iconify.design/search?query=${encodeURIComponent(
      normalizedQuery
    )}&limit=50`
  );

  if (!response.ok) {
    throw new Error("Failed to search icons");
  }

  const data = await response.json();

  return (data.icons ?? []).map((icon: string) => ({
    icon,
    label: icon
      .split(":")[1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
  }));
}
