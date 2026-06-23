import { useState } from "react";

import { searchToolsApi }
from "../service/alternative.service";

import toast from "react-hot-toast";

import type {
  AlternativeFormData,
  ToolSearchResult,
} from "../types/alternative.types";

interface Props {
  formData: AlternativeFormData;

  setFormData: React.Dispatch<
    React.SetStateAction<
      AlternativeFormData
    >
  >;
}

const AlternativeToolsSection = ({
  formData,
  setFormData,
}: Props) => {
  const [
    search,
    setSearch,
  ] = useState("");

  const [
    results,
    setResults,
  ] = useState<
    ToolSearchResult[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleSearch =
    async (
      value: string
    ) => {
      setSearch(value);

      if (
        value.trim().length < 2
      ) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const tools =
          await searchToolsApi(
            value
          );

        setResults(tools);
      } catch (
        error
      ) {
        console.error(
          "Tool search failed:",
          error
        );

        setResults([]);
      } finally {
        setLoading(false);
      }
    };

  const addTool = (
    tool: ToolSearchResult
  ) => {
    if (
  tool._id ===
  formData.toolId
) {
  toast.error(
    "Main tool cannot be added as an alternative tool"
  );

  return;
}

    const exists =
      formData.tools.some(
        (item) =>
          item.toolId ===
          tool._id
      );

    if (exists) {
      return;
    }

    setFormData(
      (prev) => ({
        ...prev,

        tools: [
          ...prev.tools,

          {
            toolId:
              tool._id,

            toolName:
              tool.name,

            brand:
              tool.brand,

            customDescription:
              "",

            position:
              prev.tools
                .length + 1,
          },
        ],
      })
    );

    setSearch("");
    setResults([]);
  };

  const updateTool = (
    index: number,
    value: string
  ) => {
    setFormData(
      (prev) => ({
        ...prev,

        tools:
          prev.tools.map(
            (
              item,
              i
            ) =>
              i === index
                ? {
                    ...item,
                    customDescription:
                      value,
                  }
                : item
          ),
      })
    );
  };

  const removeTool = (
    index: number
  ) => {
    setFormData(
      (prev) => {
        const updatedTools =
          prev.tools
            .filter(
              (
                _,
                i
              ) =>
                i !== index
            )
            .map(
              (
                tool,
                position
              ) => ({
                ...tool,
                position:
                  position + 1,
              })
            );

        return {
          ...prev,
          tools:
            updatedTools,
        };
      }
    );
  };

  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Alternative Tools
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Search and add tools
          to this alternatives
          page.
        </p>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          value={search}
          placeholder="Search tools..."
          onChange={(e) =>
            handleSearch(
              e.target.value
            )
          }
          className="w-full rounded-md border px-3 py-2"
        />

        {loading && (
          <p className="mt-2 text-sm text-gray-500">
            Searching...
          </p>
        )}

        {results.length >
          0 && (
          <div className="mt-2 overflow-hidden rounded-md border">
            {results.map(
              (
                tool
              ) => (
                <button
                  key={
                    tool._id
                  }
                  type="button"
                  onClick={() =>
                    addTool(
                      tool
                    )
                  }
                  className="block w-full border-b px-4 py-3 text-left hover:bg-gray-50"
                >
                  <div className="font-medium">
                    {
                      tool.name
                    }
                  </div>

                  <div className="text-sm text-gray-500">
                    {
                      tool.brand
                    }
                  </div>
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Empty State */}
      {formData.tools.length ===
        0 && (
        <div className="mt-6 rounded-lg border border-dashed p-6 text-center text-gray-500">
          Search and select
          tools to build your
          alternatives list.
        </div>
      )}

      {/* Selected Tools */}
      <div className="mt-8 space-y-4">
        {formData.tools.map(
          (
            tool,
            index
          ) => (
            <div
              key={
                tool.toolId
              }
              className="rounded-lg border bg-gray-50 p-4"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {
                      tool.toolName
                    }
                  </h3>

                  <p className="text-sm text-gray-500">
                    {
                      tool.brand
                    }
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeTool(
                      index
                    )
                  }
                  className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Custom
                  Description
                </label>

                <textarea
                  rows={3}
                  value={
                    tool.customDescription
                  }
                  onChange={(
                    e
                  ) =>
                    updateTool(
                      index,
                      e
                        .target
                        .value
                    )
                  }
                  placeholder="Enter custom description..."
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default AlternativeToolsSection;