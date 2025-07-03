import * as React from "react";

import "./pagination.css";

interface PaginationProps {
  totalNumberPages: number;
  currentPage: number;
  setCurrentPageCallback: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({
  totalNumberPages,
  currentPage,
  setCurrentPageCallback,
}: PaginationProps) {
  const pages = Array.from({ length: totalNumberPages }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPageCallback(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
