import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { useNavigate, useParams } from "react-router-dom"
import CategoryForm from "./CategoryForm"

export default function EditCategory() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return

      try {
        const res = await axios.get(`/categories/${id}`)
        setCategory(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategory()
  }, [id])

  const handleUpdate = async (data: any) => {
    try {
      await axios.put(`/categories/${id}`, data)
      alert("Category updated")
      navigate("/categories")
    } catch (err: any) {
      console.error(err.response?.data)
      alert(JSON.stringify(err.response?.data))
    }
  }

  if (loading) return <p>Loading category...</p>

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>

      <CategoryForm
        initialData={category}
        onSubmit={handleUpdate}
      />
    </div>
  )
}