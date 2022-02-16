import React, { useEffect, useState } from 'react';
import './style.scss'
import ReactPaginate from 'react-paginate';

import { useCurrentItemsState } from '../../context/CurrentItems';
import { useModalState } from '../../context/Modal';

function Paginated({ itemsPerPage, items }) {
  const [ pageCount, setPageCount ] = useState(0);
  const [ itemOffset, setItemOffset ] = useState(0);
  const { setCurrentItems } = useCurrentItemsState(null)
  const { showModal } = useModalState()

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items.length, showModal]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        nextLabel="Next"
        previousLabel="Previous"
        renderOnZeroPageCount={null}

        className="paginate"
        pageClassName="paginate_link"
        previousClassName="paginate_btn"
        nextClassName="paginate_btn"
        disabledClassName="paginate_disable"
        activeClassName="paginate_active"
      />
    </>
  );
}

export default Paginated;