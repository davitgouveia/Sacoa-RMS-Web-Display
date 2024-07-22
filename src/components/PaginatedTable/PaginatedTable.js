import React, { useState, useMemo } from 'react';
import Pagination from './Pagination/Pagination';

function PaginatedTable({ data, PageSize, children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTableData, setCurrentTableData] = useState([]);

  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setCurrentTableData(data.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, data, PageSize]);

  return (
    <>
      {children(currentTableData)}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}

export default PaginatedTable;
