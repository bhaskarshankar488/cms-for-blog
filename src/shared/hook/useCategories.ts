// src/shared/hooks/useCategories.ts

import { useEffect, useState } from "react";
import { getCategories } from "../services/category.service";

interface Category {
  _id: string;
  name: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await getCategories();

        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
  };
}