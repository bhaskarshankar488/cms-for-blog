import { useState, useEffect } from "react"

export default function CategoryForm({
  initialData,
  onSubmit,
}: any) {

  const [form, setForm] = useState({
    name: "",
    slug: "",
  })

  // =========================
  // 🔹 LOAD EDIT DATA
  // =========================
  useEffect(() => {

    if (initialData) {

      setForm({
        name:
          initialData.name || "",

        slug:
          initialData.slug || "",
      })
    }

  }, [initialData])

  // =========================
  // 🔹 AUTO SLUG GENERATE
  // =========================
  useEffect(() => {

    if (!form.name) {

      setForm((prev) => ({
        ...prev,
        slug: "",
      }))

      return
    }

    const generatedSlug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")

    setForm((prev) => ({
      ...prev,
      slug: generatedSlug,
    }))

  }, [form.name])

  // =========================
  // 🔹 HANDLE CHANGE
  // =========================
  const handleChange = (e: any) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-y-4">

      {/* CATEGORY NAME */}
      <input
        name="name"
        placeholder="Category Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* AUTO GENERATED SLUG */}
      <input
        name="slug"
        placeholder="Slug"
        value={form.slug}
        readOnly
        className="w-full p-2 border rounded bg-gray-100"
      />

      {/* SAVE */}
      <button
        onClick={() => onSubmit(form)}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Save Category
      </button>

    </div>
  )
}