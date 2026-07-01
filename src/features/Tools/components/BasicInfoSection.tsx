import { useState } from "react";

import { generateSlug } from "../../../shared/utils/slug";
import type { ToolFormData } from "../types/tool.types";
import { PRICING_OPTIONS, } from "../constants/pricing";

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
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      globalDescription: e.target.value,
    }));
  };
  const handleProductDescriptioneChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      ProductDescription: e.target.value,
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
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tool Title
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
          placeholder="Enter tool title"
          value={form.name}
          onChange={handlenameChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tool Slug
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
          placeholder="tool-slug"
          value={form.slug}
          onChange={handleSlugChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
         GlobalDescription Description for AI tools Directory
        </label>
        <textarea
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
          placeholder="Short description"
          value={form.globalDescription}
          onChange={handleglobalDescriptionChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
         Product Description for AI tools content
        </label>
        <textarea
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
          placeholder="Short description"
          value={form.ProductDescription}
          onChange={handleProductDescriptioneChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brand
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
          placeholder="Brand name"
          value={form.brand}
          onChange={handleBrandChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website URL
        </label>
        <input
          type="url"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
          placeholder="https://example.com"
          value={form.link}
          onChange={handleLinkChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pricing Model
        </label>
        <select
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
          value={form.pricingLabel}
          onChange={handlePricingChange}
        >
          <option value="">Select Pricing Model</option>
          {PRICING_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What is this Tool means for tool content in hero section 
        </label>
        <textarea
          rows={5}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
          placeholder="Describe the tool..."
          value={form.whatIsIt}
          onChange={handleWhatIsItChange}
        />
      </div>
    </div>
  );
}