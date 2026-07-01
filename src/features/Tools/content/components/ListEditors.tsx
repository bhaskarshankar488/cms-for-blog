import { IconPicker } from "../../../../shared/components/IconPicker";

import { TextAreaField, TextField } from "./FormFields";

import type {
  Blog,
  FAQ,
  PerformanceMetric,
  PricingPlan,
} from "../types/toolContent.types";

interface SimpleListEditorProps {
  label: string;
  items: string[];
  placeholder?: string;
  addLabel?: string;
  onChange: (items: string[]) => void;
}

interface IconTitleItem {
  icon: string;
  title: string;
}

interface IconTitleListEditorProps<T extends IconTitleItem> {
  label: string;
  items: T[];
  addLabel?: string;
  createItem: () => T;
  onChange: (items: T[]) => void;
}

interface FAQEditorProps {
  items: FAQ[];
  onChange: (items: FAQ[]) => void;
}

interface BlogEditorProps {
  items: Blog[];
  onChange: (items: Blog[]) => void;
}

interface MetricEditorProps {
  items: PerformanceMetric[];
  onChange: (items: PerformanceMetric[]) => void;
}

interface PricingPlanEditorProps {
  items: PricingPlan[];
  onChange: (items: PricingPlan[]) => void;
}

function removeAt<T>(
  items: T[],
  index: number
) {
  return items.filter((_, itemIndex) =>
    itemIndex !== index
  );
}

function updateAt<T>(
  items: T[],
  index: number,
  item: T
) {
  return items.map((currentItem, itemIndex) =>
    itemIndex === index
      ? item
      : currentItem
  );
}

