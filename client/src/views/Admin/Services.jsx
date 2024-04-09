import React, { useEffect, useMemo, useState } from 'react'
import Table from '../../components/common/Table'
import { MdDelete } from 'react-icons/md'
import { deleteServiceById, getAllServices } from '../../api/serviceApi'
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal'

const Services = () => {
  const [services, setServices] = useState([])
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [serviceIdToBeDeleted, setServiceIdToBeDeleted] = useState(null)

  const handleDelete = (id) => {
    setServiceIdToBeDeleted(id)
    setShowConfirmationModal(true)
  }

  const deleteService = async (serviceId) => {
    try {
      const { success, data, error } = await deleteServiceById(serviceId)
      if (!success) throw new Error(error.message || 'Error deleting service')
      toast.success('Service deleted successfully')
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    } finally {
      setServiceIdToBeDeleted(null)
      setShowConfirmationModal(false)
    }
  }

  const fetchServices = async () => {
    try {
      const { success, data, error } = await getAllServices()
      if (!success) throw new Error(error || 'Error fetching services')
      setServices(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const columns = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', width: 50 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'description', headerName: 'Description', width: 300 },
      { field: 'provider_id', headerName: 'Provider ID', width: 120 },
      { field: 'category', headerName: 'Category', width: 120 },
      { field: 'sub_category', headerName: 'Sub Category', width: 150 },
      { field: 'cost', headerName: 'Cost', width: 100 },
      { field: 'rating', headerName: 'Rating', width: 100 },
      { field: 'total_reviews', headerName: 'Total Reviews', width: 120 },
      { field: 'total_bookings', headerName: 'Total Bookings', width: 140 },
      {
        field: 'actions',
        headerName: 'Actions',
        headerAlign: 'center',
        width: 80,
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
          dataType={'service'}
          Id={serviceIdToBeDeleted}
          handleClick={deleteService}
          setShowConfirmationModal={setShowConfirmationModal}
        />
      )}
      <div className="w-[90%] max-w-[80svw] md:max-w-[85svw] lg:max-w-[90svw] mx-auto mt-10 mb-16">
        <h1 className="text-xl md:text-2xl lg:text-3xl text-center mb-5">Services</h1>
        <Table columns={columns} rows={services} pageSizeOptions={[5, 10, 25, 50]} />
      </div>
    </>
  )
}

export default Services
