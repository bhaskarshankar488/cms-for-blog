import { useState, useEffect } from "react"

export default function ToolForm({ initialData, onSubmit }: any) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
    brand: "",
    globalDescription: "",
  })

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    }
  }, [initialData])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-4">

      <input
        name="name"
        placeholder="Tool Name"
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

      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <textarea
        name="globalDescription"
        placeholder="Global Description"
        value={form.globalDescription}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        onClick={() => onSubmit(form)}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Save Tool
      </button>

    </div>
  )
}