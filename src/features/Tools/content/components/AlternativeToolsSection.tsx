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
            {/* Section Header */}
            <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                    Alternative Tools
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Select and manage alternative tools displayed on the tool details page.
                </p>
            </div>

            {/* Search */}
            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <ToolSelector
                    onSelect={handleAddTool}
                    label="Search Tool"
                    placeholder="Search alternative tools..."
                />
            </div>

            {/* Selected Tools */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Selected Tools
                        </h3>
                        <p className="text-xs text-gray-500">
                            Manage alternative tools for this page.
                        </p>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {tools.length} Selected
                    </span>
                </div>

                {tools.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
                        <p className="text-sm font-medium text-gray-700">
                            No alternative tools selected
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            Search and select a tool above to add it here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {tools.map((tool) => {
                            const selected = value.find(
                                (item) => item.alternativeId === tool.id
                            );

                            if (!selected) return null;

                            return (
                                <div
                                    key={tool.id}
                                    className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300"
                                >
                                    <div className="flex items-center justify-between">
                                        {/* Left */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-sm font-semibold text-blue-700">
                                                #{selected.position}
                                            </div>

                                            <img
                                                src={tool.image}
                                                alt={tool.name}
                                                className="h-14 w-14 rounded-lg border object-cover"
                                            />

                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900">
                                                    {tool.name}
                                                </h4>

                                                <p className="text-sm text-gray-500">
                                                    {tool.brand}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    {tool.slug}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => toggleSponsored(tool.id)}
                                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${selected.isSponsored
                                                        ? "border border-amber-200 bg-amber-50 text-amber-700"
                                                        : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {selected.isSponsored
                                                    ? "Sponsored"
                                                    : "Organic"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleRemove(tool.id)}
                                                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}