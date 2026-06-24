import {
    useEffect,
    useRef,
    useState,
} from "react";

import { searchTools } from "../services/tool.service";
import type { ToolOption } from "../types/tool.types";

interface ToolSelectorProps {
    onSelect: (
        tool: ToolOption
    ) => void;

    label?: string;
    placeholder?: string;
}

export default function ToolSelector({
    onSelect,
    label = "Search Tool",
    placeholder = "Search tools...",
}: ToolSelectorProps) {
    const [query, setQuery] =
        useState("");

    const [results, setResults] =
        useState<ToolOption[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [open, setOpen] =
        useState(false);

    const wrapperRef =
        useRef<HTMLDivElement>(null);

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
        onSelect(tool);

        setQuery("");
        setResults([]);
        setOpen(false);
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
        </div>
    );
}