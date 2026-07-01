
import type { ToolFormData }
from "../types/tool.types";

export function buildToolFormData(
  form: ToolFormData,
  toolImage: File | null,
  heroImage: File | null,
  faqImage: File | null
): FormData {

  const formData = new FormData();

  formData.append(
    "name",
    form.name
  );

  formData.append(
    "slug",
    form.slug
  );

  formData.append(
    "ProductDescription",
    form.ProductDescription
  );
  formData.append(
    "globalDescription",
    form.globalDescription
  );

    formData.append(
    "pricingLabel",
    form.pricingLabel
  );

   formData.append(
    "whatIsIt",
    form.whatIsIt
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

formData.append(
  "seo",
  JSON.stringify(form.seo)
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

if (toolImage) {
  formData.append(
    "tool_image",
    toolImage
  );
}

if (heroImage) {
  formData.append(
    "hero_image",
    heroImage
  );
}

if (faqImage) {
  formData.append(
    "faq_image",
    faqImage
  );
}

  return formData;
}