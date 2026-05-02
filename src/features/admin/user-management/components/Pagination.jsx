import React from 'react'

const Pagination = ({page, totalPages, setPage}) => {
  return (
<div className="flex gap-2">
      <button onClick={() => setPage(page - 1)}>Prev</button>
      <span>{page}</span>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  )
}

export default Pagination
