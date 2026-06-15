import { useState } from "react";

import type { ToolFormData } from "../types/tool.types";
import { DEFAULT_TOOL_FORM } from "../types/toolFormDefaults";

export function useToolForm() {
  const [form, setForm] =
    useState<ToolFormData>(
      DEFAULT_TOOL_FORM
    );

  const [toolImage, setToolImage] = useState<File | null>(null);
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [faqImage, setFaqImage] = useState<File | null>(null);

    
  return {
     form,
  setForm,

  toolImage,
  setToolImage,

  heroImage,
  setHeroImage,

  faqImage,
  setFaqImage,
  };
}