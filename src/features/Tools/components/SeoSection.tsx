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
    return (
        <div className="space-y-4">
            <div className="border-b pb-3 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    SEO Section
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage meta title, description, keywords, and search engine settings.
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
                            metaTitle: e.target.value,
                        },
                    }))
                }
                className="w-full p-3 border rounded"
            />

            <textarea
                placeholder="Meta Description"
                rows={4}
                value={form.seo.metaDescription}
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
                className="w-full p-3 border rounded"
            />

            <input
                type="text"
                placeholder="keyword1, keyword2, keyword3"
                value={form.seo.metaKeywords.join(", ")}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        seo: {
                            ...prev.seo,
                            metaKeywords:
                                e.target.value
                                    .split(",")
                                    .map((k) => k.trim())
                                    .filter(Boolean),
                        },
                    }))
                }
                className="w-full p-3 border rounded"
            />
        </div>
    );
}