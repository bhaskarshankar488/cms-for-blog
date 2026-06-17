import { IconPicker } from "../../../../shared/components/IconPicker";

import { FormSection, TextAreaField, TextField } from "./FormFields";

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
      <button
        type="button"
        className="px-3 py-2 bg-blue-500 text-white rounded"
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
      >
        Add persona
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
            label="Persona"
            value={item.persona}
            onChange={(persona) =>
              onChange(value.map((currentItem, itemIndex) =>
                itemIndex === index
                  ? {
                    ...currentItem,
                    persona,
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
