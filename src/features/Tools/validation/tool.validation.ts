import type { ToolFormData } from "../types/tool.types";

export function validateToolForm(
  form: ToolFormData
): string | null {
  
  if (!form.name.trim()) {
    return "Title is required";
  }
    if (!form.globalDescription.trim()) {
    return " globalDescription is required";
  }

  if (!form.brand.trim()) {
    return "Brand is required";
  }

  if (!form.link.trim()) {
    return "Website URL is required";
  }

  if (!form.categoryId) {
    return "Category is required";
  }

  if (form.tags.length === 0) {
    return "Please select at least one tag";
  }

  if (form.tags.length > 3) {
    return "Maximum 3 tags allowed";
  }

  if (form.ratingValue !== "" &&Number(form.ratingValue) > 5
  ) {
    return "Rating must be between 0 and 5";
  }

  return null;
}