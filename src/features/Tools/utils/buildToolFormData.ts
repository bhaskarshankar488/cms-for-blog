import type { ToolFormData }
from "../types/tool.types";

export function buildToolFormData(
  form: ToolFormData,
  logo: File | null
): FormData {

  const formData = new FormData();

  formData.append(
    "name",
    form.title
  );

  formData.append(
    "slug",
    form.slug
  );

  formData.append(
    "globalDescription",
    form.description
  );

  formData.append(
    "brand",
    form.brand
  );

  formData.append(
    "link",
    form.link
  );

  formData.append(
    "categoryId",
    form.categoryId
  );

  if (form.ratingValue !== "") {
    formData.append(
      "ratingValue",
      String(form.ratingValue)
    );
  }

  if (form.ratingCount !== "") {
    formData.append(
      "ratingCount",
      String(form.ratingCount)
    );
  }

  if (form.reviewCount !== "") {
    formData.append(
      "reviewCount",
      String(form.reviewCount)
    );
  }

  form.tags.forEach((tag) => {
    formData.append("tags", tag);
  });

  if (logo) {
    formData.append(
      "image",
      logo
    );
  }

  return formData;
}