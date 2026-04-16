import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import Link from "@tiptap/extension-link"
import Color from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import Image from "@tiptap/extension-image"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"

export default function RichTextEditor({ value, onChange }: any) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Link.configure({
        openOnClick: false, // 🔥 allows editing links
      }),

      TextStyle,
      Color,
      Image,
      Underline,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="border rounded p-3 bg-white">

      {/* 🔥 TOOLBAR */}
      <div className="flex flex-wrap gap-2 mb-3 border-b pb-2">

        {/* TEXT */}
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>

        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>U</u>
        </button>

        {/* HEADINGS */}
        <button onClick={() => editor.chain().focus().setParagraph().run()}>
          P
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </button>

        {/* LIST */}
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>

        {/* ALIGN */}
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          Left
        </button>

        <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          Center
        </button>

        <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          Right
        </button>

        {/* LINK */}
        <button
          onClick={() => {
            const url = prompt("Enter URL")
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
        >
          Add Link
        </button>

        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          Remove Link
        </button>

        {/* COLOR */}
        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />

        {/* IMAGE */}
        <button
          onClick={() => {
            const url = prompt("Enter image URL")
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }}
        >
          Add Image
        </button>

        {/* DELETE (works for image/text) */}
        <button
          onClick={() => editor.chain().focus().deleteSelection().run()}
        >
          Delete
        </button>

      </div>

      {/* 🔥 EDITOR CONTENT (VERY IMPORTANT STYLING) */}
      <EditorContent
        editor={editor}
        className="min-h-[300px] p-3 border rounded prose max-w-none focus:outline-none"
      />
    </div>
  )
}