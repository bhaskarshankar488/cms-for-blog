import { TOOL_EDITOR_NAVIGATION } from "./editorNavigation.constants";

export default function EditorNavigation() {
  return (
    <aside className="rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Editor Navigation
      </h2>

      <div className="space-y-6">
        {TOOL_EDITOR_NAVIGATION.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              {group.title}
            </h3>

            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}