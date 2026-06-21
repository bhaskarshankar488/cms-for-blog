import type {
  AlternativeFormData,
} from "../types/alternative.types";

interface Props {
  formData: AlternativeFormData;

  setFormData: React.Dispatch<
    React.SetStateAction<
      AlternativeFormData
    >
  >;
}

const FaqSection = ({
  formData,
  setFormData,
}: Props) => {
  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,

      faq: [
        ...prev.faq,

        {
          question: "",
          answer: "",
        },
      ],
    }));
  };

  const updateFaq = (
    index: number,
    field:
      | "question"
      | "answer",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,

      faq: prev.faq.map(
        (item, i) =>
          i === index
            ? {
                ...item,
                [field]: value,
              }
            : item
      ),
    }));
  };

  const removeFaq = (
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,

      faq: prev.faq.filter(
        (_, i) =>
          i !== index
      ),
    }));
  };

  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            FAQs
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add frequently asked
            questions for this
            alternatives page.
          </p>
        </div>

        <button
          type="button"
          onClick={addFaq}
          className="rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Add FAQ
        </button>
      </div>

      {formData.faq.length ===
        0 && (
        <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">
          No FAQs added yet.
        </div>
      )}

      <div className="space-y-4">
        {formData.faq.map(
          (
            faq,
            index
          ) => (
            <div
              key={index}
              className="rounded-lg border bg-gray-50 p-4"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Future Drag Handle */}
                  <div className="cursor-grab text-gray-400">
                    ☰
                  </div>

                  <h3 className="font-semibold">
                    FAQ{" "}
                    {index +
                      1}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeFaq(
                      index
                    )
                  }
                  className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Question
                  </label>

                  <input
                    type="text"
                    value={
                      faq.question
                    }
                    onChange={(
                      e
                    ) =>
                      updateFaq(
                        index,
                        "question",
                        e
                          .target
                          .value
                      )
                    }
                    placeholder="Enter question"
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Answer
                  </label>

                  <textarea
                    rows={4}
                    value={
                      faq.answer
                    }
                    onChange={(
                      e
                    ) =>
                      updateFaq(
                        index,
                        "answer",
                        e
                          .target
                          .value
                      )
                    }
                    placeholder="Enter answer"
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default FaqSection;