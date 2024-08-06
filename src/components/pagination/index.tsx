import React from 'react';
import './styles.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxPages = 499; // Maximum number of pages to display
  const effectiveTotalPages = Math.min(totalPages, maxPages);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < effectiveTotalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 5; // Number of pages to show around the current page
    const totalVisiblePages = 10; // Total number of pages to display in pagination

    // Determine the start and end pages
    const startPage = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(effectiveTotalPages - 1, currentPage + Math.floor(visiblePages / 2));

    if (effectiveTotalPages <= totalVisiblePages) {
      // Show all pages if total pages are less than or equal to totalVisiblePages
      for (let i = 1; i <= effectiveTotalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`page-number ${i === currentPage ? 'active' : ''}`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show first page
      pageNumbers.push(
        <button
          key={1}
          className={`page-number ${1 === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(1)}
        >
          1
        </button>
      );

      // Show dots if startPage is greater than 2
      if (startPage > 2) {
        pageNumbers.push(<span key="start-dots" className="dots">...</span>);
      }

      // Show pages around current page
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`page-number ${i === currentPage ? 'active' : ''}`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }

      // Show dots if endPage is less than totalPages - 1
      if (endPage < effectiveTotalPages - 1) {
        pageNumbers.push(<span key="end-dots" className="dots">...</span>);
      }

      // Show last page
      pageNumbers.push(
        <button
          key={effectiveTotalPages}
          className={`page-number ${effectiveTotalPages === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(effectiveTotalPages)}
        >
          {effectiveTotalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className="pagination-button"
        onClick={handleNext}
        disabled={currentPage === effectiveTotalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
