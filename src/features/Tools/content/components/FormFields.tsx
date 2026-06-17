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
    <section className="space-y-4 rounded border p-4">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      {children}
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
    <label className="block space-y-2">
      <span className="text-sm font-medium">
        {label}
      </span>

      <input
        type={type}
        placeholder={placeholder || label}
        className="w-full p-3 border rounded"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  placeholder,
  rows = 4,
  onChange,
}: TextAreaFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">
        {label}
      </span>

      <textarea
        placeholder={placeholder || label}
        className="w-full p-3 border rounded"
        rows={rows}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />
    </label>
  );
}
import type { ReactNode } from "react";
