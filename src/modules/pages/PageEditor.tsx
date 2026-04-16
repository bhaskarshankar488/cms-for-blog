import { useState } from "react"
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"
import RichTextEditor from "../../components/editor/RichTextEditor"


export default function PageEditor() {
  const navigate = useNavigate()

  // 🔥 CONTENT (Rich Editor)
  const [content, setContent] = useState("")

  // 🔥 TOOL SEARCH
  const [toolSearch, setToolSearch] = useState("")
  const [toolResults, setToolResults] = useState<any[]>([])

  // 🔥 MAIN FORM
  const [form, setForm] = useState({
    title: "",
    slug: "",
    meta: {
      title: "",
      description: "",
      keywords: [] as string[],
    },
    tools: [] as any[],
    faq: [] as any[],
  })

  // =========================
  // 🔹 META HANDLER
  // =========================
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // =========================
  // 🔹 TOOL SEARCH
  // =========================
  const searchTools = async (query: string) => {
    if (!query) return setToolResults([])

    try {
      const res = await axios.get(`/tools?search=${query}`)
      setToolResults(res.data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  const addTool = (tool: any) => {
    if (form.tools.find((t: any) => t.toolId === tool._id)) return

    setForm({
      ...form,
      tools: [
        ...form.tools,
        {
          toolId: tool._id,
          name: tool.name,
          image: tool.image,
          customDescription: "",
          rating: 0,
        },
      ],
    })

    setToolResults([])
    setToolSearch("")
  }

  const removeTool = (index: number) => {
    const updated = [...form.tools]
    updated.splice(index, 1)
    setForm({ ...form, tools: updated })
  }

  // =========================
  // 🔹 FAQ
  // =========================
  const addFaq = () => {
    setForm({
      ...form,
      faq: [...form.faq, { question: "", answer: "" }],
    })
  }

  const removeFaq = (index: number) => {
    const updated = [...form.faq]
    updated.splice(index, 1)
    setForm({ ...form, faq: updated })
  }

  const updateFaq = (index: number, field: string, value: string) => {
    const updated = [...form.faq]
    updated[index][field] = value
    setForm({ ...form, faq: updated })
  }

  // =========================
  // 🔹 SUBMIT
  // =========================
  const handleSubmit = async (status: string = "draft") => {
  try {
    const validStatus = ["draft", "published", "unpublished"]

    const finalStatus = validStatus.includes(status)
      ? status
      : "draft"

    const payload = {
      ...form,

      tools: form.tools.map((t: any) => ({
        toolId: t.toolId,
        customDescription: t.customDescription,
        rating: t.rating,
      })),

      content,
      status: finalStatus, // 🔥 FIXED
    }

    console.log("PAYLOAD:", payload)

    await axios.post("/pages", payload)

    alert(`Page ${finalStatus}`)

    navigate("/pages")

  } catch (err: any) {
    console.error(err.response?.data)
    alert(JSON.stringify(err.response?.data))
  }
}
  // =========================
  // 🔹 UI
  // =========================
  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">Create Page</h1>

      {/* TITLE */}
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
        className="w-full p-2 border rounded"
        value={form.slug}
        onChange={handleChange}
      />

      {/* META TITLE */}
      <input
        placeholder="Meta Title"
        className="w-full p-2 border rounded"
        value={form.meta.title}
        onChange={(e) =>
          setForm({
            ...form,
            meta: { ...form.meta, title: e.target.value },
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
            meta: { ...form.meta, description: e.target.value },
          })
        }
      />

      

      {/* ================= TOOLS ================= */}
      <h2 className="text-xl font-semibold">Tools</h2>

      <input
        placeholder="Search tools..."
        className="w-full p-2 border rounded"
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
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => addTool(tool)}
            >
              {tool.name}
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {form.tools.map((tool: any, index: number) => (
          <div key={index} className="border p-4 rounded">

            <h3 className="font-semibold">{tool.name}</h3>

            <textarea
              placeholder="Custom Description"
              className="w-full mt-2 p-2 border rounded"
              value={tool.customDescription}
              onChange={(e) => {
                const updated = [...form.tools]
                updated[index].customDescription = e.target.value
                setForm({ ...form, tools: updated })
              }}
            />

            <input
              type="number"
              placeholder="Rating"
              className="w-full mt-2 p-2 border rounded"
              value={tool.rating}
              onChange={(e) => {
                const updated = [...form.tools]
                updated[index].rating = Number(e.target.value)
                setForm({ ...form, tools: updated })
              }}
            />

            <button
              className="text-red-600 mt-2"
              onClick={() => removeTool(index)}
            >
              Remove
            </button>

          </div>
        ))}
      </div>

      {/* ================= FAQ ================= */}
      <h2 className="text-xl font-semibold">FAQ</h2>

      <button onClick={addFaq} className="bg-gray-200 px-4 py-2 rounded">
        + Add FAQ
      </button>

      <div className="space-y-4">
        {form.faq.map((item: any, index: number) => (
          <div key={index} className="border p-4 rounded">

            <input
              placeholder="Question"
              className="w-full mb-2 p-2 border rounded"
              value={item.question}
              onChange={(e) =>
                updateFaq(index, "question", e.target.value)
              }
            />

            <textarea
              placeholder="Answer"
              className="w-full p-2 border rounded"
              value={item.answer}
              onChange={(e) =>
                updateFaq(index, "answer", e.target.value)
              }
            />

            <button
              className="text-red-600 mt-2"
              onClick={() => removeFaq(index)}
            >
              Remove
            </button>

          </div>
        ))}
      </div>

      {/* ================= CONTENT ================= */}
      <h2 className="text-xl font-semibold">Content</h2>

      <RichTextEditor
        value={content}
        onChange={(val: string) => setContent(val)}
      />

      {/* ================= SAVE ================= */}
      <div className="flex gap-4 mt-6">

  {/* SAVE DRAFT */}
  <button
    onClick={() => handleSubmit("draft")}
    className="bg-gray-600 text-white px-4 py-2 rounded-lg"
  >
    Save Draft
  </button>

  {/* SAVE ONLY (KEEP CURRENT STATUS OR DEFAULT) */}
  <button
    onClick={() => handleSubmit("draft")}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    Save
  </button>

  {/* PUBLISH */}
  <button
    onClick={() => handleSubmit("published")}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    Publish
  </button>

</div>
    </div>
  )
}