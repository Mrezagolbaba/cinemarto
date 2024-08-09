import React from 'react';
import styles from './styles.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxPages = 499; 
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
    const visiblePages = 5;
    const totalVisiblePages = 10; 

    const startPage = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(effectiveTotalPages - 1, currentPage + Math.floor(visiblePages / 2));

    if (effectiveTotalPages <= totalVisiblePages) {
      for (let i = 1; i <= effectiveTotalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`${styles.pageNumber} ${i === currentPage ? `${styles.active}` : ''}`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      pageNumbers.push(
        <button
          key={1}
          className={`${styles.pageNumber} ${1 === currentPage ? `${styles.active}` : ''}`}
          onClick={() => handlePageClick(1)}
        >
          1
        </button>
      );

      if (startPage > 2) {
        pageNumbers.push(<span key="start-dots" className={styles.dots}>...</span>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`${styles.pageNumber} ${i === currentPage ? `${styles.active}` : ''}`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }

      if (endPage < effectiveTotalPages - 1) {
        pageNumbers.push(<span key="end-dots" className="dots">...</span>);
      }

      pageNumbers.push(
        <button
          key={effectiveTotalPages}
          className={`${styles.pageNumber} ${effectiveTotalPages === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(effectiveTotalPages)}
        >
          {effectiveTotalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className={styles.paginationButton}
        onClick={handleNext}
        disabled={currentPage === effectiveTotalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
