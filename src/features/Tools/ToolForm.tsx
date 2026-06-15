import { useEffect, useState } from "react";

import { toolSchema } from "./validation/tool.schema";


import type { ToolFormData, ToolResponse } from "./types/tool.types";

import { buildToolFormData } from "./utils/buildToolFormData"

import BasicInfoSection from "./components/BasicInfoSection";
import RatingSection from "./components/RatingSection";
import TagsSection from "./components/TagsSection";
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
    <div className="space-y-4">
      <BasicInfoSection
        form={form}
        setForm={setForm}
        isEditMode={!!initialData}
      />

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
      <RatingSection
        form={form}
        setForm={setForm}
      />

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

      <button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </div>
  );
}