import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 1)
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="secondary"
        size="sm"
        className="p-2"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {currentPage > 2 && (
        <>
          <Button
            onClick={() => onPageChange(1)}
            variant="secondary"
            size="sm"
          >
            1
          </Button>
          {currentPage > 3 && <span className="px-2">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={currentPage === page ? 'primary' : 'secondary'}
          size="sm"
        >
          {page}
        </Button>
      ))}

      {currentPage < totalPages - 1 && (
        <>
          {currentPage < totalPages - 2 && <span className="px-2">...</span>}
          <Button
            onClick={() => onPageChange(totalPages)}
            variant="secondary"
            size="sm"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="secondary"
        size="sm"
        className="p-2"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};