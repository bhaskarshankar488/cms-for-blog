import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect,useRef } from "react"

import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import { CustomImage } from "./extensions/CustomImage"
import TextAlign from "@tiptap/extension-text-align"
import Color from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import HardBreak from "@tiptap/extension-hard-break"

// ✅ FONT SIZE EXTENSION
const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.fontSize,
        renderHTML: (attributes: any) => {
          if (!attributes.fontSize) return {}
          return { style: `font-size: ${attributes.fontSize}` }
        },
      },
    }
  },
})

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (html: string) => void
}) {
  // ✅ CLEAN HTML
  const cleanHTML = (html: string) => {
    return html
      .replace(/<p><br><\/p>/g, "")
      .replace(/<li><p>/g, "<li>")
      .replace(/<\/p><\/li>/g, "</li>")
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),

      HardBreak,

      Link.configure({ openOnClick: false }),

      Underline,

      CustomImage, // ✅ FIXED IMAGE EXTENSION

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      TextStyle,
      Color,
      FontSize,
    ],

    content: value,

    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },

      handleKeyDown(view, event) {
        if (event.key === "Enter" && event.shiftKey) {
          event.preventDefault()
          view.dispatch(
            view.state.tr.replaceSelectionWith(
              view.state.schema.nodes.hardBreak.create()
            )
          )
          return true
        }
        return false
      },
    },

    onUpdate: ({ editor }) => {
      const html = cleanHTML(editor.getHTML())
      onChange(html)
    },
  })

  const isInitialContentSet = useRef(false)

useEffect(() => {
  if (editor && value && !isInitialContentSet.current) {
    editor.commands.setContent(value)
    isInitialContentSet.current = true
  }
}, [editor, value])

  if (!editor) return null

  // ✅ TYPESAFE LEVELS
  const headingLevels = [1, 2, 3, 4, 5, 6] as const

  return (
    <div className="bg-white border rounded-xl shadow-sm">

      {/* 🔥 TOOLBAR */}
      <div className="sticky top-0 z-10 bg-white border-b p-2 flex flex-wrap gap-2">

        {/* TEXT */}
        <button className="btn" onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button className="btn" onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
        <button className="btn" onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>

        {/* FONT SIZE */}
        <select
          className="border px-2 py-1 rounded"
          onChange={(e) =>
            editor.chain().focus().setMark("textStyle", {
              fontSize: e.target.value,
            }).run()
          }
        >
          <option value="">Size</option>
          <option value="14px">Small</option>
          <option value="16px">Normal</option>
          <option value="20px">Large</option>
          <option value="28px">XL</option>
        </select>

        {/* HEADINGS */}
        {headingLevels.map((level) => (
          <button
            key={level}
            className="btn"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
          >
            H{level}
          </button>
        ))}

        {/* PARAGRAPH */}
        <button className="btn" onClick={() => editor.chain().focus().setParagraph().run()}>
          P
        </button>

        {/* LIST */}
        <button className="btn" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>

        {/* ALIGN */}
        <button className="btn" onClick={() => editor.chain().focus().setTextAlign("left").run()}>L</button>
        <button className="btn" onClick={() => editor.chain().focus().setTextAlign("center").run()}>C</button>
        <button className="btn" onClick={() => editor.chain().focus().setTextAlign("right").run()}>R</button>

        {/* COLOR */}
        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />

        {/* LINK */}
        <button
          className="btn"
          onClick={() => {
            const url = prompt("Enter URL")
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
        >
          Link
        </button>

        {/* IMAGE */}
        <button
          className="btn"
          onClick={() => {
            const url = prompt("Image URL")
            if (url) {
              const width = prompt("Width (e.g. 300px or 100%)", "100%")
              const align = prompt("Align: left / center / right", "center")

              editor.chain().focus().setImage({
                src: url,
                width: width || "100%",
                align: align || "center",
              }).run()
            }
          }}
        >
          Img
        </button>

      </div>

      {/* 🔥 EDITOR */}
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-2xl">

          <EditorContent
            editor={editor}
            className="
              min-h-[300px]
              p-4
              bg-gray-50
              rounded-lg

              prose
              prose-lg
              max-w-none
            "
          />

        </div>
      </div>

      {/* 🔥 BUTTON STYLE */}
      <style>{`
        .btn {
          padding: 4px 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          background: white;
          cursor: pointer;
        }
        .btn:hover {
          background: #f3f4f6;
        }
      `}</style>

    </div>
  )
}