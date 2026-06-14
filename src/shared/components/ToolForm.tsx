import { useState } from "react";

import { IconPicker } from "./IconPicker";
import { IconPreview } from "./IconPreview";

export function ToolForm() {
  const [form, setForm] = useState({
    title: "",
    icon: "",
  });

  return (
    <form className="mx-auto max-w-2xl space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="tool-title">
          Tool title
        </label>
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          id="tool-title"
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              title: event.target.value,
            }))
          }
          placeholder="Enter tool title"
          type="text"
          value={form.title}
        />
      </div>

      <IconPicker
        value={form.icon}
        onChange={(icon) =>
          setForm((prev) => ({
            ...prev,
            icon,
          }))
        }
      />

      <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
        <p className="mb-3 text-sm font-medium text-slate-700">Selected icon preview</p>
        <div className="flex items-center gap-3 text-sm text-slate-700">
          <IconPreview icon={form.icon} size={24} />
          <span>{form.icon || "No icon selected"}</span>
        </div>
      </div>
    </form>
  );
}
