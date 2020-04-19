import React, { useState } from 'react'

import TablePagination from '@material-ui/core/TablePagination'

const PaginationTable = props => {

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const rows = props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  const { children } = props
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { rows: rows })
  )

  return (
    <div>
      {childrenWithProps}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default PaginationTable