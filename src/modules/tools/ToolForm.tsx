import { useState, useEffect } from "react"

const AVAILABLE_TAGS = [
  "Free",
  "Freemium",
  "Paid",
  "Beginner",
  "No-Code",
  "Developer",
  "Top Rated",
  "Trending",
  "Popular",
  "New",
]

export default function ToolForm({
  initialData,
  onSubmit,
}: any) {

  const [form, setForm] = useState<{
    name: string
    slug: string
    image: {
      url: string
      public_id: string
    }
    brand: string
    link: string
    globalDescription: string
    tags: string[]

    // ✅ NEW FIELDS
    ratingValue: number | string
    ratingCount: number | string
    reviewCount: number | string

  }>({
    name: "",
    slug: "",

    // ✅ image object
    image: {
      url: "",
      public_id: "",
    },

    brand: "",
    link: "",
    globalDescription: "",
    tags: [],

    // ✅ DEFAULT VALUES
    ratingValue: "",
    ratingCount: "",
    reviewCount: "",
  })

  // ✅ file state
  const [imageFile, setImageFile] =
    useState<File | null>(null)

  // ✅ preview state
  const [preview, setPreview] = useState("")

  // ✅ TRACK MANUAL SLUG EDIT
  const [slugTouched, setSlugTouched] =
    useState(false)

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
          : [],

        // ✅ LOAD NEW FIELDS
        ratingValue:
          initialData.ratingValue ?? "",

        ratingCount:
          initialData.ratingCount ?? "",

        reviewCount:
          initialData.reviewCount ?? "",
      })

      // ✅ existing DB image preview
      setPreview(
        initialData.image?.url || ""
      )
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
    const slug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")

    setForm((prev) => ({
      ...prev,
      slug,
    }))

  }, [
    form.name,
    slugTouched,
    initialData,
  ])

  // ✅ image upload
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0]

    if (!file) return

    setImageFile(file)

    // ✅ preview
    const imageUrl =
      URL.createObjectURL(file)

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

  // ✅ tag toggle
  const toggleTag = (tag: string) => {

    const exists =
      form.tags.includes(tag)

    // ✅ remove
    if (exists) {

      setForm({
        ...form,

        tags: form.tags.filter(
          (t) => t !== tag
        ),
      })

      return
    }

    // ✅ max 3
    if (form.tags.length >= 3) {
      return
    }

    // ✅ add
    setForm({
      ...form,

      tags: [...form.tags, tag],
    })
  }

  // ✅ submit
  const handleSubmit = () => {

    const filteredTags =
      form.tags.filter(
        (t) => t.trim() !== ""
      )

    if (
      !form.name ||
      !form.brand ||
      !form.link
    ) {
      alert(
        "Name, Brand and Link are required"
      )

      return
    }

    // ✅ rating validation
    if (
      form.ratingValue !== "" &&
      (
        Number(form.ratingValue) < 0 ||
        Number(form.ratingValue) > 5
      )
    ) {
      alert(
        "Rating Value must be between 0 and 5"
      )

      return
    }

    if (
      filteredTags.length === 0 ||
      filteredTags.length > 3
    ) {
      alert(
        "Please select 1 to 3 tags only"
      )

      return
    }

    // ✅ form data
    const formData = new FormData()

    formData.append(
      "name",
      form.name
    )

    formData.append(
      "slug",
      form.slug
    )

    formData.append(
      "brand",
      form.brand
    )

    formData.append(
      "link",
      form.link
    )

    formData.append(
      "globalDescription",
      form.globalDescription
    )

    // ✅ OPTIONAL NEW FIELDS
    if (form.ratingValue !== "") {

      formData.append(
        "ratingValue",
        String(form.ratingValue)
      )
    }

    if (form.ratingCount !== "") {

      formData.append(
        "ratingCount",
        String(form.ratingCount)
      )
    }

    if (form.reviewCount !== "") {

      formData.append(
        "reviewCount",
        String(form.reviewCount)
      )
    }

    filteredTags.forEach(
      (tag: string) => {

        formData.append(
          "tags",
          tag
        )
      }
    )

    // ✅ new image
    if (imageFile) {

      formData.append(
        "image",
        imageFile
      )
    }

    // ✅ existing image in edit mode
    if (
      !imageFile &&
      form.image?.url
    ) {

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

      {/* ✅ NEW RATING SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Rating Value */}
        <input
          type="number"
          name="ratingValue"
          placeholder="Rating Value (0-5)"
          value={form.ratingValue}
          onChange={handleChange}
          min={0}
          max={5}
          step="0.1"
          className="w-full p-2 border rounded"
        />

        {/* Rating Count */}
        <input
          type="number"
          name="ratingCount"
          placeholder="Rating Count"
          value={form.ratingCount}
          onChange={handleChange}
          min={0}
          className="w-full p-2 border rounded"
        />

        {/* Review Count */}
        <input
          type="number"
          name="reviewCount"
          placeholder="Review Count"
          value={form.reviewCount}
          onChange={handleChange}
          min={0}
          className="w-full p-2 border rounded"
        />

      </div>

      {/* TAGS */}
      <div className="space-y-3">

        <label className="font-semibold">
          Select Tags (max 3)
        </label>

        <div className="flex flex-wrap gap-2">

          {AVAILABLE_TAGS.map((tag) => {

            const selected =
              form.tags.includes(tag)

            const disabled =
              !selected &&
              form.tags.length >= 3

            return (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  toggleTag(tag)
                }
                disabled={disabled}
                className={`
                  px-4 py-2 rounded border text-sm transition

                  ${
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300"
                  }

                  ${
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                {tag}
              </button>
            )
          })}

        </div>

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