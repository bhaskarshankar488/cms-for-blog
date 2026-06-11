interface Props {
  toolSearch: string
  setToolSearch: React.Dispatch<
    React.SetStateAction<string>
  >

  searchTools: (
    query: string
  ) => void

  toolResults: any[]

  addTool: (
    tool: any
  ) => void

  tools: any[]

  removeTool: (
    index: number
  ) => void

  form: any

  setForm: React.Dispatch<
    React.SetStateAction<any>
  >
}

export default function ToolSection({
  toolSearch,
  setToolSearch,
  searchTools,
  toolResults,
  addTool,
  tools,
  removeTool,
  form,
  setForm,
}: Props) {
  return (
    <>
      {/* TOOLS */}
      <h2 className="text-lg sm:text-xl font-semibold">
        Tools
      </h2>

      {/* SEARCH */}
      <input
        placeholder="Search tools..."
        className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
        value={toolSearch}
        onChange={(e) => {
          setToolSearch(
            e.target.value
          )

          searchTools(
            e.target.value
          )
        }}
      />

      {/* SEARCH RESULTS */}
      {toolResults.length > 0 && (
        <div className="border rounded max-h-40 overflow-y-auto bg-white">

          {toolResults.map(
            (tool) => (
              <div
                key={tool._id}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                onClick={() =>
                  addTool(tool)
                }
              >
                {tool.name}
              </div>
            )
          )}

        </div>
      )}

      {/* SELECTED TOOLS */}
      <div className="space-y-4">

        {tools.map(
          (
            tool: any,
            index: number
          ) => (
            <div
              key={index}
              className="border p-3 sm:p-4 rounded"
            >
              <h3 className="font-semibold text-base sm:text-lg">
                {tool.name}
              </h3>

              <textarea
                placeholder="Custom Description"
                className="w-full mt-2 p-2 sm:p-3 border rounded text-sm sm:text-base"
                value={
                  tool.customDescription
                }
                onChange={(e) => {

                  const updated = [
                    ...form.tools,
                  ]

                  updated[
                    index
                  ].customDescription =
                    e.target.value

                  setForm({
                    ...form,
                    tools: updated,
                  })
                }}
              />

              <button
                type="button"
                className="text-red-600 mt-2 text-sm"
                onClick={() =>
                  removeTool(index)
                }
              >
                Remove
              </button>
            </div>
          )
        )}

      </div>
    </>
  )
}