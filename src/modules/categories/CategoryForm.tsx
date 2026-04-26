import { useState, useEffect } from "react"

export default function CategoryForm({ initialData, onSubmit }: any) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        slug: initialData.slug || "",
      })
    }
  }, [initialData])

  

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-4">

      <input
        name="name"
        placeholder="Category Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="slug"
        placeholder="Slug"
        value={form.slug}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        onClick={() => onSubmit(form)}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Save Category
      </button>

    </div>
  )
}