import { useState } from "react"
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"
import RichTextEditor from "../../components/editor/RichTextEditor"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

export default function PageEditor() {

  const { id } = useParams()
  const isEdit = Boolean(id)

  const navigate = useNavigate()

  // 🔥 CONTENT (Rich Editor)
  const [content, setContent] = useState("")

  // 🔥 TOOL SEARCH
  const [toolSearch, setToolSearch] = useState("")
  const [toolResults, setToolResults] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  // 🔥 MAIN FORM
  const [form, setForm] = useState({
    title: "",
    slug: "",
    pageDescription: "",
    categoryId: "",

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
          data.categoryId || "",

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

    if (!form.title) {

      setForm((prev) => ({
        ...prev,
        slug: "",
      }))

      return
    }

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

  }, [form.title])

  // =========================
  // 🔹 HANDLE CHANGE
  // =========================
  const handleChange = (e: any) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
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

      const payload = {
        ...form,

        tools: form.tools.map(
          (t: any) => ({

            toolId: t.toolId,

            customDescription:
              t.customDescription,
          })
        ),

        faq: form.faq.map(
          (f: any) => ({
            question: f.question,
            answer: f.answer,
          })
        ),

        content,

        status: finalStatus,
      }

      if (isEdit) {

        await axios.put(
          `/pages/${id}`,
          payload
        )

      } else {

        await axios.post(
          "/pages",
          payload
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
    <div className="max-w-4xl mx-auto space-y-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold">
        {isEdit
          ? "Edit Page"
          : "Create Page"}
      </h1>

      {/* PAGE TITLE */}
      <input
        name="title"
        placeholder="Page Title"
        className="w-full p-2 border rounded"
        value={form.title}
        onChange={handleChange}
      />

      {/* SLUG */}
      <input
        name="slug"
        placeholder="Slug"
        className="w-full p-2 border rounded bg-gray-100"
        value={form.slug}
        readOnly
      />

      {/* PAGE DESCRIPTION */}
      <input
        name="pagedescription"
        placeholder="Page Description"
        className="w-full p-2 border rounded"
        value={form.pageDescription}
        onChange={(e) =>
          setForm({
            ...form,
            pageDescription:
              e.target.value,
          })
        }
      />

      {/* CATEGORY */}
      <select
        className="w-full p-2 border rounded"
        value={form.categoryId}
        onChange={(e) =>
          setForm({
            ...form,
            categoryId:
              e.target.value,
          })
        }
      >
        <option value="">
          Select Category
        </option>

        {categories.map((cat) => (
          <option
            key={cat._id}
            value={cat._id}
          >
            {cat.name}
          </option>
        ))}
      </select>

      {/* META TITLE */}
      <input
        placeholder="Meta Title"
        className="w-full p-2 border rounded"
        value={form.meta.title}
        onChange={(e) =>
          setForm({
            ...form,

            meta: {
              ...form.meta,
              title:
                e.target.value,
            },
          })
        }
      />

      {/* META DESCRIPTION */}
      <textarea
        placeholder="Meta Description"
        className="w-full p-2 border rounded"
        value={form.meta.description}
        onChange={(e) =>
          setForm({
            ...form,

            meta: {
              ...form.meta,

              description:
                e.target.value,
            },
          })
        }
      />

      {/* ================= TOOLS ================= */}
      <h2 className="text-xl font-semibold">
        Tools
      </h2>

      {/* SEARCH */}
      <input
        placeholder="Search tools..."
        className="w-full p-2 border rounded"
        value={toolSearch}
        onChange={(e) => {

          setToolSearch(
            e.target.value
          )

          searchTools(
            e.target.value
          )
        }}
      />

      {/* SEARCH RESULTS */}
      {toolResults.length > 0 && (
        <div className="border rounded max-h-40 overflow-y-auto bg-white">

          {toolResults.map((tool) => (

            <div
              key={tool._id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                addTool(tool)
              }
            >
              {tool.name}
            </div>
          ))}

        </div>
      )}

      {/* SELECTED TOOLS */}
      <div className="space-y-4">

        {form.tools.map(
          (
            tool: any,
            index: number
          ) => (

            <div
              key={index}
              className="border p-4 rounded"
            >

              {/* TOOL NAME */}
              <h3 className="font-semibold text-lg">
                {tool.name}
              </h3>

              {/* CUSTOM DESCRIPTION */}
              <textarea
                placeholder="Custom Description"
                className="w-full mt-2 p-2 border rounded"
                value={
                  tool.customDescription
                }
                onChange={(e) => {

                  const updated = [
                    ...form.tools,
                  ]

                  updated[
                    index
                  ].customDescription =
                    e.target.value

                  setForm({
                    ...form,
                    tools: updated,
                  })
                }}
              />

              {/* REMOVE */}
              <button
                className="text-red-600 mt-2"
                onClick={() =>
                  removeTool(index)
                }
              >
                Remove
              </button>

            </div>
          )
        )}

      </div>

      {/* ================= FAQ ================= */}
      <h2 className="text-xl font-semibold">
        FAQ
      </h2>

      <button
        onClick={addFaq}
        className="bg-gray-200 px-4 py-2 rounded"
      >
        + Add FAQ
      </button>

      <div className="space-y-4">

        {form.faq.map(
          (
            item: any,
            index: number
          ) => (

            <div
              key={index}
              className="border p-4 rounded"
            >

              <input
                placeholder="Question"
                className="w-full mb-2 p-2 border rounded"
                value={
                  item.question
                }
                onChange={(e) =>
                  updateFaq(
                    index,
                    "question",
                    e.target.value
                  )
                }
              />

              <textarea
                placeholder="Answer"
                className="w-full p-2 border rounded"
                value={item.answer}
                onChange={(e) =>
                  updateFaq(
                    index,
                    "answer",
                    e.target.value
                  )
                }
              />

              <button
                className="text-red-600 mt-2"
                onClick={() =>
                  removeFaq(index)
                }
              >
                Remove
              </button>

            </div>
          )
        )}

      </div>

      {/* ================= CONTENT ================= */}
      <h2 className="text-xl font-semibold">
        Content
      </h2>

      <RichTextEditor
        value={content}
        onChange={(val: string) =>
          setContent(val)
        }
      />

      {/* ================= SAVE ================= */}
      <div className="flex gap-4 mt-6">

        {/* DRAFT */}
        <button
          onClick={() =>
            handleSubmit("draft")
          }
          className="bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Save Draft
        </button>

        {/* SAVE */}
        <button
          onClick={() =>
            handleSubmit("draft")
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>

        {/* PUBLISH */}
        <button
          onClick={() =>
            handleSubmit(
              "published"
            )
          }
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Publish
        </button>

      </div>

    </div>
  )
}