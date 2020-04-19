import React, { useState } from 'react'
// import MaterialTable from 'material-table'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import { getLocalTime } from '../../../ultis'

const columns = [
  { id: 'created_at', label: '时间', minWidth: 170, format: (value) => getLocalTime(value), },
  { id: 'src', label: '从', minWidth: 100 },
  { id: 'dest', label: '目的地', minWidth: 100 },
  { id: 'amount', label: '金额(元)', minWidth: 100 },
  { id: 'status', label: '状态', minWidth: 100 },
  { id: 'memo', label: '备忘录', minWidth: 200 },
]

const TransactionList = props => {

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return(
    <div>
      <h6 className="airbnb-font bold">支出明细列表</h6>
      <hr/>
      {/* <MaterialTable
        columns={[
          { field: 'created_at', title: '时间' },
          { field: 'src', title: '从' },
          { field: 'dest', title: '目的地' },
          { field: 'amount', title: '金额(元)' },
          { field: 'status', title: '状态' },
          { field: 'memo', title: '备忘录' },
        ]}
        data={props.transactions}
        title="支出明细列表"
      /> */}

      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, idx) => {
              return (
                <TableRow hover tabIndex={-1} key={idx}>
                  {columns.map((column) => {
                    const value = transaction[column.id]
                    const m = transaction.status === "IN" ? <span className="green-text bold">+{transaction.amount}</span> : <span className="red-text bold">-{transaction.amount}</span>
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : column.id === "amount" ? m : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default TransactionList