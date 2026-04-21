import Image from "@tiptap/extension-image"

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      width: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.style.width || element.getAttribute("width"),
      },

      align: {
        default: "center",
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    const { align, width, ...rest } = HTMLAttributes as {
      align?: string
      width?: string
      [key: string]: any
    }

    let style = `display:block;`

    // ✅ FIX: safe width handling
    if (width) {
      style += ` width:${width};`
    } else {
      style += ` width:100%;`
    }

    if (align === "center") {
      style += " margin:20px auto;"
    }

    if (align === "left") {
      style += " margin:20px 20px 20px 0; float:left;"
    }

    if (align === "right") {
      style += " margin:20px 0 20px 20px; float:right;"
    }

    return ["img", { ...rest, style }]
  },
})