export function SimpleListEditor({
  label,
  items,
  placeholder,
  addLabel = "Add Item",
  onChange,
}: SimpleListEditorProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {label}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Add and manage {label.toLowerCase()}.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + {addLabel}
        </button>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
          <p className="text-sm font-medium text-gray-700">
            No {label.toLowerCase()} added.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Click "{addLabel}" to add your first item.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300"
            >
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">
                  {label} #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() =>
                    onChange(removeAt(items, index))
                  }
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Remove
                </button>
              </div>

              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder={placeholder || label}
                value={item}
                onChange={(event) =>
                  onChange(
                    updateAt(
                      items,
                      index,
                      event.target.value
                    )
                  )
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export function IconTitleListEditor<T extends IconTitleItem>({
  label,
  items,
  addLabel = "Add Item",
  createItem,
  onChange,
}: IconTitleListEditorProps<T>) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {label}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Add and manage {label.toLowerCase()}.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange([...items, createItem()])
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + {addLabel}
        </button>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
          <p className="text-sm font-medium text-gray-700">
            No {label.toLowerCase()} added.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Click "{addLabel}" to create your first item.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300"
            >
              {/* Card Header */}
              <div className="mb-5 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">
                  {label} #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() =>
                    onChange(removeAt(items, index))
                  }
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Remove
                </button>
              </div>

              {/* Form */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Icon
                  </label>

                  <IconPicker
                    value={item.icon}
                    onChange={(icon) =>
                      onChange(
                        updateAt(items, index, {
                          ...item,
                          icon,
                        })
                      )
                    }
                  />
                </div>

                <TextField
                  label="Title"
                  value={item.title}
                  onChange={(title) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        title,
                      })
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function BlogEditor({
  items,
  onChange,
}: BlogEditorProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Related Blogs
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Add blog articles related to this tool.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange([
              ...items,
              {
                title: "",
                excerpt: "",
                link: "",
              },
            ])
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + Add Blog
        </button>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
          <p className="text-sm font-medium text-gray-700">
            No blogs added.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Click "Add Blog" to create your first related blog.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300"
            >
              {/* Card Header */}
              <div className="mb-5 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">
                  Blog #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() =>
                    onChange(removeAt(items, index))
                  }
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Remove
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <TextField
                  label="Blog Title"
                  value={item.title}
                  onChange={(title) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        title,
                      })
                    )
                  }
                />

                <TextAreaField
                  label="Excerpt"
                  value={item.excerpt}
                  onChange={(excerpt) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        excerpt,
                      })
                    )
                  }
                />

                <TextField
                  label="Blog URL"
                  type="url"
                  value={item.link}
                  onChange={(link) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        link,
                      })
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FAQEditor({
  items,
  onChange,
}: FAQEditorProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Frequently Asked Questions
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Add questions and answers that help users understand the tool.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange([
              ...items,
              {
                question: "",
                answer: "",
              },
            ])
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + Add FAQ
        </button>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
          <p className="text-sm font-medium text-gray-700">
            No FAQs added.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Click "Add FAQ" to create your first question.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300"
            >
              {/* Card Header */}
              <div className="mb-5 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">
                  FAQ #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() =>
                    onChange(removeAt(items, index))
                  }
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Remove
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <TextField
                  label="Question"
                  value={item.question}
                  onChange={(question) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        question,
                      })
                    )
                  }
                />

                <TextAreaField
                  label="Answer"
                  value={item.answer}
                  onChange={(answer) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        answer,
                      })
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function MetricEditor({
  items,
  onChange,
}: MetricEditorProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Performance Metrics
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Add performance statistics that highlight the tool's effectiveness.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange([
              ...items,
              {
                label: "",
                value: "",
                percentage: "",
              },
            ])
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + Add Metric
        </button>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
          <p className="text-sm font-medium text-gray-700">
            No performance metrics added.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Click "Add Metric" to create your first metric.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300"
            >
              {/* Card Header */}
              <div className="mb-5 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">
                  Metric #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() =>
                    onChange(removeAt(items, index))
                  }
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Remove
                </button>
              </div>

              {/* Fields */}
              <div className="grid gap-5 md:grid-cols-3">
                <TextField
                  label="Metric Label"
                  value={item.label}
                  onChange={(label) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        label,
                      })
                    )
                  }
                />

                <TextField
                  label="Metric Value"
                  value={item.value}
                  onChange={(value) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        value,
                      })
                    )
                  }
                />

                <TextField
                  label="Percentage"
                  type="number"
                  value={String(item.percentage)}
                  onChange={(percentage) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        percentage:
                          percentage === ""
                            ? ""
                            : Number(percentage),
                      })
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PricingPlanEditor({
  items,
  onChange,
}: PricingPlanEditorProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Pricing Plans
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Configure pricing plans available for this tool.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange([
              ...items,
              {
                name: "",
                description: "",
                price: "",
                billingPeriod: "",
                badge: "",
                cta: "",
                features: [],
              },
            ])
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + Add Plan
        </button>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">
          <p className="text-sm font-medium text-gray-700">
            No pricing plans added.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Click "Add Plan" to create your first pricing plan.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300"
            >
              {/* Card Header */}
              <div className="mb-5 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">
                  Plan #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() =>
                    onChange(removeAt(items, index))
                  }
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Remove
                </button>
              </div>

              {/* Basic Details */}
              <div className="grid gap-5 md:grid-cols-2">
                <TextField
                  label="Plan Name"
                  value={item.name}
                  onChange={(name) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        name,
                      })
                    )
                  }
                />

                <TextField
                  label="Price"
                  value={item.price}
                  onChange={(price) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        price,
                      })
                    )
                  }
                />

                <TextField
                  label="Billing Period"
                  value={item.billingPeriod}
                  onChange={(billingPeriod) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        billingPeriod,
                      })
                    )
                  }
                />

                <TextField
                  label="Badge"
                  value={item.badge}
                  onChange={(badge) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        badge,
                      })
                    )
                  }
                />

                <div className="md:col-span-2">
                  <TextField
                    label="Call to Action"
                    value={item.cta}
                    onChange={(cta) =>
                      onChange(
                        updateAt(items, index, {
                          ...item,
                          cta,
                        })
                      )
                    }
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mt-5">
                <TextAreaField
                  label="Description"
                  value={item.description}
                  onChange={(description) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        description,
                      })
                    )
                  }
                />
              </div>

              {/* Features */}
              <div className="mt-6 rounded-lg border border-gray-200 p-4">
                <SimpleListEditor
                  label="Plan Features"
                  items={item.features}
                  addLabel="Add Feature"
                  onChange={(features) =>
                    onChange(
                      updateAt(items, index, {
                        ...item,
                        features,
                      })
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
