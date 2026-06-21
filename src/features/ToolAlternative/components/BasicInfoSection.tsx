import { useEffect, useState } from "react";

import type {
  AlternativeFormData,
} from "../types/alternative.types";

import { generateSlug }
from "../../../shared/utils/slug";

interface Props {
  formData: AlternativeFormData;

  setFormData: React.Dispatch<
    React.SetStateAction<
      AlternativeFormData
    >
  >;

  errors: Record<string, string>;
}

const BasicInfoSection = ({
  formData,
  setFormData,
  errors,
}: Props) => {
  const isEditMode =
    Boolean(formData._id);

  const [
    slugTouched,
    setSlugTouched,
  ] = useState(false);

  useEffect(() => {
    if (
      !isEditMode &&
      !slugTouched
    ) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(
          prev.title
        ),
      }));
    }
  }, [
    formData.title,
    isEditMode,
    slugTouched,
    setFormData,
  ]);

  return (
    <div className="space-y-6 rounded-lg border p-6">
      <h2 className="text-xl font-semibold">
        Basic Information
      </h2>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData(
              (prev) => ({
                ...prev,
                title:
                  e.target.value,
              })
            )
          }
          className="w-full rounded-md border p-3"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {errors.title}
          </p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label
          htmlFor="slug"
          className="mb-2 block text-sm font-medium"
        >
          Slug
        </label>

        <input
          id="slug"
          type="text"
          value={formData.slug}
          onChange={(e) => {
            setSlugTouched(
              true
            );

            setFormData(
              (prev) => ({
                ...prev,
                slug:
                  generateSlug(
                    e.target.value
                  ),
              })
            );
          }}
          className="w-full rounded-md border p-3"
        />

        {errors.slug && (
          <p className="mt-1 text-sm text-red-500">
            {errors.slug}
          </p>
        )}
      </div>

      {/* Page Description */}
      <div>
        <label
          htmlFor="pageDescription"
          className="mb-2 block text-sm font-medium"
        >
          Page Description
        </label>

        <textarea
          id="pageDescription"
          rows={4}
          value={
            formData.pageDescription
          }
          onChange={(e) =>
            setFormData(
              (prev) => ({
                ...prev,
                pageDescription:
                  e.target.value,
              })
            )
          }
          className="w-full rounded-md border p-3"
        />
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="mb-2 block text-sm font-medium"
        >
          Status
        </label>

        <select
          id="status"
          value={formData.status}
          onChange={(e) =>
            setFormData(
              (prev) => ({
                ...prev,
                status:
                  e.target
                    .value as
                    | "active"
                    | "inactive",
              })
            )
          }
          className="w-full rounded-md border p-3"
        >
          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </select>
      </div>
    </div>
  );
};

export default BasicInfoSection;