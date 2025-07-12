import React, { useState } from "react";
import "../App.css"; 

const Pagetoggle = ({ totalPages = 7 }) => {
  const [currentPage, setCurrentPage] = useState(2);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="pagination-container">
      <button
        className="arrow"
        onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNum = index + 1;
        return (
          <button
            key={pageNum}
            className={`page-btn ${currentPage === pageNum ? "active" : ""}`}
            onClick={() => handlePageClick(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        className="arrow"
        onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};
export default Pagetoggle;

