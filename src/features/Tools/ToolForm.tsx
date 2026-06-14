import { useEffect, useState } from "react";

import { validateToolForm } from "./hooks/tool.validation"
import type { ToolFormData } from "./types/tool.types";

import { buildToolFormData } from "./utils/buildToolFormData"

import BasicInfoSection from "./components/BasicInfoSection";
import RatingSection from "./components/RatingSection";
import TagsSection from "./components/TagsSection";
import CategorySection from "../../shared/Component/CategorySection";
import ImageUpload from "../../shared/Component/ImageUpload";

import { useCategories } from "../../shared/hook/useCategories";
import { useToolForm } from "./hooks/useToolForm"

import { TOOL_TAGS }from "./constants/tool.constants";

interface Props {
  onSubmit: (
    formData: FormData
  ) => Promise<void> | void;

  initialData?: ToolFormData;
}


export default function ToolForm({
  onSubmit,
  initialData,
}: Props) {

  const { form, setForm, logo, setLogo, } = useToolForm();

  useEffect(() => {
    if (!initialData) return;

    setForm(initialData);
  }, [initialData, setForm]);

  const [loading, setLoading] =
  useState(false);

  const { categories } = useCategories();

  const handleSubmit = async () => {
  const error =
    validateToolForm(form);

  if (error) {
    alert(error);
    return;
  }

  try {
    setLoading(true);

    const formData =
      buildToolFormData(
        form,
        logo
      );

    await onSubmit(formData);

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
        label="Tool Logo"
        onFileChange={setLogo}
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