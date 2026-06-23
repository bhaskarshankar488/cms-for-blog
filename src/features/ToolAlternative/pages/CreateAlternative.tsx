import { useState } from "react";

import toast from "react-hot-toast";

import {
  useNavigate,
} from "react-router-dom";

import AlternativeForm from "../components/AlternativeForm";

import { alternativeSchema, } from "../schemas/alternative.schema";

import { initialAlternative } from "../constants/alternative.initial";

import { createAlternative, } from "../service/alternative.service";

import { scrollToError } from "../utils/scolltoerror";

const CreateAlternative = () => {

  const navigate =
    useNavigate();

  const handleSubmit =
    async () => {
      const result =
        alternativeSchema.safeParse(
          formData
        );

      if (!result.success) {
        const validationErrors:
          Record<string, string> =
          {};

        result.error.issues.forEach(
          (issue) => {
            const field =
              issue.path[0];

            if (
              typeof field ===
              "string"
            ) {
              validationErrors[
                field
              ] =
                issue.message;
            }
          }
        );

        setErrors(
          validationErrors
        );

        scrollToError(
          validationErrors
        );

        console.log(
          validationErrors
        );
        return;
      }

      setErrors({});

      const payload = {
        toolId:
          formData.toolId,

        title:
          formData.title,

        slug:
          formData.slug,

        pageDescription:
          formData.pageDescription,

        seo:
          formData.seo,

        faq:
          formData.faq.map(
            (item) => ({
              question:
                item.question,

              answer:
                item.answer,
            })
          ),

        content:
          formData.content,

        status:
          formData.status,

        tools:
          formData.tools.map(
            (
              tool,
              index
            ) => ({
              toolId:
                tool.toolId,

              customDescription:
                tool.customDescription,

              position:
                index + 1,
            })
          ),
      };

      try {
        const response =
          await createAlternative(
            payload
          );

        console.log(
          "SUCCESS",
          response
        );

        // later
        toast.success(
          "Alternative created successfully"
        );

        setTimeout(() => {
          navigate(
            "/AlternativeList"
          );
        }, 1000);

        // optional reset
        setFormData(
          initialAlternative
        );
      } catch (
      error
      ) {
        console.error(
          error
        );

        // later
        toast.error(
          "Failed to create alternative"
        );
      }
    };

  const [
    formData,
    setFormData,
  ] = useState(
    initialAlternative
  );

  const [
    errors,
    setErrors,
  ] = useState<
    Record<string, string>
  >({});

  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-2xl font-bold">
        Create Alternative
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

export default CreateAlternative;