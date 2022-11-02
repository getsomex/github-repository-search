import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

type Props = {
  currentPage: number;
  range: (number | string)[];
  onPageClick?: (page: number) => void;
  onClickNext?: () => void;
  onClickPrev?: () => void;
};
export const Pagiation = ({
  currentPage,
  range,
  onPageClick,
  onClickNext,
  onClickPrev,
}: Props): JSX.Element => {
  return (
    <div>
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          disabled={currentPage === 1}
          onClick={onClickPrev}
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <span className="sr-only">Previous</span>
          <HiChevronLeft />
        </button>
        {range.map((el, ind) => (
          <React.Fragment key={ind}>
            {el !== 'DOTS' && (
              <button
                className={`${
                  el === currentPage
                    ? ' border-2 border-indigo-500 '
                    : 'border border-gray-300 '
                }relative inline-flex items-center  bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 `}
                onClick={(): void => {
                  !Number.isNaN(el) ? onPageClick?.(Number(el)) : undefined;
                }}
              >
                {el}
              </button>
            )}
            {el === 'DOTS' && (
              <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                ...
              </span>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={onClickNext}
          disabled={currentPage === range[range.length - 1]}
          className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <span className="sr-only">Next</span>
          <HiChevronRight />
        </button>
      </nav>
    </div>
  );
};
