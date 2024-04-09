import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../api/usersApi'
import Table from '../../components/common/Table'
import { MdDelete, MdEdit } from 'react-icons/md'

const Users = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  const fetchUsers = async () => {
    try {
      const { success, data, error } = await getAllUsers()
      if (!success) throw new Error(error || 'Error fetching users')
      setUsers(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`)
  }

  const handleDelete = (id) => {}

  const columns = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', width: 60 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'email', headerName: 'Email', width: 180 },
      { field: 'role', headerName: 'Role', width: 140, sortable: false },
      { field: 'expertise', headerName: 'Expertise', width: 200, sortable: false },
      { field: 'brand_name', headerName: 'Brand Name', width: 150, sortable: false },
      { field: 'gstin', headerName: 'GSTIN', width: 130, sortable: false },
      { field: 'average_rating', headerName: 'Rating', width: 80 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        sortable: false,
        renderCell: (params) => (
          <div>
            <button onClick={() => handleEdit(params.row.id)}>
              <MdEdit className="text-primary text-xl mr-2" />
            </button>
            <button onClick={() => handleDelete(params.row.id)}>
              <MdDelete className="text-danger text-xl" />
            </button>
          </div>
        ),
      },
    ]
  }, [])

  return (
    <>
      <div className="w-[90%] max-w-[80svw] mx-auto mt-10 mb-16">
        <h1 className="text-xl md:text-2xl lg:text-3xl text-center mb-5">Users</h1>
        <Table columns={columns} rows={users.slice(1)} pageSizeOptions={[5, 10, 25, 50]} />
      </div>
    </>
  )
}

export default Users
