import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"
import ToolForm from "./ToolForm"

export default function CreateTool() {
  const navigate = useNavigate()

  const handleCreate = async (data: any) => {
    try {
      await axios.post("/tools", data)
      alert("Tool created")
      navigate("/tools")
    } catch (err: any) {
      console.error(err.response?.data)
      alert(JSON.stringify(err.response?.data))
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Tool</h1>
      <ToolForm onSubmit={handleCreate} />
    </div>
  )
}