import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"

export default function CategoriesList() {
  const [categories, setCategories] = useState<any[]>([])
  const navigate = useNavigate()

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories")
      setCategories(res.data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // DELETE
  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return

    try {
      await axios.delete(`/categories/${id}`)
      fetchCategories()
    } catch (err: any) {
      console.error(err.response?.data)
      alert(err.response?.data?.message)
    }
  }

  return (
  <div className="px-4 md:px-0">

    {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
      <h1 className="text-xl sm:text-2xl font-bold">Categories</h1>

      <button
        onClick={() => navigate("/categories/new")}
        className="bg-black text-white px-4 py-2 rounded w-full sm:w-auto"
      >
        + Create Category
      </button>
    </div>

    {/* ✅ DESKTOP TABLE */}
    <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Slug</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="border-t">
              <td className="p-4">{cat.name}</td>
              <td className="p-4 text-gray-500">{cat.slug}</td>
              <td className="p-4 space-x-3">
                <button
                  onClick={() => navigate(`/categories/edit/${cat._id}`)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCategory(cat._id)}
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

    {/* ✅ MOBILE CARD VIEW */}
    <div className="md:hidden space-y-4">
      {categories.map((cat) => (
        <div
          key={cat._id}
          className="bg-white p-4 rounded-xl shadow"
        >
          <p className="font-semibold text-sm">{cat.name}</p>
          <p className="text-gray-500 text-sm break-all">{cat.slug}</p>

          <div className="flex gap-4 mt-3">
            <button
              onClick={() => navigate(`/categories/edit/${cat._id}`)}
              className="text-blue-600 text-sm"
            >
              Edit
            </button>

            <button
              onClick={() => deleteCategory(cat._id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>

  </div>
)
}