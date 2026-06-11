import axios from "../../../api/axios";

import {searchToolsApi} from "../services/tool.service"

export function useToolManager(
  form: any,
  setForm: any,
  setToolResults: any,
  setToolSearch: any
) {

  const searchTools =
    async (query: string) => {

      if (!query) {
        setToolResults([]);
        return;
      }

      try {

        const res = await searchToolsApi(query);

        setToolResults(
          res.data.data || []
        );

      } catch (err) {

        console.error(err);

      }
    };

  const addTool = (
    tool: any
  ) => {

    if (
      form.tools.find(
        (t: any) =>
          t.toolId === tool._id
      )
    ) {
      return;
    }

    setForm({
      ...form,

      tools: [
        ...form.tools,

        {
          toolId: tool._id,
          name: tool.name,
          image: tool.image,
          customDescription: "",
        },
      ],
    });

    setToolResults([]);
    setToolSearch("");
  };

  const removeTool = (
    index: number
  ) => {

    const updated =
      [...form.tools];

    updated.splice(index, 1);

    setForm({
      ...form,
      tools: updated,
    });
  };

  return {
    searchTools,
    addTool,
    removeTool,
  };
}