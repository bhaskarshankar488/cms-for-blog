import { useState, useEffect } from "react"

export default function ToolForm({ initialData, onSubmit }: any) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
    brand: "",
    link: "", // ✅ ADDED
    globalDescription: "",
    tags: [""],
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        tags: initialData.tags?.length ? initialData.tags : [""],
      })
    }
  }, [initialData])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // ✅ Auto-generate slug from name
  useEffect(() => {
    if (form.name) {
      const slug = form.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      setForm((prev) => ({ ...prev, slug }))
    }
  }, [form.name])

  // ✅ Tag change
  const handleTagChange = (index: number, value: string) => {
    const updated = [...form.tags]
    updated[index] = value
    setForm({ ...form, tags: updated })
  }

  // ✅ Add tag (max 3)
  const addTag = () => {
    if (form.tags.length >= 3) return
    setForm({ ...form, tags: [...form.tags, ""] })
  }

  // ✅ Remove tag
  const removeTag = (index: number) => {
    const updated = form.tags.filter((_, i) => i !== index)
    setForm({ ...form, tags: updated })
  }

  // ✅ Submit
  const handleSubmit = () => {
    const filteredTags = form.tags.filter((t: string) => t.trim() !== "")

    if (!form.name || !form.brand || !form.link) {
      alert("Name, Brand and Link are required")
      return
    }

    if (filteredTags.length === 0 || filteredTags.length > 3) {
      alert("Please enter 1 to 3 tags only")
      return
    }

    onSubmit({ ...form, tags: filteredTags })
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
        placeholder="Slug (auto-generated)"
        value={form.slug}
        readOnly
        className="w-full p-2 border rounded bg-gray-100"
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

      {/* ✅ NEW FIELD */}
      <input
        name="link"
        placeholder="Tool Website URL"
        value={form.link}
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

      {/* ✅ Tags Section */}
      <div>
        <label className="font-semibold">Tags (max 3)</label>

        {form.tags.map((tag: string, index: number) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
              placeholder={`Tag ${index + 1}`}
              className="w-full p-2 border rounded"
            />

            {form.tags.length > 1 && (
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="bg-red-500 text-white px-3 rounded"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {form.tags.length < 3 && (
          <button
            type="button"
            onClick={addTag}
            className="mt-2 text-sm text-blue-600"
          >
            + Add Tag
          </button>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Save Tool
      </button>

    </div>
  )
}