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
  addLabel = "Add item",
  onChange,
}: SimpleListEditorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">
          {label}
        </p>

        <button
          type="button"
          className="px-3 py-2 bg-blue-500 text-white rounded"
          onClick={() =>
            onChange([...items, ""])
          }
        >
          {addLabel}
        </button>
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          className="flex gap-2"
        >
          <input
            className="w-full p-3 border rounded"
            placeholder={placeholder || label}
            value={item}
            onChange={(event) =>
              onChange(updateAt(items, index, event.target.value))
            }
          />

          <button
            type="button"
            className="px-3 py-2 bg-red-500 text-white rounded"
            onClick={() =>
              onChange(removeAt(items, index))
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export function IconTitleListEditor<T extends IconTitleItem>({
  label,
  items,
  addLabel = "Add item",
  createItem,
  onChange,
}: IconTitleListEditorProps<T>) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">
          {label}
        </p>

        <button
          type="button"
          className="px-3 py-2 bg-blue-500 text-white rounded"
          onClick={() =>
            onChange([...items, createItem()])
          }
        >
          {addLabel}
        </button>
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          className="space-y-3 rounded border p-3"
        >
          <IconPicker
            value={item.icon}
            onChange={(icon) =>
              onChange(updateAt(items, index, {
                ...item,
                icon,
              }))
            }
          />

          <TextField
            label="Title"
            value={item.title}
            onChange={(title) =>
              onChange(updateAt(items, index, {
                ...item,
                title,
              }))
            }
          />

          <button
            type="button"
            className="px-3 py-2 bg-red-500 text-white rounded"
            onClick={() =>
              onChange(removeAt(items, index))
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export function BlogEditor({
  items,
  onChange,
}: BlogEditorProps) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="px-3 py-2 bg-blue-500 text-white rounded"
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
      >
        Add blog
      </button>

      {items.map((item, index) => (
        <div
          key={index}
          className="space-y-3 rounded border p-3"
        >
          <TextField
            label="Title"
            value={item.title}
            onChange={(title) =>
              onChange(updateAt(items, index, {
                ...item,
                title,
              }))
            }
          />

          <TextAreaField
            label="Excerpt"
            value={item.excerpt}
            onChange={(excerpt) =>
              onChange(updateAt(items, index, {
                ...item,
                excerpt,
              }))
            }
          />

          <TextField
            label="Link"
            type="url"
            value={item.link}
            onChange={(link) =>
              onChange(updateAt(items, index, {
                ...item,
                link,
              }))
            }
          />

          <button
            type="button"
            className="px-3 py-2 bg-red-500 text-white rounded"
            onClick={() =>
              onChange(removeAt(items, index))
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export function FAQEditor({
  items,
  onChange,
}: FAQEditorProps) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="px-3 py-2 bg-blue-500 text-white rounded"
        onClick={() =>
          onChange([
            ...items,
            {
              question: "",
              answer: "",
            },
          ])
        }
      >
        Add FAQ
      </button>

      {items.map((item, index) => (
        <div
          key={index}
          className="space-y-3 rounded border p-3"
        >
          <TextField
            label="Question"
            value={item.question}
            onChange={(question) =>
              onChange(updateAt(items, index, {
                ...item,
                question,
              }))
            }
          />

          <TextAreaField
            label="Answer"
            value={item.answer}
            onChange={(answer) =>
              onChange(updateAt(items, index, {
                ...item,
                answer,
              }))
            }
          />

          <button
            type="button"
            className="px-3 py-2 bg-red-500 text-white rounded"
            onClick={() =>
              onChange(removeAt(items, index))
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export function MetricEditor({
  items,
  onChange,
}: MetricEditorProps) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="px-3 py-2 bg-blue-500 text-white rounded"
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
      >
        Add metric
      </button>

      {items.map((item, index) => (
        <div
          key={index}
          className="grid gap-3 rounded border p-3 md:grid-cols-3"
        >
          <TextField
            label="Label"
            value={item.label}
            onChange={(label) =>
              onChange(updateAt(items, index, {
                ...item,
                label,
              }))
            }
          />

          <TextField
            label="Value"
            value={item.value}
            onChange={(value) =>
              onChange(updateAt(items, index, {
                ...item,
                value,
              }))
            }
          />

          <TextField
            label="Percentage"
            type="number"
            value={String(item.percentage)}
            onChange={(percentage) =>
              onChange(updateAt(items, index, {
                ...item,
                percentage: percentage === ""
                  ? ""
                  : Number(percentage),
              }))
            }
          />

          <button
            type="button"
            className="px-3 py-2 bg-red-500 text-white rounded md:col-span-3"
            onClick={() =>
              onChange(removeAt(items, index))
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export function PricingPlanEditor({
  items,
  onChange,
}: PricingPlanEditorProps) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="px-3 py-2 bg-blue-500 text-white rounded"
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
      >
        Add plan
      </button>

      {items.map((item, index) => (
        <div
          key={index}
          className="space-y-3 rounded border p-3"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <TextField
              label="Name"
              value={item.name}
              onChange={(name) =>
                onChange(updateAt(items, index, {
                  ...item,
                  name,
                }))
              }
            />

            <TextField
              label="Price"
              value={item.price}
              onChange={(price) =>
                onChange(updateAt(items, index, {
                  ...item,
                  price,
                }))
              }
            />

            <TextField
              label="Billing period"
              value={item.billingPeriod}
              onChange={(billingPeriod) =>
                onChange(updateAt(items, index, {
                  ...item,
                  billingPeriod,
                }))
              }
            />

            <TextField
              label="Badge"
              value={item.badge}
              onChange={(badge) =>
                onChange(updateAt(items, index, {
                  ...item,
                  badge,
                }))
              }
            />

            <TextField
              label="CTA"
              value={item.cta}
              onChange={(cta) =>
                onChange(updateAt(items, index, {
                  ...item,
                  cta,
                }))
              }
            />
          </div>

          <TextAreaField
            label="Description"
            value={item.description}
            onChange={(description) =>
              onChange(updateAt(items, index, {
                ...item,
                description,
              }))
            }
          />

          <SimpleListEditor
            label="Plan features"
            items={item.features}
            addLabel="Add feature"
            onChange={(features) =>
              onChange(updateAt(items, index, {
                ...item,
                features,
              }))
            }
          />

          <button
            type="button"
            className="px-3 py-2 bg-red-500 text-white rounded"
            onClick={() =>
              onChange(removeAt(items, index))
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
