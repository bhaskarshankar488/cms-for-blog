import { useState } from "react";
import type { ToolFormData } from "../types/tool.types";

interface Props {
    form: ToolFormData;
    setForm: React.Dispatch<
        React.SetStateAction<ToolFormData>
    >;
}

export default function SeoSection({
    form,
    setForm,
}: Props) {
    const [keyword, setKeyword] =
        useState("");

    const addKeyword = () => {
        const value = keyword.trim();

        if (
            !value ||
            form.seo.metaKeywords.includes(
                value
            )
        )
            return;

        setForm((prev) => ({
            ...prev,
            seo: {
                ...prev.seo,
                metaKeywords: [
                    ...prev.seo.metaKeywords,
                    value,
                ],
            },
        }));

        setKeyword("");
    };

    const removeKeyword = (
        index: number
    ) => {
        setForm((prev) => ({
            ...prev,
            seo: {
                ...prev.seo,
                metaKeywords:
                    prev.seo.metaKeywords.filter(
                        (_, i) =>
                            i !== index
                    ),
            },
        }));
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-3">
                <h1 className="text-2xl font-bold text-gray-800">
                    SEO Section
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage meta title,
                    description, and SEO
                    keywords.
                </p>
            </div>

            <input
                type="text"
                placeholder="Meta Title"
                value={form.seo.metaTitle}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        seo: {
                            ...prev.seo,
                            metaTitle:
                                e.target.value,
                        },
                    }))
                }
                className="w-full rounded-lg border p-3"
            />

            <textarea
                rows={4}
                placeholder="Meta Description"
                value={
                    form.seo.metaDescription
                }
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        seo: {
                            ...prev.seo,
                            metaDescription:
                                e.target.value,
                        },
                    }))
                }
                className="w-full rounded-lg border p-3"
            />

            {/* Keywords */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                    SEO Keywords
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
                        placeholder="Enter keyword"
                        className="flex-1 rounded-lg border p-3"
                    />

                    <button
                        type="button"
                        onClick={addKeyword}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Add
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {form.seo.metaKeywords.map(
                        (
                            item,
                            index
                        ) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                            >
                                <span>
                                    {item}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeKeyword(
                                            index
                                        )
                                    }
                                    className="font-bold text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}