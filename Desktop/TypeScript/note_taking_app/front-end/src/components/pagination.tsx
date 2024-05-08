import React from "react";
interface paginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}
export const Pagination: React.FC<paginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        <button key={page} onClick={() => handlePageChange(page)}>
          {page}
        </button>;
      })}
    </>
  );
};
