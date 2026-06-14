import { useState } from "react";

import { generateSlug } from "../../../shared/utils/slug";
import type { ToolFormData } from "../types/tool.types";

interface Props {
  form: ToolFormData;
  setForm: React.Dispatch<
    React.SetStateAction<ToolFormData>
  >;
  isEditMode?: boolean;
}

export default function BasicInfoSection({
  form,
  setForm,
  isEditMode = false,
}: Props) {

  const [slugTouched, setSlugTouched] =
    useState(false);
  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const title = e.target.value;

    setForm((prev) => ({
      ...prev,
      title,

      ...(isEditMode || slugTouched
        ? {}
        : {
          slug: generateSlug(title),
        }),
    }));
  };

  const handleSlugChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSlugTouched(true);

    setForm((prev) => ({
      ...prev,
      slug: generateSlug(
        e.target.value
      ),
    }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleBrandChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      brand: e.target.value,
    }));
  };

  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      link: e.target.value,
    }));
  };

  return (
    <div className="space-y-4">
      <input
        placeholder="Tool Title"
        className="w-full p-3 border rounded"
        value={form.title}
        onChange={handleTitleChange}
      />

      <input
        placeholder="Tool Slug"
        className="w-full p-3 border rounded"
        value={form.slug}
        onChange={handleSlugChange}
      />

      <input
        placeholder="Tool Description"
        className="w-full p-3 border rounded"
        value={form.description}
        onChange={handleDescriptionChange}
      />

      <input
        placeholder="Brand"
        className="w-full p-3 border rounded"
        value={form.brand}
        onChange={handleBrandChange}
      />

      <input
        type="url"
        placeholder="Tool Website URL"
        className="w-full p-3 border rounded"
        value={form.link}
        onChange={handleLinkChange}
      />
    </div>
  );
}