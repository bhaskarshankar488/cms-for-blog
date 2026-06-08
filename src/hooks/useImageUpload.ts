import { useState } from "react";

export default function useImageUpload() {
  const [file, setFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected =
      e.target.files?.[0];

    if (!selected) return;

    setFile(selected);

    setPreview(
      URL.createObjectURL(selected)
    );
  };

  const remove = () => {
    setFile(null);
    setPreview("");
  };

  return {
    file,
    setFile,
    preview,
    setPreview,
    handleChange,
    remove,
  };
}