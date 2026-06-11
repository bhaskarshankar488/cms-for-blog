import { useState } from "react";

interface Props {
  form: any;
  setForm: React.Dispatch<
    React.SetStateAction<any>
  >;
}

export default function useImageManager({
  form,
  setForm,
}: Props) {
  const [catImageFile, setCatImageFile] =
    useState<File | null>(null);

  const [catImagePreview, setCatImagePreview] =
    useState("");

  const handleCatImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setCatImageFile(file);

    setCatImagePreview(
      URL.createObjectURL(file)
    );
  };

  const removeCatImage = () => {
    setCatImageFile(null);

    setCatImagePreview("");

    setForm({
      ...form,
      catImage: {
        url: "",
        public_id: "",
      },
    });
  };

  return {
    catImageFile,
    catImagePreview,
    setCatImagePreview,

    handleCatImageChange,
    removeCatImage,
  };
}