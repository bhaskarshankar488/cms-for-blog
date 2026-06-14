import { useState } from "react";

import { IconPreview } from "./IconPreview";
import { IconSearchModal } from "./IconSearchModal";

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div
        className={[
          "flex items-center gap-3 rounded-md border p-3 transition",
          value ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white",
        ].join(" ")}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
          <IconPreview icon={value} size={24} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-900">Selected icon</p>
          <p className="truncate text-sm text-slate-500">{value || "No icon selected"}</p>
        </div>
        <button
          aria-haspopup="dialog"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          Choose Icon
        </button>
      </div>

      {isModalOpen ? (
        <IconSearchModal
          onClose={() => setIsModalOpen(false)}
          onSelect={onChange}
          selectedIcon={value}
        />
      ) : null}
    </div>
  );
}
