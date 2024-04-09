import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const Table = ({ columns, rows, pageSizeOptions }) => {
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: pageSizeOptions[0] },
          },
        }}
        pageSizeOptions={pageSizeOptions}
      />
    </>
  )
}

export default Table
