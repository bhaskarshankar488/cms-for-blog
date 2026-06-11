export const buildPageFormData = (
  form: any,
  content: string,
  status: string,
  catImageFile: File | null
) => {

  const formData =
    new FormData();

  formData.append(
    "title",
    form.title
  );

  formData.append(
    "slug",
    form.slug
  );

  formData.append(
    "pageDescription",
    form.pageDescription
  );

  formData.append(
    "categoryDescription",
    form.categoryDescription || ""
  );

  formData.append(
    "categoryId",
    form.categoryId
  );

  formData.append(
    "meta",
    JSON.stringify(
      form.meta
    )
  );

  formData.append(
    "tools",
    JSON.stringify(
      form.tools.map(
        (t: any) => ({
          toolId:
            t.toolId,
          customDescription:
            t.customDescription,
        })
      )
    )
  );

  formData.append(
    "faq",
    JSON.stringify(
      form.faq.map(
        (f: any) => ({
          question:
            f.question,
          answer:
            f.answer,
        })
      )
    )
  );

  formData.append(
    "content",
    content
  );

  formData.append(
    "status",
    status
  );

  // NEW IMAGE
  if (catImageFile) {

    formData.append(
      "catImage",
      catImageFile
    );

  }

  // EXISTING IMAGE
  if (
    !catImageFile &&
    form.catImage?.url
  ) {

    formData.append(
      "catImage",
      JSON.stringify(
        form.catImage
      )
    );

  }

  return formData;
};