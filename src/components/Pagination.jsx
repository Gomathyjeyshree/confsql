import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const createPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // max number of numbered buttons visible
    let start = Math.max(2, page - 1);
    let end = Math.min(totalPages - 1, page + 1);

    if (page === 1) end = Math.min(totalPages - 1, 3);
    if (page === totalPages) start = Math.max(2, totalPages - 2);

    // always include first page
    pages.push(1);

    if (start > 2) pages.push("left-ellipsis");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("right-ellipsis");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = createPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 py-4 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((p, idx) => {
        if (p === "left-ellipsis" || p === "right-ellipsis") {
          return (
            <span key={idx} className="px-2 py-1 text-gray-500">
              ...
            </span>
          );
        }
        return (
          <button
            key={idx}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded transition ${
              page === p
                ? "bg-purple-600 text-white font-semibold shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Next
      </button>
    </div>
  );
}
