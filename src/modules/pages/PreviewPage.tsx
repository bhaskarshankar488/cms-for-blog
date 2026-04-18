import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { useParams } from "react-router-dom"

export default function PreviewPage() {
  const { slug } = useParams()

  // ✅ FIRST declare state
  const [data, setData] = useState<any>(null)

  // ✅ Fetch data
  const fetchPreview = async () => {
    try {
      const res = await axios.get(`/pages/preview/${slug}`)
      setData(res.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPreview()
  }, [slug])

  // ✅ NOW safe to use data
  useEffect(() => {
    if (!data) return

    document.title = data.meta?.title || "Preview"

    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex"

    document.head.appendChild(meta)

    return () => {
      document.head.removeChild(meta)
    }
  }, [data])

  // ✅ Loading state
  if (!data) return <p>Loading preview...</p>

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-4">
        {data.title}
      </h1>

      {/* TOOLS */}
      <div className="space-y-4 mb-6">
        {data.tools?.map((tool: any, index: number) => (
          <div key={index} className="border p-4 rounded">

            <h2 className="font-semibold">
              {tool.name}
            </h2>

            <p>{tool.customDescription}</p>

            <p>⭐ {tool.rating}</p>

          </div>
        ))}
      </div>

      {/* CONTENT (🔥 IMPORTANT) */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />

      {/* FAQ */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">FAQ</h2>

        {data.faq?.map((item: any, i: number) => (
          <div key={i} className="mb-4">
            <p className="font-semibold">{item.question}</p>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>

    </div>
  )
}