import { useState } from "react";

import AlternativeForm from "../components/AlternativeForm";

import { initialAlternative }
  from "../constants/alternative.initial";

const EditAlternative = () => {
  const [
    formData,
    setFormData,
  ] = useState(
    initialAlternative
  );

  const [
    errors,
  ] = useState<
    Record<string, string>
  >({});

  const handleSubmit =
    async () => {
      console.log(
        "UPDATE",
        formData
      );
    };

  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-2xl font-bold">
        Edit Alternative
      </h1>

      <AlternativeForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditAlternative;