import { useState } from "react";
import type { ToolFormData } from "../types/tool.types";

interface Props {
  form: ToolFormData;
  setForm: React.Dispatch<React.SetStateAction<ToolFormData>>;
}

export default function SeoSection({
  form,
  setForm,
}: Props) {
  const [keyword, setKeyword] = useState("");

  const addKeyword = () => {
    const value = keyword.trim();

    if (!value) return;

    const exists = form.seo.metaKeywords.some(
      (item) => item.toLowerCase() === value.toLowerCase()
    );

    if (exists) {
      setKeyword("");
      return;
    }

    setForm((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        metaKeywords: [...prev.seo.metaKeywords, value],
      },
    }));

    setKeyword("");
  };

  const removeKeyword = (index: number) => {
    setForm((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        metaKeywords: prev.seo.metaKeywords.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleKeywordKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Search Engine Optimization
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Configure the SEO information for this tool.
        </p>
      </div>

      {/* Meta Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Meta Title
        </label>

        <input
          type="text"
          placeholder="Enter meta title"
          value={form.seo.metaTitle}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              seo: {
                ...prev.seo,
                metaTitle: e.target.value,
              },
            }))
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Meta Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Meta Description
        </label>

        <textarea
          rows={4}
          placeholder="Enter meta description"
          value={form.seo.metaDescription}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              seo: {
                ...prev.seo,
                metaDescription: e.target.value,
              },
            }))
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Keywords */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          SEO Keywords
        </label>

        <div className="flex gap-3">
          <input
            type="text"
            value={keyword}
            placeholder="Type a keyword"
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeywordKeyDown}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <button
            type="button"
            onClick={addKeyword}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Press Enter or click Add to insert a keyword.
        </p>

        {form.seo.metaKeywords.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {form.seo.metaKeywords.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1.5"
              >
                <span className="text-sm text-gray-700">
                  {item}
                </span>

                <button
                  type="button"
                  onClick={() => removeKeyword(index)}
                  className="text-gray-400 transition hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}