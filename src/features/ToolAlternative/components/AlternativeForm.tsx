import BasicInfoSection from "./BasicInfoSection";
import SeoSection from "./SeoSection";
import AlternativeToolsSection from "./AlternativeToolsSection";
import FaqSection from "./FaqSection";
import ContentSection from "./ContentSection";
import MainToolSection
  from "./MainToolSection";

import type {
  AlternativeFormData,
} from "../types/alternative.types";

interface AlternativeFormProps {
  formData: AlternativeFormData;

  setFormData: React.Dispatch<
    React.SetStateAction<
      AlternativeFormData
    >
  >;

  errors: Record<string, string>;

  onSubmit: () => void;
}

const AlternativeForm = ({
  formData,
  setFormData,
  errors,
  onSubmit,
}: AlternativeFormProps) => {
  return (
    <div className="space-y-8">
      <BasicInfoSection
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      <MainToolSection
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      <SeoSection
        formData={formData}
        setFormData={setFormData}
      />

      <AlternativeToolsSection
        formData={formData}
        setFormData={setFormData}
      />

      <FaqSection
        formData={formData}
        setFormData={setFormData}
      />

      <ContentSection
        content={formData.content}
        setContent={(value) =>
          setFormData((prev) => ({
            ...prev,
            content: value,
          }))
        }
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-md bg-blue-600 px-6 py-2 text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AlternativeForm;