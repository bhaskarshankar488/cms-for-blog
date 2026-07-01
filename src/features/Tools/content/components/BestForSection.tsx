import { IconPicker } from "../../../../shared/components/IconPicker";
import {
  FormSection,
  TextAreaField,
  TextField,
} from "./FormFields";

import type { BestFor } from "../types/toolContent.types";

interface Props {
  value: BestFor[];
  onChange: (value: BestFor[]) => void;
}

export default function BestForSection({
  value,
  onChange,
}: Props) {
  return (
    <FormSection title="Best For">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Best For
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Define the audience who benefits most from this tool.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onChange([
                ...value,
                {
                  icon: "",
                  persona: "",
                  description: "",
                },
              ])
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Add Persona
          </button>
        </div>

        {/* Empty State */}
        {value.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
            <p className="text-sm font-medium text-gray-700">
              No personas added.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Click "Add Persona" to create one.
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
                    Persona #{index + 1}
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
                            (
                              currentItem,
                              itemIndex
                            ) =>
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
                    label="Persona"
                    value={item.persona}
                    onChange={(persona) =>
                      onChange(
                        value.map(
                          (
                            currentItem,
                            itemIndex
                          ) =>
                            itemIndex === index
                              ? {
                                  ...currentItem,
                                  persona,
                                }
                              : currentItem
                        )
                      )
                    }
                  />
                </div>

                <TextAreaField
                  label="Description"
                  value={item.description}
                  onChange={(description) =>
                    onChange(
                      value.map(
                        (
                          currentItem,
                          itemIndex
                        ) =>
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