import { useEffect, useState } from "react"
import axios from "../../api/axios"
import StatusBadge from "../../components/ui/StatusBadge"
import { useNavigate } from "react-router-dom"
import {
  Pencil,
  Eye,
  Trash2,
  Globe,
  GlobeLock,
  X,
} from "lucide-react"

type Page = {
  _id: string
  title: string
  slug: string
  categoryId?: {
    slug: string
  }
  status: "draft" | "published" | "unpublished"
}

export default function PagesList() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(false)

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean
    id: string | null
    title: string
  }>({
    open: false,
    id: null,
    title: "",
  })

  const navigate = useNavigate()

  const fetchPages = async () => {
    try {
      setLoading(true)

      const res = await axios.get("/pages")

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

  // Publish / Unpublish Toggle
  const toggleStatus = async (page: Page) => {
    try {
      const newStatus =
        page.status === "published" ? "unpublished" : "published"

      await axios.patch(`/pages/${page._id}/status`, {
        status: newStatus,
      })

      fetchPages()
    } catch (err) {
      console.error(err)
    }
  }

  // Open Delete Modal
  const openDeleteModal = (id: string, title: string) => {
    setDeleteModal({
      open: true,
      id,
      title,
    })
  }

  // Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal({
      open: false,
      id: null,
      title: "",
    })
  }

  // Delete Page
  const confirmDelete = async () => {
    try {
      if (!deleteModal.id) return

      await axios.delete(`/pages/${deleteModal.id}`)

      fetchPages()

      closeDeleteModal()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and organize all your pages
          </p>
        </div>

        <button
          onClick={() => navigate("/pages/new")}
          className="bg-black hover:bg-gray-800 transition-all text-white px-5 py-2.5 rounded-xl font-medium shadow-sm"
        >
          + Create Page
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm border">
          <p className="text-gray-500 text-center">Loading pages...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-5 text-left text-sm font-semibold text-gray-600">
                  Title
                </th>

                <th className="p-5 text-left text-sm font-semibold text-gray-600">
                  URL
                </th>

                <th className="p-5 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="p-5 text-right text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {pages.map((page) => (
                <tr
                  key={page._id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  {/* Title */}
                  <td className="p-5">
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {page.title}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        Page Content
                      </p>
                    </div>
                  </td>

                  {/* URL */}
                  <td className="p-5">
                    <div className="bg-gray-100 inline-flex px-3 py-1 rounded-lg text-sm text-gray-700">
                      /{page.categoryId?.slug}/{page.slug}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-5">
                    <StatusBadge status={page.status} />
                  </td>

                  {/* Actions */}
                  <td className="p-5">
                    <div className="flex items-center justify-end gap-2">
                      {/* Edit */}
                      <button
                        onClick={() =>
                          navigate(`/pages/edit/${page._id}`)
                        }
                        className="h-10 w-10 rounded-xl border bg-white hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center justify-center text-blue-600"
                        title="Edit Page"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Preview */}
                      <button
                        onClick={() =>
                          window.open(
                            `/preview/${page.slug}`,
                            "_blank"
                          )
                        }
                        className="h-10 w-10 rounded-xl border bg-white hover:bg-purple-50 hover:border-purple-200 transition-all flex items-center justify-center text-purple-600"
                        title="Preview Page"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Publish / Unpublish */}
                      <button
                        onClick={() => toggleStatus(page)}
                        className={`px-4 h-10 rounded-xl text-sm font-medium transition-all flex items-center gap-2
                          
                          ${
                            page.status === "published"
                              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }
                        `}
                      >
                        {page.status === "published" ? (
                          <>
                            <GlobeLock size={16} />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Globe size={16} />
                            Publish
                          </>
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          openDeleteModal(page._id, page.title)
                        }
                        className="h-10 w-10 rounded-xl border bg-white hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center text-red-600"
                        title="Delete Page"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {pages.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-16 text-gray-500"
                  >
                    No pages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Delete Page
              </h2>

              <button
                onClick={closeDeleteModal}
                className="h-9 w-9 rounded-lg hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                  <Trash2 size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Are you sure?
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 leading-6">
                    You are about to permanently delete{" "}
                    <span className="font-medium text-gray-800">
                      "{deleteModal.title}"
                    </span>
                    . This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-5 border-t bg-gray-50">
              <button
                onClick={closeDeleteModal}
                className="px-5 py-2.5 rounded-xl border hover:bg-gray-100 transition-all font-medium"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all font-medium shadow-sm"
              >
                Delete Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}