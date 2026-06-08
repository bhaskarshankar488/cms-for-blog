interface ImageUploadProps {
  label: string;
  preview: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onRemove: () => void;
}

export default function ImageUpload({
  label,
  preview,
  onChange,
  onRemove,
}: ImageUploadProps) {
  return (
    <div className="space-y-3">
      <label className="font-semibold">
        {label}
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={onChange}
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
            onClick={onRemove}
            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}