import { useEffect, useState } from "react";

import {
    searchAlternatives,
} from "../service/toolContent.service";

import type {
    AlternativeTool,
    AlternativeOption,
} from "../types/toolContent.types";

interface Props {
    value: AlternativeTool[];

    onChange: (
        value: AlternativeTool[]
    ) => void;
}

export default function AlternativeToolsSection({
    value,
    onChange,
}: Props) {
    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [results, setResults] =
        useState<AlternativeOption[]>(
            []
        );

    useEffect(() => {
        if (
            search.trim().length < 2
        ) {
            setResults([]);
            return;
        }

        const timer =
            setTimeout(async () => {
                try {
                    setLoading(true);

                    const response =
                        await searchAlternatives(
                            search
                        );

                    setResults(
                        response.data.data || []
                    );
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }, 300);

        return () =>
            clearTimeout(timer);
    }, [search]);

    const getTitle = (
        item: AlternativeTool
    ) => {

        if (
            typeof item.alternativeId ===
            "string"
        ) {
            return item.alternativeId;
        }

        return item.alternativeId.title;
    };

    const getImage = (
        item: AlternativeTool
    ) => {

        if (
            typeof item.alternativeId ===
            "string"
        ) {
            return "";
        }

        return (
            item.alternativeId
                ?.toolId
                ?.images
                ?.tool
                ?.url || ""
        );
    };

    const addAlternative = (
        item: AlternativeOption
    ) => {
        const exists = value.some(
            (alt) =>
                alt.alternativeId ===
                item._id
        );

        if (exists) return;

        onChange([
            ...value,
            {
                alternativeId:
                    item._id,

                isSponsored: false,

                // internal only
                position:
                    value.length + 1,
            },
        ]);

        setSearch("");
        setResults([]);
    };

    const removeAlternative = (
        index: number
    ) => {
        const updated =
            value.filter(
                (_, i) =>
                    i !== index
            );

        // re-order internally
        const reordered =
            updated.map(
                (item, idx) => ({
                    ...item,
                    position:
                        idx + 1,
                })
            );

        onChange(reordered);
    };

    const toggleSponsored = (
        index: number
    ) => {
        const updated =
            [...value];

        updated[index] = {
            ...updated[index],
            isSponsored:
                !updated[index]
                    .isSponsored,
        };

        onChange(updated);
    };

    return (
        <div className="space-y-4 border rounded-lg p-4">
            <div>
                <h3 className="text-lg font-semibold">
                    Alternative Tools
                </h3>

                <p className="text-sm text-gray-500">
                    Search and attach
                    alternative pages.
                </p>
            </div>

            <input
                type="text"
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
                placeholder="Search alternatives..."
                className="w-full border rounded px-3 py-2"
            />

            {loading && (
                <p className="text-sm">
                    Searching...
                </p>
            )}

            {results.length > 0 && (
                <div className="border rounded-md overflow-hidden">
                    {results.map(
                        (item) => (
                            <button
                                key={item._id}
                                type="button"
                                onClick={() =>
                                    addAlternative(
                                        item
                                    )
                                }
                                className="w-full text-left px-3 py-3 hover:bg-gray-50 border-b last:border-b-0"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-10 h-10 rounded object-cover border"
                                    />

                                    <span>
                                        {item.title}
                                    </span>
                                </div>
                            </button>
                        )
                    )}
                </div>
            )}

            <div className="space-y-3">
                {value.map(
                    (
                        item,
                        index
                    ) => (
                        <div
                            key={
                                typeof item.alternativeId ===
                                    "string"
                                    ? item.alternativeId
                                    : item.alternativeId._id
                            }
                            className="border rounded-lg p-4 bg-white shadow-sm"
                        >
                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-4">

                                    {getImage(item) ? (
                                        <img
                                            src={getImage(item)}
                                            alt={getTitle(item)}
                                            className="w-16 h-16 rounded-lg border object-cover"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-lg border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                                            No Image
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            {getTitle(item)}
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            Alternative Page
                                        </p>
                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeAlternative(
                                            index
                                        )
                                    }
                                    className="px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100"
                                >
                                    Remove
                                </button>

                            </div>

                            <div className="mt-4 border-t pt-3">

                                <label className="flex items-center gap-2 cursor-pointer">

                                    <input
                                        type="checkbox"
                                        checked={
                                            item.isSponsored
                                        }
                                        onChange={() =>
                                            toggleSponsored(
                                                index
                                            )
                                        }
                                    />

                                    <span className="text-sm font-medium">
                                        Sponsored Listing
                                    </span>

                                </label>

                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}