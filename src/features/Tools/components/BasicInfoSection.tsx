import { useState } from "react";

import { generateSlug } from "../../../shared/utils/slug";
import type { ToolFormData } from "../types/tool.types";
import {PRICING_OPTIONS,} from "../constants/pricing";

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
  const handlenameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.value;

    setForm((prev) => ({
      ...prev,
      name,

      ...(isEditMode || slugTouched
        ? {}
        : {
          slug: generateSlug(name),
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

  const handleglobalDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      globalDescription: e.target.value,
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

  const handlePricingChange = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  setForm((prev) => ({
    ...prev,
    pricingLabel: e.target.value,
  }));
};

const handleWhatIsItChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>
) => {
  setForm((prev) => ({
    ...prev,
    whatIsIt: e.target.value,
  }));
};

  return (
    <div className="space-y-4">
      <input
        placeholder="Tool Title"
        className="w-full p-3 border rounded"
        value={form.name}
        onChange={handlenameChange}
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
        value={form.globalDescription}
        onChange={handleglobalDescriptionChange}
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

      <select
  className="w-full p-3 border rounded"
  value={form.pricingLabel}
  onChange={handlePricingChange}
>
  <option value="">
    Select Pricing Model
  </option>

  {PRICING_OPTIONS.map((option) => (
    <option
      key={option}
      value={option}
    >
      {option}
    </option>
  ))}
</select>

<textarea
  placeholder="What is this tool?"
  className="w-full p-3 border rounded"
  rows={5}
  value={form.whatIsIt}
  onChange={handleWhatIsItChange}
/>
    </div>
  );
}