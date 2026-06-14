// src/shared/components/TagsSection.tsx

interface Props {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  availableTags: string[];
  maxTags?: number;
  label?: string;
}

export default function TagsSection({
  selectedTags,
  setSelectedTags,
  availableTags,
  maxTags = 3,
  label = "Select Tags",
}: Props) {
  const toggleTag = (tag: string) => {
    const selected = selectedTags.includes(tag);

    if (selected) {
      setSelectedTags(
        selectedTags.filter((t) => t !== tag)
      );
      return;
    }

    if (selectedTags.length >= maxTags) {
      return;
    }

    setSelectedTags([
      ...selectedTags,
      tag,
    ]);
  };

  return (
    <div className="space-y-3">
      <label className="font-semibold">
        {label} (max {maxTags})
      </label>

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => {
          const selected =
            selectedTags.includes(tag);

          const disabled =
            !selected &&
            selectedTags.length >= maxTags;

          return (
            <button
              key={tag}
              type="button"
              onClick={() =>
                toggleTag(tag)
              }
              disabled={disabled}
              className={`
                px-4 py-2 rounded border text-sm transition

                ${
                  selected
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300"
                }

                ${
                  disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}