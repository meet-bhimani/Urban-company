import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'

const Table = ({ columns, rows, pageSizeOptions, dataName }) => {
  function CustomNoRowsOverlay() {
    return <div className="h-full grid place-items-center">No matching {dataName} found </div>
  }

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        autoHeight={true}
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

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  dataName: PropTypes.string.isRequired,
}

export default Table
