import React from "react";
import ReactPaginate from 'react-paginate';

const Paging = (props) => {
    const { totalPages, handlePageClick } = props;
    return (
        <>
            <ReactPaginate
                previousLabel="<<"
                nextLabel=">>"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={totalPages}
                onPageChange={handlePageClick}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
            />
        </>
    );
};

export default Paging;
