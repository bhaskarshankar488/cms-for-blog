import { useState } from "react";

import type { ToolFormData } from "../types/tool.types";
import { DEFAULT_TOOL_FORM } from "../types/toolFormDefaults";

export function useToolForm() {
  const [form, setForm] =
    useState<ToolFormData>(
      DEFAULT_TOOL_FORM
    );

  const [logo, setLogo] =
    useState<File | null>(null);

  return {
    form,
    setForm,

    logo,
    setLogo,
  };
}