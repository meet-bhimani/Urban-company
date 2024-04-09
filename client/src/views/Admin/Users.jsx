import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../api/usersApi'
import Table from '../../components/common/Table'

const Users = () => {
  const [users, setUsers] = useState([])

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

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'firstName', headerName: 'First name', width: 130 },
  //   { field: 'lastName', headerName: 'Last name', width: 130 },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 90,
  //   },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  //   },
  // ]

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  ]

  return (
    <>
      <div className="w-3/4 mx-auto mt-10">
        <h1>Users</h1>
        <Table columns={columns} rows={users} pageSizeOptions={[5, 10, 25, 50]} />
      </div>
    </>
  )
}

export default Users
