import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"
import CategoryForm from "./CategoryForm"

export default function CreateCategory() {
  const navigate = useNavigate()

  const handleCreate = async (data: any) => {
    try {
      await axios.post("/categories", data)
      alert("Category created")
      navigate("/categories")
    } catch (err: any) {
      console.error(err.response?.data)
      alert(JSON.stringify(err.response?.data))
    }
  }

return (
  <div className="max-w-3xl mx-auto px-4 sm:px-6">
    
    <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
      Create Category
    </h1>

    <CategoryForm onSubmit={handleCreate} />

  </div>
)
}