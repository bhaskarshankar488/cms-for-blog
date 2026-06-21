import { useState } from "react";

import type {
  AlternativeFormData,
} from "../types/alternative.types";

interface Props {
  formData: AlternativeFormData;

  setFormData: React.Dispatch<
    React.SetStateAction<
      AlternativeFormData
    >
  >;
}

const SeoSection = ({
  formData,
  setFormData,
}: Props) => {
  const [keyword, setKeyword] =
    useState("");

  const addKeyword = () => {
    const value =
      keyword.trim();

    if (!value) return;

    if (
      formData.seo.metaKeywords.includes(
        value
      )
    ) {
      setKeyword("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        metaKeywords: [
          ...prev.seo
            .metaKeywords,
          value,
        ],
      },
    }));

    setKeyword("");
  };

  const removeKeyword = (
    keywordToRemove: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        metaKeywords:
          prev.seo.metaKeywords.filter(
            (item) =>
              item !==
              keywordToRemove
          ),
      },
    }));
  };

  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          SEO Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Configure search engine
          optimization settings.
        </p>
      </div>

      <div className="space-y-6">
        {/* Meta Title */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">
              Meta Title
            </label>

            <span className="text-xs text-gray-500">
              {
                formData.seo
                  .metaTitle.length
              }
              /60
            </span>
          </div>

          <input
            type="text"
            value={
              formData.seo
                .metaTitle
            }
            onChange={(e) =>
              setFormData(
                (prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    metaTitle:
                      e.target
                        .value,
                  },
                })
              )
            }
            placeholder="Enter meta title"
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        {/* Meta Description */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">
              Meta Description
            </label>

            <span className="text-xs text-gray-500">
              {
                formData.seo
                  .metaDescription
                  .length
              }
              /160
            </span>
          </div>

          <textarea
            rows={4}
            value={
              formData.seo
                .metaDescription
            }
            onChange={(e) =>
              setFormData(
                (prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    metaDescription:
                      e.target
                        .value,
                  },
                })
              )
            }
            placeholder="Enter meta description"
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        {/* Meta Keywords */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Meta Keywords
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) =>
                setKeyword(
                  e.target.value
                )
              }
              placeholder="Add keyword"
              className="flex-1 rounded-md border px-3 py-2 outline-none focus:ring-2"
              onKeyDown={(e) => {
                if (
                  e.key ===
                  "Enter"
                ) {
                  e.preventDefault();
                  addKeyword();
                }
              }}
            />

            <button
              type="button"
              onClick={addKeyword}
              className="rounded-md border px-4 py-2"
            >
              Add
            </button>
          </div>

          {formData.seo
            .metaKeywords.length >
            0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.seo.metaKeywords.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
                  >
                    <span>
                      {item}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeKeyword(
                          item
                        )
                      }
                      className="text-red-500"
                    >
                      ×
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SeoSection;