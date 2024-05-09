import React from "react";
import "../styles/pagination.css";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <div className="pageBtnContainer" key={page}>
          <button
            className={`pagination ${page === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            Page: {page}
          </button>
        </div>
      ))}
    </>
  );
};
