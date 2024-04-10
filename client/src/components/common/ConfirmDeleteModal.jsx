import { MdClose } from 'react-icons/md'
import Button from './Button'

const ConfirmDeleteModal = ({
  Id,
  handleClick,
  setShowConfirmationModal,
  setDataIdToBeDeleted,
  dataName,
  modalType,
}) => {
  const handleCancelClick = () => {
    setShowConfirmationModal(false)
    if (setDataIdToBeDeleted) {
      setDataIdToBeDeleted(null)
    }
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-screen h-screen z-50 bg-[rgba(0,0,0,0.2)]">
      <div className="z-50 bg-slate-50 px-5 py-5 w-[min(90%,450px)] rounded-md relative">
        <button className="absolute top-2 right-2" onClick={handleCancelClick}>
          <MdClose className="text-xl" />
        </button>
        <h2 className="text-2xl font-medium">Confirm {modalType}</h2>
        <hr className="h-2 mt-3" />
        <p className="mt-4 text-base bg-red-200 text-red-900 font-medium p-5  rounded-md">
          Are you sure you want to {modalType} {dataName} with ID: {Id}
        </p>
        <div className="flex w-full mx-auto justify-start gap-2 mt-4">
          <Button variant={'danger'} rounded onClick={handleCancelClick}>
            No
          </Button>
          <Button variant={'primary'} rounded onClick={() => handleClick(Id)}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal
