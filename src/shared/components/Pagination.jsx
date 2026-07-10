import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const maxVisibleNeighbors = 1;
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - maxVisibleNeighbors &&
          i <= currentPage + maxVisibleNeighbors)
      ) {
        pages.push(i);
      }
    }

    const uniquePagesWithEllipsis = [];
    let prev = null;

    for (const page of pages) {
      if (prev !== null) {
        if (page - prev === 2) {
          uniquePagesWithEllipsis.push(prev + 1);
        } else if (page - prev > 2) {
          uniquePagesWithEllipsis.push("...");
        }
      }
      uniquePagesWithEllipsis.push(page);
      prev = page;
    }

    return uniquePagesWithEllipsis;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      <Button
        className="cursor-pointer"
        aria-label="Previous page"
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={16} />
      </Button>

      {visiblePages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="text-muted-foreground px-2 text-sm select-none"
            >
              ...
            </span>
          );
        }

        return (
          <Button
            className="cursor-pointer"
            aria-label={`Go to page ${page}`}
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange?.(page)}
          >
            {page}
          </Button>
        );
      })}

      <Button
        className="cursor-pointer"
        aria-label="Next page"
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default Pagination;
