import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-end gap-3">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          px-4 py-2 rounded-lg border
          disabled:opacity-50
        "
      >
        Previous
      </button>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          px-4 py-2 rounded-lg border
          disabled:opacity-50
        "
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
