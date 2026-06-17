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
    <FormSection title="Hero">
      <button
        type="button"
        className="px-3 py-2 bg-blue-500 text-white rounded"
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
      >
        Add badge
      </button>

      {value.hero_badges.map((badge, index) => (
        <div
          key={index}
          className="space-y-3 rounded border p-3"
        >
          <IconPicker
            value={badge.icon}
            onChange={(icon) =>
              onChange({
                hero_badges: value.hero_badges.map((item, itemIndex) =>
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

          <TextField
            label="Text"
            value={badge.text}
            onChange={(text) =>
              onChange({
                hero_badges: value.hero_badges.map((item, itemIndex) =>
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

          <button
            type="button"
            className="px-3 py-2 bg-red-500 text-white rounded"
            onClick={() =>
              onChange({
                hero_badges: value.hero_badges.filter((_, itemIndex) =>
                  itemIndex !== index
                ),
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
    </FormSection>
  );
}
