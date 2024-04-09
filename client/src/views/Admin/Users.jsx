import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteUserById, getAllUsers } from '../../api/usersApi'
import Table from '../../components/common/Table'
import { MdDelete } from 'react-icons/md'
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal'
import toast from 'react-hot-toast'

const Users = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null)

  const handleDelete = (id) => {
    setUserIdToBeDeleted(id)
    setShowConfirmationModal(true)
  }

  const deleteUser = async (userId) => {
    try {
      const { success, data, error } = await deleteUserById(userId.toString())
      console.log(error)
      if (!success) throw new Error(error.message || 'Error deleting user')
      toast.success('User deleted successfully')
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    } finally {
      setUserIdToBeDeleted(null)
      setShowConfirmationModal(false)
    }
  }

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
  }, [userIdToBeDeleted])

  const columns = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', width: 60 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'email', headerName: 'Email', width: 170 },
      { field: 'role', headerName: 'Role', width: 140, sortable: false },
      { field: 'expertise', headerName: 'Expertise', width: 200, sortable: false },
      { field: 'brand_name', headerName: 'Brand Name', width: 150, sortable: false },
      { field: 'gstin', headerName: 'GSTIN', width: 130, sortable: false },
      { field: 'average_rating', headerName: 'Rating', width: 80 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 70,
        sortable: false,
        renderCell: (params) => (
          <div className="text-center">
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
      {showConfirmationModal && (
        <ConfirmDeleteModal
          modalType={'delete'}
          dataType={'user'}
          Id={userIdToBeDeleted}
          handleClick={deleteUser}
          setShowConfirmationModal={setShowConfirmationModal}
        />
      )}
      <div className="w-[90%] max-w-[80svw] md:max-w-[85svw] lg:max-w-[90svw] mx-auto mt-10 mb-16">
        <h1 className="text-xl md:text-2xl lg:text-3xl text-center mb-5">Users</h1>
        <Table columns={columns} rows={users.slice(1)} pageSizeOptions={[5, 10, 25, 50]} />
      </div>
    </>
  )
}

export default Users
