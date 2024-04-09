import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const Table = ({ columns, rows, pageSizeOptions }) => {
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: pageSizeOptions[0] },
          },
        }}
        pageSizeOptions={pageSizeOptions}
        rowSelection={false}
      />
    </div>
  )
}

export default Table
