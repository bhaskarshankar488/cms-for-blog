import { useEffect, useState } from "react"
import axios from "../../api/axios"
import {
  useNavigate,
  useParams,
} from "react-router-dom"

import UserForm from "./UserForm"

export default function EditUser() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/users/${id}`)
      setUser(res.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdate = async (data: any) => {
    try {
      await axios.put(`/users/${id}`, data)

      alert("User updated")

      navigate("/users")

    } catch (err: any) {
      console.error(err.response?.data)
    }
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">

      <h1 className="text-2xl font-bold mb-6">
        Edit User
      </h1>

      <UserForm
        initialData={user}
        onSubmit={handleUpdate}
      />

    </div>
  )
}