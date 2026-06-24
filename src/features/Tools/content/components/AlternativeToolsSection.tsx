import { useState } from "react";
import ToolSelector from "../../../../shared/Component/ToolSelector";

interface ToolOption {
    id: string;
    name: string;
    slug: string;
    brand: string;
    image: string;
}

interface AlternativeTool {
    alternativeId: string;
    position: number;
    isSponsored: boolean;
}

interface Props {
    value: AlternativeTool[];
    initialTools?: ToolOption[];
    onChange: (
        value: AlternativeTool[]
    ) => void;
}

export default function AlternativeToolsSection({
    value,
    initialTools = [],
    onChange,
}: Props) {
    const [tools, setTools] =
        useState<ToolOption[]>(initialTools);

    const handleAddTool = (
        tool: ToolOption
    ) => {
        const exists = value.some(
            (item) =>
                item.alternativeId === tool.id
        );

        console.log("SELECTED TOOL", tool);

        if (exists) return;

        setTools((prev) => [
            ...prev,
            tool,
        ]);

        onChange([
            ...value,
            {
                alternativeId: tool.id,
                position: value.length + 1,
                isSponsored: false,
            },
        ]);
    };

    const handleRemove = (
        toolId: string
    ) => {
        setTools((prev) =>
            prev.filter(
                (tool) =>
                    tool.id !== toolId
            )
        );

        const updated = value
            .filter(
                (item) =>
                    item.alternativeId !== toolId
            )
            .map((item, index) => ({
                ...item,
                position: index + 1,
            }));

        onChange(updated);
    };

    const toggleSponsored = (
        toolId: string
    ) => {
        onChange(
            value.map((item) =>
                item.alternativeId === toolId
                    ? {
                        ...item,
                        isSponsored:
                            !item.isSponsored,
                    }
                    : item
            )
        );
    };

    return (
        <div className="space-y-6">
            <ToolSelector
                onSelect={handleAddTool}
                label="Alternative Tools"
                placeholder="Search alternative tools..."
            />

            {tools.length > 0 && (
                <div className="space-y-3">
                    {tools.map((tool) => {
                        const selected =
                            value.find(
                                (item) =>
                                    item.alternativeId ===
                                    tool.id
                            );

                        if (!selected)
                            return null;

                        return (
                            <div
                                key={tool.id}
                                className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                                        #
                                        {
                                            selected.position
                                        }
                                    </div>

                                    <img
                                        src={
                                            tool.image
                                        }
                                        alt={
                                            tool.name
                                        }
                                        className="h-12 w-12 rounded-lg object-cover"
                                    />

                                    <div>
                                        <h4 className="font-medium">
                                            {
                                                tool.name
                                            }
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            {
                                                tool.brand
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleSponsored(
                                                tool.id
                                            )
                                        }
                                        className={
                                            selected?.isSponsored
                                                ? "rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700"
                                                : "rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600"
                                        }
                                    >
                                        {selected.isSponsored
                                            ? "Sponsored"
                                            : "Organic"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemove(
                                                tool.id
                                            )
                                        }
                                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}