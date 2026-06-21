import {
  useSortable,
} from "@dnd-kit/sortable";

import { CSS }
from "@dnd-kit/utilities";

interface Props {
  tool: any;
  index: number;

  onDescriptionChange: (
    index: number,
    value: string
  ) => void;

  onRemove: (
    index: number
  ) => void;
}

const SortableToolCard = ({
  tool,
  index,
  onDescriptionChange,
  onRemove,
}: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: tool.toolId,
  });

  const style = {
    transform:
      CSS.Transform.toString(
        transform
      ),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg border bg-gray-50 p-4"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="cursor-grab text-gray-500"
          >
            ☰
          </button>

          <div>
            <h3 className="text-lg font-semibold">
              {tool.toolName}
            </h3>

            <p className="text-sm text-gray-500">
              {tool.brand}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onRemove(index)
          }
          className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-600"
        >
          Remove
        </button>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Custom Description
        </label>

        <textarea
          rows={3}
          value={
            tool.customDescription
          }
          onChange={(e) =>
            onDescriptionChange(
              index,
              e.target.value
            )
          }
          className="w-full rounded-md border px-3 py-2"
        />
      </div>
    </div>
  );
};

export default
  SortableToolCard;