import type { ToolFormData } from "../types/tool.types";

interface Props {
  form: ToolFormData;
  setForm: React.Dispatch<
    React.SetStateAction<ToolFormData>
  >;
}

export default function RatingSection({
  form,
  setForm,
}: Props) {
  const handleRatingValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm((prev) => ({
      ...prev,
      ratingValue: e.target.value === ""
          ? ""
          : Number(e.target.value),
    }));
  };

  const handleRatingCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
       setForm((prev) => ({
      ...prev,
      ratingCount: e.target.value === ""
          ? ""
          : Number(e.target.value),
    }));
  };

  const handleReviewCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
     setForm((prev) => ({
      ...prev,
      reviewCount: e.target.value === ""
          ? ""
          : Number(e.target.value),
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="number"
        placeholder="Rating Value (0-5)"
        min={0}
        max={5}
        step="0.1"
        value={form.ratingValue}
        onChange={handleRatingValueChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Rating Count"
        min={0}
        value={form.ratingCount}
        onChange={handleRatingCountChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Review Count"
        min={0}
        value={form.reviewCount}
        onChange={handleReviewCountChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}