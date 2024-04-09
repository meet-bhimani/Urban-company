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
        style={{ transition: 'none', animationDuration: '0 !important', transitionDuration: '0 !important' }}
      />
    </div>
  )
}

export default Table
