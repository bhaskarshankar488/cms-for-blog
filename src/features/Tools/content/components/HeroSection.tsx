import { IconPicker } from "../../../../shared/components/IconPicker";

import { FormSection, TextField } from "./FormFields";

import type { Hero } from "../types/toolContent.types";

interface Props {
  value: Hero;
  onChange: (value: Hero) => void;
}

export default function HeroSection({
  value,
  onChange,
}: Props) {
  return (
  <FormSection
    title="Hero Badges"
  >
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Hero Badges
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Showcase important highlights with an icon and short text.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange({
              hero_badges: [
                ...value.hero_badges,
                {
                  text: "",
                  icon: "",
                },
              ],
            })
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + Add Badge
        </button>
      </div>

      {/* Empty State */}
      {value.hero_badges.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
          <p className="text-sm font-medium text-gray-700">
            No hero badges added.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Click <strong>Add Badge</strong> to create one.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {value.hero_badges.map((badge, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300"
            >
              <div className="mb-5 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">
                  Badge #{index + 1}
                </h4>

                <button
                  type="button"
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  onClick={() =>
                    onChange({
                      hero_badges: value.hero_badges.filter(
                        (_, itemIndex) => itemIndex !== index
                      ),
                    })
                  }
                >
                  Remove
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Icon
                  </label>

                  <IconPicker
                    value={badge.icon}
                    onChange={(icon) =>
                      onChange({
                        hero_badges: value.hero_badges.map(
                          (item, itemIndex) =>
                            itemIndex === index
                              ? {
                                  ...item,
                                  icon,
                                }
                              : item
                        ),
                      })
                    }
                  />
                </div>

                <TextField
                  label="Badge Text"
                  value={badge.text}
                  onChange={(text) =>
                    onChange({
                      hero_badges: value.hero_badges.map(
                        (item, itemIndex) =>
                          itemIndex === index
                            ? {
                                ...item,
                                text,
                              }
                            : item
                      ),
                    })
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
