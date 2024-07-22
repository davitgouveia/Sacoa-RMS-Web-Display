import React from 'react';
import { Button } from 'react-bootstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { usePagination, DOTS } from './usePagination';
import './pagination.css';
const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 pages in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="pagination-container">
      <div className="previous-container">
        <Button className={`button-rectangular button-light ${currentPage === 1 && 'disabled'}`} onClick={onPrevious}>
          <ChevronLeftIcon width={20} style={{ marginRight: '0.5em' }} />
          Previous
        </Button>
      </div>
      <div className="pages-container">
        {paginationRange.map((pageNumber) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <div className="pagination-item dots">&#8230;</div>;
          }
          // Render Page Buttons
          return (
            <Button className="button-square button-light" onClick={() => onPageChange(pageNumber)}>
              <span className={`page ${pageNumber === currentPage && 'selected'}`}>{pageNumber}</span>
            </Button>
          );
        })}
      </div>
      <div className="next-container">
        <Button
          className={`button-rectangular button-light ${currentPage === lastPage && 'disabled'}`}
          onClick={onNext}
        >
          Next
          <ChevronRightIcon width={20} style={{ marginLeft: '0.5em' }} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
