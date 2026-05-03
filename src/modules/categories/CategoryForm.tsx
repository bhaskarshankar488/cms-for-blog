import { useState, useEffect } from "react"

export default function CategoryForm({
  initialData,
  onSubmit,
}: any) {

  const [form, setForm] = useState({
    name: "",
    slug: "",
  })

  // ✅ TRACK MANUAL SLUG EDIT
  const [slugTouched, setSlugTouched] =
    useState(false)

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

    // ❌ don't overwrite manual slug
    if (slugTouched) return

    // ❌ don't overwrite edit slug
    if (initialData && form.slug) return

    // ❌ empty name
    if (!form.name) {

      setForm((prev) => ({
        ...prev,
        slug: "",
      }))

      return
    }

    // ✅ generate slug
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

  }, [
    form.name,
    slugTouched,
    initialData,
  ])

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

      {/* SLUG */}
      <input
        name="slug"
        placeholder="Slug"
        value={form.slug}
        onChange={(e) => {

          setSlugTouched(true)

          const value = e.target.value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")

          setForm({
            ...form,
            slug: value,
          })
        }}
        className="w-full p-2 border rounded"
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