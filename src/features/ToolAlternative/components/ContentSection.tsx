import RichTextEditor
from "../../../components/editor/RichTextEditor";

interface Props {
  content: string;

  setContent: (
    value: string
  ) => void;
}

const ContentSection = ({
  content,
  setContent,
}: Props) => {
  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Content
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Main content for this
          alternatives page.
        </p>
      </div>

      <RichTextEditor
        value={content}
        onChange={setContent}
      />
    </section>
  );
};

export default ContentSection;