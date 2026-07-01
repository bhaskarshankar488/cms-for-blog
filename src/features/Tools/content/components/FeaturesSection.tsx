import { FormSection, TextAreaField, TextField } from "./FormFields";
import { IconPicker } from "../../../../shared/components/IconPicker";

import type { Feature } from "../types/toolContent.types";

interface Props {
  value: Feature[];
  onChange: (value: Feature[]) => void;
}

export default function FeaturesSection({
  value,
  onChange,
}: Props) {
  return (
    <FormSection title="Features">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Features
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add the key features that highlight what this tool offers.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onChange([
                ...value,
                {
                  icon: "",
                  title: "",
                  description: "",
                },
              ])
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Add Feature
          </button>
        </div>

        {/* Empty State */}
        {value.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
            <p className="text-sm font-medium text-gray-700">
              No features added.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Click "Add Feature" to create your first feature.
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
                    Feature #{index + 1}
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

                {/* Fields */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Icon
                    </label>

                    <IconPicker
                      value={item.icon}
                      onChange={(icon) =>
                        onChange(
                          value.map(
                            (currentItem, itemIndex) =>
                              itemIndex === index
                                ? {
                                    ...currentItem,
                                    icon,
                                  }
                                : currentItem
                          )
                        )
                      }
                    />
                  </div>

                  <TextField
                    label="Feature Title"
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
                </div>

                <TextAreaField
                  label="Feature Description"
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
            ))}
          </div>
        )}
      </div>
    </FormSection>
  );
}