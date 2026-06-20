import { useEffect, useState } from "react";

import { toolSchema } from "./validation/tool.schema";


import type { ToolResponse } from "./types/tool.types";

import { buildToolFormData } from "./utils/buildToolFormData"

import BasicInfoSection from "./components/BasicInfoSection";
import RatingSection from "./components/RatingSection";
import TagsSection from "./components/TagsSection";

import SeoSection from "./components/SeoSection";
import CategorySection from "../../shared/Component/CategorySection";
import ImageUpload from "../../shared/Component/ImageUpload";


import { useCategories } from "../../shared/hook/useCategories";
import { useToolForm } from "./hooks/useToolForm"

import { TOOL_TAGS } from "./constants/tool.constants";

interface Props {
  onSubmit: (
    formData: FormData
  ) => Promise<void> | void;

  initialData?: ToolResponse;

  toolImageUrl?: string;
  heroImageUrl?: string;
  faqImageUrl?: string;
}

export default function ToolForm({
  onSubmit,
  initialData,

  toolImageUrl,
  heroImageUrl,
  faqImageUrl,
}: Props) {

  const {
    form,
    setForm,

    toolImage,
    setToolImage,

    heroImage,
    setHeroImage,

    faqImage,
    setFaqImage,
  } = useToolForm();

  useEffect(() => {
    if (!initialData) return;

    setForm(initialData);
  }, [initialData, setForm]);

  const [loading, setLoading] =
    useState(false);

  const { categories } = useCategories();

  const handleSubmit = async () => {

    const result =
      toolSchema.safeParse(form);

    if (!result.success) {
      alert(
        result.error.issues[0].message
      );
      return;
    }

    try {
      setLoading(true);

      const formData =
        buildToolFormData(
          form,
          toolImage,
          heroImage,
          faqImage
        );

      await onSubmit(formData);

      alert(
        initialData
          ? "Tool updated successfully!"
          : "Tool created successfully!"
      );


    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="mt-8 space-y-12">
    <div className="border-t pt-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Tool Information
      </h2>
    </div>

    <section className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 px-4 py-3 rounded-md">
        <h2 className="text-xl font-bold text-blue-700">
          Basic Information
        </h2>
      </div>

      <BasicInfoSection
        form={form}
        setForm={setForm}
        isEditMode={!!initialData}
      />
    </section>

    <section className="space-y-6">
      <div className="bg-green-50 border-l-4 border-green-500 px-4 py-3 rounded-md">
        <h2 className="text-xl font-bold text-green-700">
          Category Section
        </h2>
      </div>

      <CategorySection
        value={form.categoryId}
        categories={categories}
        onChange={(categoryId) =>
          setForm({
            ...form,
            categoryId,
          })
        }
      />
    </section>

    <section className="space-y-6">
      <div className="bg-purple-50 border-l-4 border-purple-500 px-4 py-3 rounded-md">
        <h2 className="text-xl font-bold text-purple-700">
          SEO Section
        </h2>
      </div>

      <SeoSection
        form={form}
        setForm={setForm}
      />
    </section>

    <section className="space-y-6">
      <div className="bg-orange-50 border-l-4 border-orange-500 px-4 py-3 rounded-md">
        <h2 className="text-xl font-bold text-orange-700">
          Images Section
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <ImageUpload
          label="Tool Image"
          initialPreview={toolImageUrl}
          onFileChange={setToolImage}
        />

        <ImageUpload
          label="Hero Image"
          initialPreview={heroImageUrl}
          onFileChange={setHeroImage}
        />

        <ImageUpload
          label="FAQ Image"
          initialPreview={faqImageUrl}
          onFileChange={setFaqImage}
        />
      </div>
    </section>

    <section className="space-y-6">
      <div className="bg-cyan-50 border-l-4 border-cyan-500 px-4 py-3 rounded-md">
        <h2 className="text-xl font-bold text-cyan-700">
          Ratings & Reviews
        </h2>
      </div>

      <RatingSection
        form={form}
        setForm={setForm}
      />
    </section>

    <section className="space-y-6">
      <div className="bg-emerald-50 border-l-4 border-emerald-500 px-4 py-3 rounded-md">
        <h2 className="text-xl font-bold text-emerald-700">
          Tags Section
        </h2>
      </div>

      <TagsSection
        selectedTags={form.tags}
        setSelectedTags={(tags) =>
          setForm({
            ...form,
            tags,
          })
        }
        availableTags={TOOL_TAGS}
        maxTags={3}
        label="Tool Tags"
      />
    </section>

    <button
      type="button"
      disabled={loading}
      onClick={handleSubmit}
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      {loading
        ? "Saving..."
        : initialData
          ? "Update Tool"
          : "Create Tool"}
    </button>
  </div>
);
}