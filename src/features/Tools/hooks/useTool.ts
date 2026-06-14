import { useEffect, useState } from "react";

import { getTool }
from "../service/tool.service";

import type { ToolFormData } from "../types/tool.types";

export function useTool(
  id?: string
) {

 const [tool, setTool] =
  useState<ToolFormData | undefined>();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!id) return;

    const fetchTool =
      async () => {

        try {

          const res =
            await getTool(id);

          setTool(
            res.data.data
          );

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);
        }
      };

    fetchTool();

  }, [id]);

  return {
    tool,
    loading,
  };
}