interface Props {
  faq: any[]
  addFaq: () => void
  removeFaq: (index: number) => void
  updateFaq: (
    index: number,
    field: string,
    value: string
  ) => void
}

export default function FAQSection({
  faq,
  addFaq,
  removeFaq,
  updateFaq,
}: Props) {
  return (
    <>
      <h2 className="text-lg sm:text-xl font-semibold">
        FAQ
      </h2>

      <button
        onClick={addFaq}
        className="bg-gray-200 px-4 py-2 rounded"
      >
        + Add FAQ
      </button>

      <div className="space-y-4">

        {faq.map((item, index) => (

          <div
            key={index}
            className="border p-4 rounded"
          >

            <input
              placeholder="Question"
              className="w-full mb-2 p-3 border rounded"
              value={item.question}
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
              className="w-full p-3 border rounded"
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

        ))}

      </div>
    </>
  )
}