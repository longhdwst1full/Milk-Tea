export const handleOk = (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  setIsModalOpen(false)
}
export const handleCancel = (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  setIsModalOpen(false)
}

export const handleUpdateOk = (setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>) => {
  setIsUpdate(true)
}

export const handleCancelUpdate = (setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>) => {
  setIsUpdate(false)
}
