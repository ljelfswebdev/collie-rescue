import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`text-2xl ${pageNumber === currentPage ? '!text-4xl' : ''}`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
