import type {
  PageFormData,
} from "../../features/page/types/page.types";

export const validatePage =
(
  form: PageFormData
) => {

  if (
    !form.title.trim()
  ) {

    return "Title is required";

  }

  if (
    !form.slug.trim()
  ) {

    return "Slug is required";

  }

  if (
    !form.categoryId
  ) {

    return "Category is required";

  }

  return null;
};