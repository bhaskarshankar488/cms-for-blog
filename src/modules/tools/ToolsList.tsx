import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"

export default function ToolsList() {
  const [tools, setTools] = useState<any[]>([])
  const navigate = useNavigate()

  const fetchTools = async () => {
    try {
      const res = await axios.get("/tools")
      setTools(res.data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTools()
  }, [])

  // 🔴 DELETE TOOL
  const deleteTool = async (id: string) => {
    if (!confirm("Delete this tool?")) return

    try {
      await axios.delete(`/tools/${id}`)
      fetchTools()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Tools</h1>

        <button
          onClick={() => navigate("/tools/new")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Create Tool
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tools.map((tool) => (
              <tr key={tool._id} className="border-t">

                <td className="p-4">{tool.name}</td>
                <td className="p-4 text-gray-500">{tool.brand}</td>

                <td className="p-4 space-x-3">

                  {/* EDIT */}
                  <button
                    onClick={() => navigate(`/tools/edit/${tool._id}`)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteTool(tool._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}