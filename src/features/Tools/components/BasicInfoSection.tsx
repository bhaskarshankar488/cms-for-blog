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

      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Description
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            These descriptions are used in different parts of the website.
          </p>
        </div>

        {/* Global Description */}
        <div className="rounded-lg border border-gray-200 p-4">
          <label className="block text-sm font-medium text-gray-900">
            Global Description
          </label>
          <p className="text-xs text-gray-500 mt-1 mb-3">
            Used for AI Tools Directory listings, search results, and overview pages.
          </p>

          <textarea
            rows={6}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            value={form.globalDescription}
            onChange={handleglobalDescriptionChange}
          />
        </div>

        {/* Hero Description */}
        <div className="rounded-lg border border-gray-200 p-4">
          <label className="block text-sm font-medium text-gray-900">
            Hero Description
          </label>
          <p className="text-xs text-gray-500 mt-1 mb-3">
            Displayed in the hero section of the tool details page.
          </p>

          <textarea
            rows={6}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            value={form.whatIsIt}
            onChange={handleWhatIsItChange}
          />
        </div>

        {/* Product Description */}
        <div className="rounded-lg border border-gray-200 p-4">
          <label className="block text-sm font-medium text-gray-900">
            Product Description
          </label>
          <p className="text-xs text-gray-500 mt-1 mb-3">
            Used in AI-generated content and product information sections.
          </p>

          <textarea
            rows={6}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            value={form.ProductDescription}
            onChange={handleProductDescriptioneChange}
          />
        </div>
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
    </div>
  );
}