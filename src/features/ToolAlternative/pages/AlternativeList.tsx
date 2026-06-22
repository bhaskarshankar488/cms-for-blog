import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getAlternatives,
} from "../service/alternative.service";

const AlternativeList = () => {
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
                      className={`rounded px-2 py-1 text-xs ${
                        item.status ===
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
                        className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                      >
                        Edit
                      </Link>

                      <button
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                      >
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
    </div>
  );
};

export default AlternativeList;