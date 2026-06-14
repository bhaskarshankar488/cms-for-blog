import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

import { useIconSearch } from "../hooks/useIconSearch";
import type { IconSearchResult } from "../types/icon.types";
import { IconPreview } from "./IconPreview";

interface IconSearchModalProps {
  selectedIcon?: string;
  onClose: () => void;
  onSelect: (icon: string) => void;
}

export function IconSearchModal({ selectedIcon = "", onClose, onSelect }: IconSearchModalProps) {
  const titleId = useId();
  const searchInputId = useId();
  const { loading, results, search } = useIconSearch();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const iconButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void search(query);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [query, search]);

  useEffect(() => {
    setActiveIndex(0);
  }, [results]);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleIconSelect = (result: IconSearchResult) => {
    onSelect(result.icon);
    onClose();
  };

  const focusIconAtIndex = (index: number) => {
    const nextButton = iconButtonRefs.current[index];

    if (nextButton) {
      setActiveIndex(index);
      nextButton.focus();
    }
  };

  const handleGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!results.length) {
      return;
    }

    const columns = window.innerWidth >= 1024 ? 6 : window.innerWidth >= 768 ? 4 : 2;
    const lastIndex = results.length - 1;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusIconAtIndex(Math.min(activeIndex + 1, lastIndex));
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusIconAtIndex(Math.max(activeIndex - 1, 0));
        break;
      case "ArrowDown":
        event.preventDefault();
        focusIconAtIndex(Math.min(activeIndex + columns, lastIndex));
        break;
      case "ArrowUp":
        event.preventDefault();
        focusIconAtIndex(Math.max(activeIndex - columns, 0));
        break;
      case "Home":
        event.preventDefault();
        focusIconAtIndex(0);
        break;
      case "End":
        event.preventDefault();
        focusIconAtIndex(lastIndex);
        break;
      default:
        break;
    }
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements: HTMLElement[] = [];

    if (closeButtonRef.current) {
      focusableElements.push(closeButtonRef.current);
    }

    if (inputRef.current) {
      focusableElements.push(inputRef.current);
    }

    iconButtonRefs.current.forEach((element) => {
      if (element) {
        focusableElements.push(element);
      }
    });

    if (!focusableElements.length) {
      return;
    }

    const firstElement = focusableElements[0]!;
    const lastElement = focusableElements[focusableElements.length - 1]!;

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
    >
      <div
        className="max-h-[90vh] w-full max-w-[800px] overflow-hidden rounded-lg bg-white shadow-xl"
        onKeyDown={handleDialogKeyDown}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900" id={titleId}>
            Choose Icon
          </h2>
          <button
            aria-label="Close icon picker"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            Close
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor={searchInputId}>
              Search icons
            </label>
            <input
              aria-label="Search icons by label or icon name"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              id={searchInputId}
              onChange={handleSearchChange}
              placeholder="Search by name, label, or prefix"
              ref={inputRef}
              type="search"
              value={query}
            />
          </div>

          <div
            aria-busy={loading}
            aria-label="Icon search results"
            className="min-h-64 overflow-y-auto pr-1"
            onKeyDown={handleGridKeyDown}
            role="listbox"
          >
            {loading ? (
              <div className="flex min-h-64 items-center justify-center text-sm text-slate-500">
                Loading icons...
              </div>
            ) : results.length ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
                {results.map((result, index) => {
                  const isSelected = result.icon === selectedIcon;

                  return (
                    <button
                      aria-label={`Select ${result.label} icon`}
                      aria-selected={isSelected}
                      className={[
                        "flex min-h-24 flex-col items-center justify-center gap-2 rounded-md border p-3 text-center transition focus:outline-none focus:ring-2 focus:ring-blue-500",
                        isSelected
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/60",
                      ].join(" ")}
                      key={result.icon}
                      onClick={() => handleIconSelect(result)}
                      onFocus={() => setActiveIndex(index)}
                      ref={(element) => {
                        iconButtonRefs.current[index] = element;
                      }}
                      role="option"
                      tabIndex={index === activeIndex ? 0 : -1}
                      type="button"
                    >
                      <IconPreview icon={result.icon} size={28} />
                      <span className="max-w-full truncate text-xs font-medium">{result.label}</span>
                      <span className="max-w-full truncate text-[11px] text-slate-500">{result.icon}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-64 items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-sm text-slate-500">
                No icons found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
