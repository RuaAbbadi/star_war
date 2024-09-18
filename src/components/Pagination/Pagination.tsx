import { Button } from "@mui/material";
import "./Pagination.scss";

type PaginationProps = {
  currentPage: number;
  totalRecords: number;
  recordsPerPage: number;
  onPageChange: (newPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalRecords,
  recordsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const generatePageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      // If total pages are less than or equal to 5, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, ellipsis, last page, and some surrounding pages
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <Button
        variant="outlined"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      {generatePageNumbers().map((page, index) => (
        <Button
          key={index}
          variant="outlined"
          className={`pagination-button ${
            page === currentPage ? "active" : ""
          }`}
          onClick={() => {
            if (page !== "...") {
              handlePageChange(page as number);
            }
          }}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outlined"
        disabled={currentPage === Math.ceil(totalRecords / recordsPerPage)}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
