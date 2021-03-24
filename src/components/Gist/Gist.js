import React, { useState } from 'react'
import Pagination from '../Pagination/Pagination'
import GistList from './GistList'

const Gist = ({ fiteredGist, filteredArr, dataArray }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [gistPerPage] = useState(5)

    // pagination
    const indexOfTheLastGist = currentPage * gistPerPage;
    const indexOfFirstGist = indexOfTheLastGist - gistPerPage;
    const currentArrayGist = filteredArr?.slice(indexOfFirstGist, indexOfTheLastGist)

    const paginate = pageNumber => setCurrentPage(pageNumber);


    return <div className="wrapper">

        <GistList currentArrayGist={currentArrayGist} fiteredGist={fiteredGist} />
        <Pagination
            postsPerPage={gistPerPage}
            totalPosts={dataArray?.length}
            paginate={paginate}
        />

    </div>
}

export default Gist
