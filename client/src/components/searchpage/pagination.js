import React from 'react';
import '../../styles/search.css';

const Pagination = ({ pages, onChangePage }) => {
  const handlePageChange = (pageno) => {
    onChangePage(pageno);
  };

  return (
    <div className="paginationspace">
      <div className="pagination">
        <button>&laquo;</button>
        {pages.map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
        <button>&raquo;</button>
      </div>
    </div>
  );
};

export default Pagination;
