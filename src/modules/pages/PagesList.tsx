import { useEffect, useState } from "react"
import axios from "../../api/axios" // ✅ FIXED
import StatusBadge from "../../components/ui/StatusBadge"
import { useNavigate } from "react-router-dom"

type Page = {
  _id: string
  title: string
  slug: string
  status: "draft" | "published" | "unpublished"
}

export default function PagesList() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchPages = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/pages") // ✅ FIXED
      setPages(res.data.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`/pages/${id}/status`, { status }) // ✅ FIXED
      fetchPages()
    } catch (err) {
      console.error(err)
    }
  }

  const deletePage = async (id: string) => {
    if (!confirm("Delete this page?")) return

    try {
      await axios.delete(`/pages/${id}`) // ✅ FIXED
      fetchPages()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Pages</h1>

        <button
          onClick={() => navigate("/pages/new")}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Create Page
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {pages.map((page) => (
                <tr key={page._id} className="border-t">
                  <td className="p-4">{page.title}</td>
                  <td className="p-4 text-gray-500">{page.slug}</td>

                  <td className="p-4">
                    <StatusBadge status={page.status} />
                  </td>

                  <td className="p-4 space-x-3">
                    <button
                      onClick={() => navigate(`/pages/edit/${page._id}`)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => updateStatus(page._id, "published")}
                      className="text-green-600"
                    >
                      Publish
                    </button>

                    <button
                      onClick={() => updateStatus(page._id, "unpublished")}
                      className="text-yellow-600"
                    >
                      Unpublish
                    </button>

                    <button
                      onClick={() => deletePage(page._id)}
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
      )}
    </div>
  )
}