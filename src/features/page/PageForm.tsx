import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import toast from "react-hot-toast";

import BasicInfoSection from "../../features/page/components/BasicInfoSection"
import CategorySection from "../../features/page/components/CategorySection"
import SeoSection from "../../features/page/components/SeoSection"
import ImageSection from "../../features/page/components/ImageSection"
import ContentSection from "../../features/page/components/ContentSection"
import ActionButtons from "../../features/page/components/ActionButtons"
import FAQSection from "../../features/page/components/FAQSection"
import ToolSection from "../../features/page/components/ToolSection"

import usePageData from "../../features/page/hooks/usePageData"
import { useFaqManager } from "../../features/page/hooks/useFaqManager"
import { useToolManager } from "../../features/page/hooks/useToolManager"
import useImageManager from "../../features/page/hooks/useImageManager"

import { buildPageFormData } from "../../features/page/services/pageFormData.service";

import { createPage, updatePage } from "../../features/page/services/page.service";
import { usePageForm } from "../../features/page/hooks/usePageForm";

import { generateSlug, } from "../../shared/utils/slug";
import { validatePage, } from "../../shared/validations/page.validation";

interface PageFormProps {
  mode?: "create" | "edit";
}

export default function PageForm({
  mode = "create",
}: PageFormProps) {

  const { id } = useParams()

  const isEdit = mode === "edit"

  const navigate = useNavigate()

  // 🔥 MAIN FORM
  const {
    form,
    setForm,

    content,
    setContent,

    toolSearch,
    setToolSearch,

    toolResults,
    setToolResults,

    slugTouched,
    setSlugTouched,
  } = usePageForm();

  // =========================
  // 🔹 FETCH PAGE  ETCH CATEGORIES
  // =========================

  const {
    categories,
    fetchCategories,
    fetchPage,
  } = usePageData();

  // =========================
  // 🔹 INIT
  // =========================
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {

    if (
      isEdit &&
      id
    ) {

      fetchPage(
        id,
        setForm,
        setContent,
        setCatImagePreview
      );

    }

  }, [id]);

  // =========================
  // 🔹 AUTO SLUG GENERATE
  // =========================
  useEffect(() => {

    // ❌ Don't overwrite manually edited slug
    if (slugTouched) return

    // ❌ Don't overwrite existing edit slug
    if (isEdit && form.slug) return

    // ❌ Empty title
    if (!form.title) {

      setForm((prev) => ({
        ...prev,
        slug: "",
      }))

      return
    }

    // ✅ Generate slug
    const generatedSlug = generateSlug(form.title);

    setForm((prev) => ({
      ...prev,
      slug: generatedSlug,
    }))

  }, [form.title, slugTouched, isEdit,])

  const {
    catImageFile,
    catImagePreview,
    setCatImagePreview,
    handleCatImageChange,
    removeCatImage,
  } = useImageManager({
    form,
    setForm,
  });


  // =========================
  // 🔹 TOOL SEARCH
  // =========================
  const {
    searchTools,
    addTool,
    removeTool,
  } = useToolManager(
    form,
    setForm,
    setToolResults,
    setToolSearch
  )

  // =========================
  // 🔹 FAQ
  // =========================
  const {
    addFaq,
    removeFaq,
    updateFaq,
  } = useFaqManager(
    form,
    setForm
  )
  // =========================
  // 🔹 SUBMIT
  // =========================
  const handleSubmit =
    async (
      status = "draft"
    ) => {

      try {

        const validStatus = [
          "draft",
          "published",
          "unpublished",
        ];

        const finalStatus =
          validStatus.includes(
            status
          )
            ? status
            : "draft";

        const formData =
          buildPageFormData(
            form,
            content,
            finalStatus,
            catImageFile
          );

        const validationError =
          validatePage(form);

        if (validationError) {

          toast.error(
            validationError
          );

          return;
        }

        if (isEdit) {

          await updatePage(
            id!,
            formData
          );

        } else {

          await createPage(
            formData
          );

        }

        toast.success(
          isEdit
            ? "Page updated"
            : "Page created"
        );

        navigate("/pages");

      } catch (error: any) {

        console.error(error);

        toast.error(
          error?.response?.data?.message ||
          "Something went wrong"
        );

      }
    };

  // =========================
  // 🔹 UI
  // =========================
  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6">

      {/* TITLE */}
      <h1 className="text-xl sm:text-2xl font-bold">
        {isEdit ? "Edit Page" : "Create Page"}
      </h1>

      <BasicInfoSection
        form={form}
        setForm={setForm}
        setSlugTouched={setSlugTouched}
      />
      <ImageSection
        catImagePreview={catImagePreview}
        handleCatImageChange={handleCatImageChange}
        removeCatImage={removeCatImage}
      />

      {/* CATEGORY */}
      <CategorySection
        form={form}
        setForm={setForm}
        categories={categories}
      />

      {/* META TITLE */}
      <SeoSection
        form={form}
        setForm={setForm}
      />

      {/* TOOLS */}
      <ToolSection
        toolSearch={toolSearch}
        setToolSearch={setToolSearch}
        searchTools={searchTools}
        toolResults={toolResults}
        addTool={addTool}
        tools={form.tools}
        removeTool={removeTool}
        form={form}
        setForm={setForm}
      />

      {/* FAQ */}
      <FAQSection
        faq={form.faq}
        addFaq={addFaq}
        removeFaq={removeFaq}
        updateFaq={updateFaq}
      />

      {/* CONTENT */}
      <ContentSection
        content={content}
        setContent={setContent}
      />

      {/* ACTION BUTTONS */}
      <ActionButtons
        handleSubmit={handleSubmit}
      />
    </div>
  )
}