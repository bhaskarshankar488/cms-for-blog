interface Props {
  catImagePreview: string
  handleCatImageChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
  removeCatImage: () => void
}

export default function ImageSection({
  catImagePreview,
  handleCatImageChange,
  removeCatImage,
}: Props) {
  return (
    <div className="space-y-3">

      <label className="font-semibold">
        Category Image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleCatImageChange}
        className="w-full p-2 border rounded"
      />

      {catImagePreview && (
        <div className="relative w-40">

          <img
            src={catImagePreview}
            alt="Category Preview"
            className="w-40 h-40 object-cover border rounded"
          />

          <button
            type="button"
            onClick={removeCatImage}
            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
          >
            Remove
          </button>

        </div>
      )}

    </div>
  )
}