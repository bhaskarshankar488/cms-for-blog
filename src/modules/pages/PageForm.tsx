import { useState } from "react"
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"
import RichTextEditor from "../../components/editor/RichTextEditor"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

import BasicInfoSection from
  "../../components/page/BasicInfoSection"
interface PageFormProps {
  mode?: "create" | "edit";
}

export default function PageForm({
  mode = "create",
}: PageFormProps) {

  const { id } = useParams()

  const isEdit = mode === "edit"

  const navigate = useNavigate()

  // 🔥 CONTENT (Rich Editor)
  const [content, setContent] = useState("")

  const [catImageFile, setCatImageFile] =
    useState<File | null>(null)

  const [catImagePreview, setCatImagePreview] =
    useState("")

  // 🔥 TOOL SEARCH
  const [toolSearch, setToolSearch] = useState("")
  const [toolResults, setToolResults] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  // 🔥 TRACK MANUAL SLUG EDIT
  const [slugTouched, setSlugTouched] =
    useState(false)

  // 🔥 MAIN FORM
  const [form, setForm] = useState({
    title: "",
    slug: "",
    pageDescription: "",
    categoryId: "",

    categoryDescription: "",

    catImage: {
      url: "",
      public_id: "",
    },

    meta: {
      title: "",
      description: "",
      keywords: [] as string[],
    },

    tools: [] as any[],
    faq: [] as any[],
  })

  // =========================
  // 🔹 FETCH CATEGORIES
  // =========================
  const fetchCategories = async () => {
    try {

      const res = await axios.get("/categories")

      setCategories(res.data.data || [])

    } catch (err) {
      console.error(err)
    }
  }

  // =========================
  // 🔹 FETCH PAGE
  // =========================
  const fetchPage = async () => {

    try {

      const res = await axios.get(`/pages/id/${id}`)

      const data = res.data.data

      console.log("Fetched Page:", data)

      setForm({
        title: data.title || "",

        slug: data.slug || "",

        pageDescription:
          data.pageDescription || "",

        categoryId:
          data.categoryId?._id ||
          data.categoryId ||
          "",

        categoryDescription:
          data.categoryDescription || "",

        catImage:
          data.catImage || {
            url: "",
            public_id: "",
          },

        meta: {
          title:
            data.meta?.title || "",

          description:
            data.meta?.description || "",

          keywords:
            data.meta?.keywords || [],
        },

        tools:
          data.tools?.map((tool: any) => ({

            toolId:
              tool.toolId?._id ||
              tool.toolId ||
              "",

            name:
              tool.name ||
              tool.toolId?.name ||
              "",

            image:
              tool.image ||
              tool.toolId?.image ||
              {},

            customDescription:
              tool.customDescription || "",
          })) || [],

        faq: data.faq || [],
      })

      setContent(data.content || "")

      setCatImagePreview(
        data.catImage?.url || ""
      )

    } catch (err) {

      console.error("Fetch error:", err)
    }
  }

  // =========================
  // 🔹 INIT
  // =========================
  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {

    if (isEdit) {
      fetchPage()
    }

  }, [id])

  // =========================
  // 🔹 AUTO SLUG GENERATE
  // =========================
  useEffect(() => {

    // ❌ Don't overwrite manually edited slug
    if (slugTouched) return

    // ❌ Don't overwrite existing edit slug
    if (isEdit && form.slug) return

    // ❌ Empty title
    if (!form.title) {

      setForm((prev) => ({
        ...prev,
        slug: "",
      }))

      return
    }

    // ✅ Generate slug
    const generatedSlug = form.title
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
    form.title,
    slugTouched,
    isEdit,
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


  const handleCatImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0]

    if (!file) return

    setCatImageFile(file)

    setCatImagePreview(
      URL.createObjectURL(file)
    )
  }

  const removeCatImage = () => {

    setCatImageFile(null)

    setCatImagePreview("")

    setForm({
      ...form,

      catImage: {
        url: "",
        public_id: "",
      },
    })
  }

  // =========================
  // 🔹 TOOL SEARCH
  // =========================
  const searchTools = async (
    query: string
  ) => {

    if (!query) {
      return setToolResults([])
    }

    try {

      const res = await axios.get(
        `/tools?search=${query}`
      )

      setToolResults(
        res.data.data || []
      )

    } catch (err) {

      console.error(err)
    }
  }

  // =========================
  // 🔹 ADD TOOL
  // =========================
  const addTool = (tool: any) => {

    // ✅ prevent duplicate
    if (
      form.tools.find(
        (t: any) =>
          t.toolId === tool._id
      )
    ) {
      return
    }

    setForm({
      ...form,

      tools: [
        ...form.tools,

        {
          toolId: tool._id,

          name: tool.name,

          image: tool.image,

          customDescription: "",
        },
      ],
    })

    setToolResults([])

    setToolSearch("")
  }

  // =========================
  // 🔹 REMOVE TOOL
  // =========================
  const removeTool = (
    index: number
  ) => {

    const updated = [...form.tools]

    updated.splice(index, 1)

    setForm({
      ...form,
      tools: updated,
    })
  }

  // =========================
  // 🔹 FAQ
  // =========================
  const addFaq = () => {

    setForm({
      ...form,

      faq: [
        ...form.faq,

        {
          question: "",
          answer: "",
        },
      ],
    })
  }

  const removeFaq = (
    index: number
  ) => {

    const updated = [...form.faq]

    updated.splice(index, 1)

    setForm({
      ...form,
      faq: updated,
    })
  }

  const updateFaq = (
    index: number,
    field: string,
    value: string
  ) => {

    const updated = [...form.faq]

    updated[index][field] = value

    setForm({
      ...form,
      faq: updated,
    })
  }

  // =========================
  // 🔹 SUBMIT
  // =========================
  const handleSubmit = async (
    status: string = "draft"
  ) => {

    try {

      const validStatus = [
        "draft",
        "published",
        "unpublished",
      ]

      const finalStatus =
        validStatus.includes(status)
          ? status
          : "draft"

      const formData = new FormData()

      formData.append(
        "title",
        form.title
      )

      formData.append(
        "slug",
        form.slug
      )

      formData.append(
        "pageDescription",
        form.pageDescription
      )

      formData.append(
        "categoryDescription",
        form.categoryDescription || ""
      )

      formData.append(
        "categoryId",
        form.categoryId
      )

      formData.append(
        "meta",
        JSON.stringify(form.meta)
      )

      formData.append(
        "tools",
        JSON.stringify(
          form.tools.map((t: any) => ({
            toolId: t.toolId,
            customDescription:
              t.customDescription,
          }))
        )
      )

      formData.append(
        "faq",
        JSON.stringify(
          form.faq.map((f: any) => ({
            question: f.question,
            answer: f.answer,
          }))
        )
      )

      formData.append(
        "content",
        content
      )

      formData.append(
        "status",
        finalStatus
      )

      // NEW IMAGE
      if (catImageFile) {

        formData.append(
          "catImage",
          catImageFile
        )
      }

      // EXISTING IMAGE (EDIT MODE)
      if (
        !catImageFile &&
        form.catImage?.url
      ) {

        formData.append(
          "catImage",
          JSON.stringify(
            form.catImage
          )
        )
      }

      if (isEdit) {

        await axios.put(
          `/pages/${id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        )

      } else {

        await axios.post(
          "/pages",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        )
      }

      alert(
        `Page ${finalStatus}`
      )

      navigate("/pages")

    } catch (err: any) {

      console.error(
        err.response?.data
      )

      alert(
        JSON.stringify(
          err.response?.data
        )
      )
    }
  }

  // =========================
  // 🔹 UI
  // =========================
  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6">

      {/* TITLE */}
      <h1 className="text-xl sm:text-2xl font-bold">
        {isEdit ? "Edit Page" : "Create Page"}
      </h1>

      <BasicInfoSection
        form={form}
        setForm={setForm}
        setSlugTouched={setSlugTouched}
      />
      <div className="space-y-3">

        <label className="font-semibold">
          Category Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleCatImageChange}
          className="w-full p-2 border rounded"
        />

        {catImagePreview && (

          <div className="relative w-40">

            <img
              src={catImagePreview}
              alt="Category Preview"
              className="w-40 h-40 object-cover border rounded"
            />

            <button
              type="button"
              onClick={removeCatImage}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
            >
              Remove
            </button>

          </div>

        )}

      </div>

      {/* CATEGORY */}
      <select
        className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
        value={form.categoryId}
        onChange={(e) =>
          setForm({
            ...form,
            categoryId: e.target.value,
          })
        }
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* META TITLE */}
      <input
        placeholder="Meta Title"
        className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
        value={form.meta.title}
        onChange={(e) =>
          setForm({
            ...form,
            meta: {
              ...form.meta,
              title: e.target.value,
            },
          })
        }
      />

      {/* META DESCRIPTION */}
      <textarea
        placeholder="Meta Description"
        className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
        value={form.meta.description}
        onChange={(e) =>
          setForm({
            ...form,
            meta: {
              ...form.meta,
              description: e.target.value,
            },
          })
        }
      />

      {/* TOOLS */}
      <h2 className="text-lg sm:text-xl font-semibold">Tools</h2>

      <input
        placeholder="Search tools..."
        className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
        value={toolSearch}
        onChange={(e) => {
          setToolSearch(e.target.value)
          searchTools(e.target.value)
        }}
      />

      {toolResults.length > 0 && (
        <div className="border rounded max-h-40 overflow-y-auto bg-white">
          {toolResults.map((tool) => (
            <div
              key={tool._id}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
              onClick={() => addTool(tool)}
            >
              {tool.name}
            </div>
          ))}
        </div>
      )}

      {/* SELECTED TOOLS */}
      <div className="space-y-4">
        {form.tools.map((tool: any, index: number) => (
          <div key={index} className="border p-3 sm:p-4 rounded">
            <h3 className="font-semibold text-base sm:text-lg">
              {tool.name}
            </h3>

            <textarea
              placeholder="Custom Description"
              className="w-full mt-2 p-2 sm:p-3 border rounded text-sm sm:text-base"
              value={tool.customDescription}
              onChange={(e) => {
                const updated = [...form.tools]
                updated[index].customDescription = e.target.value
                setForm({ ...form, tools: updated })
              }}
            />

            <button
              className="text-red-600 mt-2 text-sm"
              onClick={() => removeTool(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 className="text-lg sm:text-xl font-semibold">FAQ</h2>

      <button
        onClick={addFaq}
        className="bg-gray-200 px-4 py-2 rounded text-sm sm:text-base w-full sm:w-auto"
      >
        + Add FAQ
      </button>

      <div className="space-y-4">
        {form.faq.map((item: any, index: number) => (
          <div key={index} className="border p-3 sm:p-4 rounded">
            <input
              placeholder="Question"
              className="w-full mb-2 p-2 sm:p-3 border rounded text-sm sm:text-base"
              value={item.question}
              onChange={(e) =>
                updateFaq(index, "question", e.target.value)
              }
            />

            <textarea
              placeholder="Answer"
              className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
              value={item.answer}
              onChange={(e) =>
                updateFaq(index, "answer", e.target.value)
              }
            />

            <button
              className="text-red-600 mt-2 text-sm"
              onClick={() => removeFaq(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <h2 className="text-lg sm:text-xl font-semibold">Content</h2>

      <RichTextEditor
        value={content}
        onChange={(val: string) => setContent(val)}
      />

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">

        <button
          onClick={() => handleSubmit("draft")}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          Save Draft
        </button>

        <button
          onClick={() => handleSubmit("draft")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          Save
        </button>

        <button
          onClick={() => handleSubmit("published")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          Publish
        </button>

      </div>

    </div>
  )
}