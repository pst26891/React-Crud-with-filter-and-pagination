import react from 'react'
import { useState } from 'react'

  const Pagination = ({ totalEntries, itemsPerPage,currentPage,handleNextClick,totalPages,handlePageClick,handlePrevClick }) => {

    return (
      <div className="clearfix">
        <div className="hint-text">Showing   <b>{itemsPerPage}</b> out of <b>{totalEntries}</b> entries</div>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a href="#" className="page-link" onClick={handlePrevClick}>
              Previous
            </a>
          </li>
          {[...Array(totalPages).keys()].map((i) => {
            const pageNumber = i + 1;
            return (
              <li
                key={pageNumber}
                className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </a>
              </li>
            );
          })}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a href="#" className="page-link" onClick={handleNextClick}>
              Next
            </a>
          </li>
        </ul>
      </div>
      );
    };

  export default Pagination;