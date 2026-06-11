interface Props {
  handleSubmit: (
    status: string
  ) => void
}

export default function ActionButtons({
  handleSubmit,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">

      <button
        onClick={() =>
          handleSubmit("draft")
        }
        className="bg-gray-600 text-white px-4 py-2 rounded-lg"
      >
        Save Draft
      </button>

      <button
        onClick={() =>
          handleSubmit("draft")
        }
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Save
      </button>

      <button
        onClick={() =>
          handleSubmit("published")
        }
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Publish
      </button>

    </div>
  )
}