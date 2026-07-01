import {
  FormSection,
  TextAreaField,
  TextField,
} from "./FormFields";

import type { UnderTheHood } from "../types/toolContent.types";

interface Props {
  value: UnderTheHood[];
  onChange: (value: UnderTheHood[]) => void;
}

export default function UnderTheHoodSection({
  value,
  onChange,
}: Props) {
  return (
    <FormSection title="Under The Hood">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Under The Hood
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Explain the technology, architecture, or internal workings behind
              the tool.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onChange([
                ...value,
                {
                  title: "",
                  description: "",
                },
              ])
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Add Item
          </button>
        </div>

        {/* Empty State */}
        {value.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
            <p className="text-sm font-medium text-gray-700">
              No items added.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Click "Add Item" to create your first entry.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {value.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300"
              >
                {/* Card Header */}
                <div className="mb-5 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Item #{index + 1}
                  </h4>

                  <button
                    type="button"
                    onClick={() =>
                      onChange(
                        value.filter(
                          (_, itemIndex) =>
                            itemIndex !== index
                        )
                      )
                    }
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-5">
                  <TextField
                    label="Title"
                    value={item.title}
                    onChange={(title) =>
                      onChange(
                        value.map(
                          (currentItem, itemIndex) =>
                            itemIndex === index
                              ? {
                                  ...currentItem,
                                  title,
                                }
                              : currentItem
                        )
                      )
                    }
                  />

                  <TextAreaField
                    label="Description"
                    rows={5}
                    value={item.description}
                    onChange={(description) =>
                      onChange(
                        value.map(
                          (currentItem, itemIndex) =>
                            itemIndex === index
                              ? {
                                  ...currentItem,
                                  description,
                                }
                              : currentItem
                        )
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </FormSection>
  );
}