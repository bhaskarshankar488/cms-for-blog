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
    <div>

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>

        <button
          onClick={() => navigate("/categories/new")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Create Category
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
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

    </div>
  )
}