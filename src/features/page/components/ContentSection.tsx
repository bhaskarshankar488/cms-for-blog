import RichTextEditor from "../../../components/editor/RichTextEditor"

interface Props {
  content: string
  setContent: (value: string) => void
}

export default function ContentSection({
  content,
  setContent,
}: Props) {
  return (
    <>
      <h2 className="text-lg sm:text-xl font-semibold">
        Content
      </h2>

      <RichTextEditor
        value={content}
        onChange={(value: string) =>
          setContent(value)
        }
      />
    </>
  )
}