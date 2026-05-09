import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"
import UserForm from "./UserForm"

export default function CreateUser() {
  const navigate = useNavigate()

  const handleCreate = async (data: any) => {
    try {
      await axios.post("/users", data)

      alert("User created")

      navigate("/users")

    } catch (err: any) {
      console.error(err.response?.data)

      alert(
        JSON.stringify(err.response?.data)
      )
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">

      <h1 className="text-2xl font-bold mb-6">
        Create User
      </h1>

      <UserForm onSubmit={handleCreate} />

    </div>
  )
}