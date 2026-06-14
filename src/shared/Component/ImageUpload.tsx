import { useEffect, useState } from "react";

interface ImageUploadProps {
  label: string;
  initialPreview?: string;
  onFileChange: (
    file: File | null
  ) => void;
}

export default function ImageUpload({
  label,
  initialPreview = "",
  onFileChange,
}: ImageUploadProps) {
  const [preview, setPreview] =
    useState(initialPreview);

  useEffect(() => {
    setPreview(initialPreview);
  }, [initialPreview]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected =
      e.target.files?.[0];

    if (!selected) return;

    const imageUrl =
      URL.createObjectURL(selected);

    setPreview(imageUrl);

    onFileChange(selected);
  };

  const handleRemove = () => {
    setPreview("");

    onFileChange(null);
  };

  return (
    <div className="space-y-3">
      <label className="font-medium">
        {label}
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {preview && (
        <div className="relative w-40">
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover border rounded"
          />

          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}