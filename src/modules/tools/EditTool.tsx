import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { useNavigate, useParams } from "react-router-dom"
import ToolForm from "./ToolForm"

export default function EditTool() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [tool, setTool] = useState<any>(null)

  const fetchTool = async () => {
    if (!id) return

    try {
      const res = await axios.get(`/tools/${id}`)
      setTool(res.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTool()
  }, [id])

  const handleUpdate = async (data: any) => {
    try {
      const payload = {
        name: data.name,
        slug: data.slug,
        image: data.image,
        brand: data.brand,
        link:data.link,
        tags:data.tags,

        globalDescription: data.globalDescription,
      }

      await axios.put(`/tools/${id}`, payload)

      alert("Tool updated")
      navigate("/tools")

    } catch (err: any) {
      console.error(err.response?.data)
      alert(JSON.stringify(err.response?.data))
    }
  }

  if (!tool) {
    return <p className="text-center mt-10">Loading tool...</p>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Tool</h1>

      <ToolForm
        initialData={tool}
        onSubmit={handleUpdate}
      />
    </div>
  )
}