import React from 'react'
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {

	if(totalPages<=1) return null;

const pages= Array.from({length: totalPages}, (_, i)=> i+1)
  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      {/* Previous */}
      <Button
        aria-label="Previous page"
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={16} />
      </Button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <Button
          aria-label={`Go to page ${page}`}
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange?.(page)}
        >
          {page}
        </Button>
      ))}

      {/* Next */}
      <Button
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
}

export default Pagination
