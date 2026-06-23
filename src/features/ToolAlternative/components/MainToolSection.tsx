import { useState } from "react";

import { searchToolsApi }
    from "../service/alternative.service";

import type {
    AlternativeFormData,
    ToolSearchResult,
} from "../types/alternative.types";

interface Props {
    formData: AlternativeFormData;

    setFormData: React.Dispatch<
        React.SetStateAction<
            AlternativeFormData
        >
    >;
    errors: Record<
        string,
        string
    >;
}

const MainToolSection = ({
    formData,
    setFormData,
    errors
}: Props) => {
    const [
        search,
        setSearch,
    ] = useState("");

    const [
        results,
        setResults,
    ] = useState<
        ToolSearchResult[]
    >([]);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const handleSearch =
        async (
            value: string
        ) => {
            setSearch(value);

            if (
                value.trim().length < 2
            ) {
                setResults([]);
                return;
            }

            try {
                setLoading(true);

                const data =
                    await searchToolsApi(
                        value
                    );

                setResults(data);
            } catch (
            error
            ) {
                console.error(
                    error
                );
            } finally {
                setLoading(false);
            }
        };

    const selectTool = (
        tool: ToolSearchResult
    ) => {
        setFormData(
            (prev) => ({
                ...prev,

                toolId:
                    tool._id,

                mainToolName:
                    tool.name,

                mainToolBrand:
                    tool.brand,
            })
        );

        setSearch("");
        setResults([]);
    };

    const removeTool =
        () => {
            setFormData(
                (prev) => ({
                    ...prev,

                    toolId: "",

                    mainToolName:
                        "",

                    mainToolBrand:
                        "",
                })
            );
        };

    return (
        <section id="toolId" className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
                Main Tool
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                Select the primary tool
                for this alternative
                page.
            </p>

            {!formData.toolId && (
                <div className="mt-6">
                    <input
                        id="toolId"
                        type="text"
                        value={search}
                        placeholder="Search tool..."
                        onChange={(e) =>
                            handleSearch(
                                e.target.value
                            )
                        }
                        className="w-full rounded-md border px-3 py-2"
                    />
                    {errors.toolId && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.toolId}
                        </p>
                    )}

                    {loading && (
                        <p className="mt-2 text-sm text-gray-500">
                            Searching...
                        </p>
                    )}

                    {results.length >
                        0 && (
                            <div className="mt-2 overflow-hidden rounded-md border">
                                {results.map(
                                    (
                                        tool
                                    ) => (
                                        <button
                                            key={
                                                tool._id
                                            }
                                            type="button"
                                            onClick={() =>
                                                selectTool(
                                                    tool
                                                )
                                            }
                                            className="block w-full border-b px-4 py-3 text-left hover:bg-gray-50"
                                        >
                                            <div className="font-medium">
                                                {
                                                    tool.name
                                                }
                                            </div>

                                            <div className="text-sm text-gray-500">
                                                {
                                                    tool.brand
                                                }
                                            </div>
                                        </button>
                                    )
                                )}
                            </div>
                        )}
                </div>
            )}

            {formData.toolId && (
                <div className="mt-6 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">
                                {
                                    formData.mainToolName
                                }
                            </h3>

                            <p className="text-sm text-gray-500">
                                {
                                    formData.mainToolBrand
                                }
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={
                                removeTool
                            }
                            className="text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MainToolSection;