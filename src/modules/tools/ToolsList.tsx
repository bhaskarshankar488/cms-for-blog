import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"

export default function ToolsList() {
  const [tools, setTools] = useState<any[]>([])

  // ALERT MESSAGE
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("")

  // DELETE MODAL
  const [deleteId, setDeleteId] = useState<string | null>(null)

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

  // FINAL DELETE
  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      const res = await axios.delete(`/tools/${deleteId}`)

      setMessage(res.data.message)
      setMessageType("success")

      fetchTools()
    } catch (err: any) {
      console.error(err)

      setMessage(
        err?.response?.data?.message ||
          "Failed to delete tool"
      )

      setMessageType("error")
    }

    setDeleteId(null)

    setTimeout(() => {
      setMessage("")
      setMessageType("")
    }, 5000)
  }

  return (
    <div>

      {/* SUCCESS / ERROR MESSAGE */}
      {message && (
        <div
          className={`mb-4 p-4 rounded-xl border text-sm font-medium ${
            messageType === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Tools
        </h1>

        <button
          onClick={() => navigate("/tools/new")}
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          + Create Tool
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
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
              <tr
                key={tool._id}
                className="border-t"
              >
                <td className="p-4">
                  {tool.name}
                </td>

                <td className="p-4 text-gray-500">
                  {tool.brand}
                </td>

                <td className="p-4 space-x-4">
                  {/* EDIT */}
                  <button
                    onClick={() =>
                      navigate(
                        `/tools/edit/${tool._id}`
                      )
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      setDeleteId(tool._id)
                    }
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">

            <h2 className="text-xl font-semibold mb-3">
              Delete Tool
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this
              tool?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 text-white"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  )
}