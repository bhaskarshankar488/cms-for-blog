import type { ReactNode } from "react";

interface TextFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (value: string) => void;
}

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export function FormSection({
  title,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {title}
        </h2>
      </div>

      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}

export function TextField({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-sm
          text-gray-900
          placeholder:text-gray-400
          outline-none
          transition
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
        "
      />
    </div>
  );
}

export function TextAreaField({
  label,
  value,
  placeholder,
  rows = 5,
  onChange,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-sm
          text-gray-900
          placeholder:text-gray-400
          outline-none
          transition
          resize-y
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
        "
      />
    </div>
  );
}