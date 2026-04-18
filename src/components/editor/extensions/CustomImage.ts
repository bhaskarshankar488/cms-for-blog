import Image from "@tiptap/extension-image"

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      width: {
        default: "100%",
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

    let style = `width:${width || "100%"}; display:block;`

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