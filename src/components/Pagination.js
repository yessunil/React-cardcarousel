import React from "react";
import "./css/pagination.css"

const Pagination = ({ totalCards, activeCard, onPageChange }) => {
  const pages = Math.ceil(totalCards / 3);

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination">
      {Array.from({ length: pages }).map((_, index) => (
        <button
          key={index + 1}
          className={`page-button ${index + 1 === activeCard ? "active" : ""}`}
          onClick={() => handlePageChange(index + 1)}
        >
           {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
