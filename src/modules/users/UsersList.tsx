import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("")

  const navigate = useNavigate()

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`/users`)
      setUsers(res.data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers()
    }, 400)

    return () => clearTimeout(delay)
  }, [])

  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      const res = await axios.delete(`/users/${deleteId}`)

      setMessage(res.data.message)
      setMessageType("success")

      fetchUsers()
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message ||
        "Failed to delete user"
      )

      setMessageType("error")
    }

    setDeleteId(null)

    setTimeout(() => {
      setMessage("")
      setMessageType("")
    }, 5000)
  }

  return (
    <div className="px-4 sm:px-6">

      {message && (
        <div
          className={`mb-4 p-3 rounded-xl border text-sm ${
            messageType === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Users
        </h1>

        <button
          onClick={() => navigate("/users/new")}
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          + Create User
        </button>
      </div>

      {/* TABLE */}
      <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4 capitalize">
                  {user.role}
                </td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="p-4 space-x-4">

                  <button
                    onClick={() =>
                      navigate(`/users/edit/${user._id}`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      setDeleteId(user._id)
                    }
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded-xl shadow border"
          >

            <p className="font-semibold">
              {user.name}
            </p>

            <p className="text-sm text-gray-500">
              {user.email}
            </p>

            <p className="text-sm mt-1 capitalize">
              {user.role}
            </p>

            <div className="flex gap-4 mt-3">

              <button
                onClick={() =>
                  navigate(`/users/edit/${user._id}`)
                }
                className="text-blue-600 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  setDeleteId(user._id)
                }
                className="text-red-600 text-sm"
              >
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-md rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-3">
              Delete User
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 text-white"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  )
}