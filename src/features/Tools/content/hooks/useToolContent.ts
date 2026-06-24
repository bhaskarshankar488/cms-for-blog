import { useEffect, useState } from "react";

import { createEmptyToolContent } from "../constants/toolContent.initial";
import { getToolContent } from "../service/toolContent.service";
import type { ToolContent } from "../types/toolContent.types";
import { transformToolContent } from "../transformers/toolContent.transform";

export function useToolContent(
  toolId?: string
) {
  const [content, setContent] =
    useState<ToolContent>(
      createEmptyToolContent(toolId || "")
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!toolId) {
      setLoading(false);
      return;
    }

    const fetchToolContent =
      async () => {
        try {
          setLoading(true);
          setError(null);

          const res =
            await getToolContent(toolId);

          const transformedData =
            transformToolContent(
              res.data.data
            );

          setContent({
            ...createEmptyToolContent(toolId),
            ...transformedData,
            toolId,
          });
        } catch (fetchError) {
          console.error(fetchError);
          setError("Unable to load tool content");
          setContent(createEmptyToolContent(toolId));
        } finally {
          setLoading(false);
        }
      };

    fetchToolContent();
  }, [toolId]);

  return {
    content,
    setContent,
    loading,
    error,
  };
}
