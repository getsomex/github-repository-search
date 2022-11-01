import { useMemo, useState } from 'react';
type Pagination = {
  range: (string | number)[];
  current: number;
  setNextPage: () => void;
  setPreviousPage: () => void;
  jumpToPage: (page: number) => void;
};

/**
 *
 * @param {number} initialPage
 * @param {number} numberOfPages
 * @returns Pagination
 */
export const usePagination = (
  initialPage: number,
  numberOfPages: number
): Pagination => {
  const [current, setCurrent] = useState(initialPage);
  const range = useMemo((): (string | number)[] => {
    const items: (string | number)[] = [1];
    const initalCount = 2;
    const left = current - initalCount;
    const right = current + initalCount;

    if (current === 1 && numberOfPages === 1) return items;

    if (current > 4) {
      items.push('DOTS');
    }
    for (
      let i = left > 2 ? left : 2;
      i <= Math.min(numberOfPages, right);
      i++
    ) {
      items.push(i);
    }

    if (right + 1 < numberOfPages) {
      items.push('DOTS');
    }

    if (right < numberOfPages) {
      items.push(numberOfPages);
    }

    return items;
  }, [current, numberOfPages]);

  const setNextPage = (): void => {
    setCurrent((prev) => prev + 1);
  };
  const setPreviousPage = (): void => {
    setCurrent((prev) => prev - 1);
  };

  const jumpToPage = (page: number): void => {
    setCurrent(page);
  };

  return { current, range, setNextPage, setPreviousPage, jumpToPage };
};
