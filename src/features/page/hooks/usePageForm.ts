import { useState } from "react";

import type {PageFormData,} from "../types/page.types";

import {initialPageForm,} from "../constants/page.initial";

export function usePageForm() {

  const [form, setForm] =
    useState<PageFormData>(
      initialPageForm
    );

  const [content, setContent] =
    useState("");

  const [toolSearch, setToolSearch] =
    useState("");

  const [toolResults, setToolResults] =
    useState([]);

  const [catImageFile,
    setCatImageFile] =
      useState<File | null>(null);

  const [catImagePreview,
    setCatImagePreview] =
      useState("");

  const [slugTouched,
    setSlugTouched] =
      useState(false);

  return {
    form,
    setForm,

    content,
    setContent,

    toolSearch,
    setToolSearch,

    toolResults,
    setToolResults,

    catImageFile,
    setCatImageFile,

    catImagePreview,
    setCatImagePreview,

    slugTouched,
    setSlugTouched,
  };
}