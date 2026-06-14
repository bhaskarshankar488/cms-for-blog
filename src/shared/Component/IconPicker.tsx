import { useState } from "react";
import { Icon } from "@iconify/react";

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
}

const SUGGESTED_ICONS = [
  "mdi:code-tags",
  "mdi:laptop",
  "mdi:robot",
  "mdi:pencil",
  "mdi:file-document",
  "mdi:calendar",
  "mdi:star",
  "mdi:account-group",
  "mdi:chart-line",
  "mdi:video",
  "mdi:camera",
  "mdi:shield-check",
];

export default function IconPicker({
  value,
  onChange,
}: IconPickerProps) {
  const [search, setSearch] = useState("");

  const filteredIcons = SUGGESTED_ICONS.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <label className="block mb-2 font-medium">
        Search Icon
      </label>

      <input
        type="text"
        placeholder="coding, ai, writing..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <div className="grid grid-cols-4 gap-3">
        {filteredIcons.map((icon) => (
          <button
            key={icon}
            type="button"
            onClick={() => onChange(icon)}
            className={`border rounded p-3 flex flex-col items-center ${
              value === icon
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            <Icon icon={icon} width={24} />

            <span className="text-xs mt-2 break-all">
              {icon}
            </span>
          </button>
        ))}
      </div>

      {value && (
        <div className="mt-4 flex items-center gap-2">
          <span>Selected:</span>
          <Icon icon={value} width={20} />
          <span>{value}</span>
        </div>
      )}
    </div>
  );
}