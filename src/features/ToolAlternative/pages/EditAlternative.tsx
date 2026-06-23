import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AlternativeForm
  from "../components/AlternativeForm";

import {
  alternativeSchema,
} from "../schemas/alternative.schema";

import {
  initialAlternative,
} from "../constants/alternative.initial";

import {
  getAlternative,
  updateAlternative,
} from "../service/alternative.service";

import {
  mapAlternativeForEdit,
} from "../utils/mapAlternativeForEdit";

import { scrollToError } from "../utils/scolltoerror";

const EditAlternative = () => {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

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

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    const fetchAlternative =
      async () => {
        try {
          const data =
            await getAlternative(
              id!
            );

          setFormData(
            mapAlternativeForEdit(
              data.data
            )
          );
        } catch (
        error
        ) {
          console.error(
            error
          );
        } finally {
          setLoading(false);
        }
      };

    if (id) {
      fetchAlternative();
    }
  }, [id]);

  const handleSubmit =
    async () => {
      const result =
        alternativeSchema.safeParse(
          formData
        );

      if (
        !result.success
      ) {
        const validationErrors:
          Record<
            string,
            string
          > = {};

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

        scrollToError(validationErrors);

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

        await updateAlternative(
          id!,
          payload
        );
        toast.success(
          "Alternative updated successfully"
        );
        setTimeout(() => {
          navigate(
            "/AlternativeList"
          );
        }, 1000);
      } catch (
      error: any
      ) {
        toast.error(
          error.response?.data
            ?.message ||
          "Failed to update alternative"
        );
      }
    };

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

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