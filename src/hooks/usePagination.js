import { useState } from "react";

export const usePagination = (page = 1, limit = 10, totalPages = 0) => {
  const [pagination, setPagination] = useState({ page, limit, totalPages });
  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };
  return { pagination, handlePageChange, setPagination };
};
