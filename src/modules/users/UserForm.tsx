import { useState } from "react"

export default function UserForm({
  initialData = {},
  onSubmit,
}: any) {

  const [form, setForm] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    password: "",
    role: initialData.role || "editor",
    status: initialData.status || "active",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
      >
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button
        type="submit"
        className="bg-black text-white px-5 py-3 rounded-xl"
      >
        Save User
      </button>

    </form>
  )
}