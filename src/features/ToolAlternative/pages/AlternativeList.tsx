import ConfirmModal from "../../../shared/Component/ConfirmModal"

import {
    useEffect,
    useState,
} from "react";

import {
    deleteAlternative,
} from "../service/alternative.service";


import { toast }
    from "react-hot-toast";

import {
    Link,
} from "react-router-dom";

import {
    getAlternatives,
} from "../service/alternative.service";

const AlternativeList = () => {

    const [
        deleteId,
        setDeleteId,
    ] = useState<
        string | null
    >(null);

    const [
        deleting,
        setDeleting,
    ] = useState(false);


    const [
        alternatives,
        setAlternatives,
    ] = useState<any[]>(
        []
    );

    const [
        loading,
        setLoading,
    ] = useState(true);

    useEffect(() => {
        fetchAlternatives();
    }, []);

    const fetchAlternatives =
        async () => {
            try {
                const response =
                    await getAlternatives();

                setAlternatives(
                    response.data
                );
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

    const handleDelete =
        async () => {
            if (!deleteId) {
                return;
            }

            try {
                setDeleting(true);

                const response =
                    await deleteAlternative(
                        deleteId
                    );

                toast.success(
                    response.message
                );

                setAlternatives(
                    (prev) =>
                        prev.filter(
                            (
                                item
                            ) =>
                                item._id !==
                                deleteId
                        )
                );

                setDeleteId(
                    null
                );
            } catch (
            error: any
            ) {
                toast.error(
                    error.response?.data
                        ?.message ||
                    "Delete failed"
                );
            } finally {
                setDeleting(false);
            }
        };



    if (loading) {
        return (
            <div className="p-6">
                Loading...
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Alternatives
                </h1>

                <Link
                    to="/alternatives/create"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white"
                >
                    Create Alternative
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">
                                Title
                            </th>

                            <th className="p-3 text-left">
                                Slug
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>

                            <th className="p-3 text-left">
                                Created
                            </th>

                            <th className="p-3 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {alternatives.map(
                            (
                                item
                            ) => (
                                <tr
                                    key={
                                        item._id
                                    }
                                    className="border-t"
                                >
                                    <td className="p-3">
                                        {
                                            item.title
                                        }
                                    </td>

                                    <td className="p-3">
                                        {
                                            item.slug
                                        }
                                    </td>

                                    <td className="p-3">
                                        <span
                                            className={`rounded px-2 py-1 text-xs ${item.status ===
                                                "active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {
                                                item.status
                                            }
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-3">
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/alternatives/edit/${item._id}`}
                                                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-100"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L12 15l-4 1 1-4 8.586-8.586z"
                                                    />
                                                </svg>
                                                Edit
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => setDeleteId(item._id)}
                                                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-100 hover:border-red-300"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19 7L18.132 19.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.994-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h8"
                                                    />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <ConfirmModal
                open={
                    Boolean(deleteId)
                }
                title="Delete Alternative"
                message="Are you sure you want to delete this alternative? This action cannot be undone."
                loading={deleting}
                onClose={() =>
                    setDeleteId(
                        null
                    )
                }
                onConfirm={
                    handleDelete
                }
            />
        </div>
    );
};

export default AlternativeList;