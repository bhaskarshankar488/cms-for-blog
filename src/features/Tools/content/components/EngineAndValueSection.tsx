import { FormSection, TextAreaField, TextField } from "./FormFields";

import { IconPicker } from "../../../../shared/components/IconPicker";

import type { EngineAndValue } from "../types/toolContent.types";

interface Props {
  value: EngineAndValue[];
  onChange: (value: EngineAndValue[]) => void;
}

export default function EngineAndValueSection({
  value,
  onChange,
}: Props) {
  return (
    <FormSection title="Engine & Value">
      <button
        type="button"
        className="px-3 py-2 bg-blue-500 text-white rounded"
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
      >
        Add item
      </button>

      {value.map((item, index) => (
        <div
          key={index}
          className="space-y-3 rounded border p-3"
        >
          <IconPicker
            value={item.icon}
            onChange={(icon) =>
              onChange(value.map((currentItem, itemIndex) =>
                itemIndex === index
                  ? {
                    ...currentItem,
                    icon,
                  }
                  : currentItem
              ))
            }
          />

          <TextField
            label="Title"
            value={item.title}
            onChange={(title) =>
              onChange(value.map((currentItem, itemIndex) =>
                itemIndex === index
                  ? {
                    ...currentItem,
                    title,
                  }
                  : currentItem
              ))
            }
          />

          <TextAreaField
            label="Description"
            value={item.description}
            onChange={(description) =>
              onChange(value.map((currentItem, itemIndex) =>
                itemIndex === index
                  ? {
                    ...currentItem,
                    description,
                  }
                  : currentItem
              ))
            }
          />

          <button
            type="button"
            className="px-3 py-2 bg-red-500 text-white rounded"
            onClick={() =>
              onChange(value.filter((_, itemIndex) =>
                itemIndex !== index
              ))
            }
          >
            Remove
          </button>
        </div>
      ))}
    </FormSection>
  );
}
