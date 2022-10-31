import { useState } from 'react';

type Pagintaion = {
  next: () => void;
  prev: () => void;
  jump: (page: number) => void;
  currentPage: number;
  maxPage: number;
};
const usePagination = (total: number, limit: number): Pagintaion => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(total / limit);

  const next = (): void => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const prev = (): void => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const jump = (page: number): void => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  };

  return { next, prev, jump, currentPage, maxPage };
};

export default usePagination;
