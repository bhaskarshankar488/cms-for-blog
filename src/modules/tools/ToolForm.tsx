import { useState, useEffect } from "react"

export default function ToolForm({ initialData, onSubmit }: any) {

  const [form, setForm] = useState({
    name: "",
    slug: "",

    // ✅ image object now
    image: {
      url: "",
      public_id: "",
    },

    brand: "",
    link: "",
    globalDescription: "",
    tags: [""],
  })

  // ✅ file state
  const [imageFile, setImageFile] = useState<File | null>(null)

  // ✅ preview state
  const [preview, setPreview] = useState("")

  // ✅ edit mode load
  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,

        image: initialData.image || {
          url: "",
          public_id: "",
        },

        tags: initialData.tags?.length
          ? initialData.tags
          : [""],
      })

      // ✅ existing DB image preview
      setPreview(initialData.image?.url || "")
    }
  }, [initialData])

  // ✅ input change
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // ✅ slug auto generate
  useEffect(() => {
    if (form.name) {
      const slug = form.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      setForm((prev) => ({
        ...prev,
        slug,
      }))
    }
  }, [form.name])

  // ✅ image upload
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0]

    if (!file) return

    setImageFile(file)

    // preview
    const imageUrl = URL.createObjectURL(file)

    setPreview(imageUrl)
  }

  // ✅ remove image
  const handleRemoveImage = () => {

    setImageFile(null)

    setPreview("")

    setForm({
      ...form,
      image: {
        url: "",
        public_id: "",
      },
    })
  }

  // ✅ tag change
  const handleTagChange = (
    index: number,
    value: string
  ) => {

    const updated = [...form.tags]

    updated[index] = value

    setForm({
      ...form,
      tags: updated,
    })
  }

  // ✅ add tag
  const addTag = () => {
    if (form.tags.length >= 3) return

    setForm({
      ...form,
      tags: [...form.tags, ""],
    })
  }

  // ✅ remove tag
  const removeTag = (index: number) => {

    const updated = form.tags.filter(
      (_: any, i: number) => i !== index
    )

    setForm({
      ...form,
      tags: updated,
    })
  }

  // ✅ submit
  const handleSubmit = () => {

    const filteredTags = form.tags.filter(
      (t: string) => t.trim() !== ""
    )

    if (!form.name || !form.brand || !form.link) {
      alert("Name, Brand and Link are required")
      return
    }

    if (
      filteredTags.length === 0 ||
      filteredTags.length > 3
    ) {
      alert("Please enter 1 to 3 tags only")
      return
    }

    // ✅ form data for image upload
    const formData = new FormData()

    formData.append("name", form.name)
    formData.append("slug", form.slug)
    formData.append("brand", form.brand)
    formData.append("link", form.link)
    formData.append(
      "globalDescription",
      form.globalDescription
    )

    filteredTags.forEach((tag: string) => {
      formData.append("tags", tag)
    })

    // ✅ only append new image if selected
    if (imageFile) {
      formData.append("image", imageFile)
    }

    // ✅ if edit mode and no new image
    if (!imageFile && form.image?.url) {
      formData.append(
        "image",
        JSON.stringify(form.image)
      )
    }

    onSubmit(formData)
  }

  return (
    <div className="space-y-4">

      {/* NAME */}
      <input
        name="name"
        placeholder="Tool Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* SLUG */}
      <input
        name="slug"
        placeholder="Slug (auto-generated)"
        value={form.slug}
        readOnly
        className="w-full p-2 border rounded bg-gray-100"
      />

      {/* IMAGE SECTION */}
      <div className="space-y-3">

        <label className="font-semibold">
          Tool Image
        </label>

        {/* upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />

        {/* preview */}
        {preview && (
          <div className="relative w-40">

            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded border"
            />

            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
            >
              Remove
            </button>

          </div>
        )}

      </div>

      {/* BRAND */}
      <input
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* LINK */}
      <input
        name="link"
        placeholder="Tool Website URL"
        value={form.link}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* DESCRIPTION */}
      <textarea
        name="globalDescription"
        placeholder="Global Description"
        value={form.globalDescription}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* TAGS */}
      <div>

        <label className="font-semibold">
          Tags (max 3)
        </label>

        {form.tags.map(
          (tag: string, index: number) => (
            <div
              key={index}
              className="flex gap-2 mt-2"
            >

              <input
                value={tag}
                onChange={(e) =>
                  handleTagChange(
                    index,
                    e.target.value
                  )
                }
                placeholder={`Tag ${index + 1}`}
                className="w-full p-2 border rounded"
              />

              {form.tags.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeTag(index)
                  }
                  className="bg-red-500 text-white px-3 rounded"
                >
                  ✕
                </button>
              )}

            </div>
          )
        )}

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

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Save Tool
      </button>

    </div>
  )
}