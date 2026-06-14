import { useCallback, useState } from "react";

import { searchIcons } from "../services/icon.service";
import type { IconSearchResult } from "../types/icon.types";

interface UseIconSearchResult {
  loading: boolean;
  results: IconSearchResult[];
  search: (query: string) => Promise<void>;
}

export function useIconSearch(): UseIconSearchResult {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IconSearchResult[]>([]);

  const search = useCallback(async (query: string) => {
    setLoading(true);

    try {
      const icons = await searchIcons(query);
      setResults(icons);
    } catch (error) {
      console.error("Icon search failed", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    results,
    search,
  };
}
