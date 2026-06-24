import {
    useEffect,
    useRef,
    useState,
} from "react";

import type { ToolMultiSelectProps, ToolOption, } from "../types/tool.types";

import { searchTools } from "../services/tool.service";



export default function ToolMultiSelect({
    onChange,
    initialSelectedTools = [],
    label = "Tools",
    placeholder = "Search tools...",
}: ToolMultiSelectProps) {
    const [query, setQuery] = useState("");

    const [results, setResults] = useState<
        ToolOption[]
    >([]);

    const [loading, setLoading] =
        useState(false);

    const [open, setOpen] = useState(false);

    const [selectedTools, setSelectedTools] =
        useState<ToolOption[]>(
            initialSelectedTools
        );

    const wrapperRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedTools(
            initialSelectedTools
        );
    }, [initialSelectedTools]);

    useEffect(() => {
        const timer = setTimeout(
            async () => {
                if (!query.trim()) {
                    setResults([]);
                    return;
                }

                try {
                    setLoading(true);

                    const tools =
                        await searchTools(
                            query
                        );

                    setResults(tools);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            },
            400
        );

        return () =>
            clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent
        ) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(
                    event.target as Node
                )
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const handleSelect = (
        tool: ToolOption
    ) => {
        const exists =
            selectedTools.some(
                (item) =>
                    item.id === tool.id
            );

        if (exists) return;

        const updated = [
            ...selectedTools,
            tool,
        ];

        setSelectedTools(updated);

        onChange(
            updated.map(
                (item) => item.id
            )
        );

        setQuery("");
        setResults([]);
        setOpen(false);
    };

    const handleRemove = (
        id: string
    ) => {
        const updated =
            selectedTools.filter(
                (item) =>
                    item.id !== id
            );

        setSelectedTools(updated);

        onChange(
            updated.map(
                (item) => item.id
            )
        );
    };

    return (
        <div
            ref={wrapperRef}
            className="space-y-3"
        >
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="relative">
                <input
                    type="text"
                    value={query}
                    placeholder={
                        placeholder
                    }
                    onFocus={() =>
                        setOpen(true)
                    }
                    onChange={(e) => {
                        setQuery(
                            e.target.value
                        );
                        setOpen(true);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />

                {open && (
                    <div className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
                        {loading && (
                            <div className="p-4 text-sm text-gray-500">
                                Searching...
                            </div>
                        )}

                        {!loading &&
                            results.length ===
                            0 &&
                            query && (
                                <div className="p-4 text-sm text-gray-500">
                                    No tools found
                                </div>
                            )}

                        {!loading &&
                            results.map(
                                (tool) => (
                                    <button
                                        key={
                                            tool.id
                                        }
                                        type="button"
                                        onClick={() =>
                                            handleSelect(
                                                tool
                                            )
                                        }
                                        className="flex w-full items-center gap-3 border-b p-3 text-left hover:bg-gray-50"
                                    >
                                        <img
                                            src={
                                                tool.image
                                            }
                                            alt={
                                                tool.name
                                            }
                                            className="h-10 w-10 rounded object-cover"
                                        />

                                        <div>
                                            <p className="font-medium">
                                                {
                                                    tool.name
                                                }
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {
                                                    tool.brand
                                                }
                                            </p>
                                        </div>
                                    </button>
                                )
                            )}
                    </div>
                )}
            </div>

            {selectedTools.length >
                0 && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                            Selected Tools
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {selectedTools.map(
                                (tool) => (
                                    <div
                                        key={
                                            tool.id
                                        }
                                        className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm"
                                    >
                                        <img
                                            src={
                                                tool.image
                                            }
                                            alt={
                                                tool.name
                                            }
                                            className="h-8 w-8 rounded"
                                        />

                                        <span className="text-sm font-medium">
                                            {
                                                tool.name
                                            }
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemove(
                                                    tool.id
                                                )
                                            }
                                            className="ml-1 text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
        </div>
    );
}